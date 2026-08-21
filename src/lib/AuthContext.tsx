import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

// supabase-js is loaded on demand (dynamic import) instead of being bundled
// into the initial JS. Auth is only needed on /dashboard, /success and the
// login modal, so pulling ~40KB gz of supabase out of the critical path was a
// major PageSpeed win. The client resolves from the same async chunk the
// dashboard/success routes use, so it's fetched once and cached.
async function getSupabase() {
  const mod = await import("./supabase");
  return mod.supabase;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signInWithGoogle: async () => ({}),
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function parseHashTokens(): { accessToken: string; refreshToken: string } | null {
  const hash = window.location.hash;
  if (!hash || !hash.includes("access_token=")) return null;
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

function cleanupUrl() {
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const initAuth = async () => {
      console.log("[auth] initAuth start, hash:", window.location.hash.substring(0, 80));

      // Lazy-load the supabase client (kept out of the initial bundle)
      const client = await getSupabase();

      // 1. Try to exchange implicit flow tokens from URL hash
      const tokens = parseHashTokens();
      if (tokens) {
        console.log("[auth] found tokens in URL hash, calling setSession...");
        cleanupUrl();
        try {
          const { data, error } = await client.auth.setSession({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
          });
          if (!cancelled) {
            if (error) {
              console.error("[auth] setSession error:", error.message);
            } else {
              console.log("[auth] setSession success, session:", !!data?.session);
              setSession(data.session);
            }
          }
        } catch (e) {
          console.error("[auth] setSession exception:", e);
        }
      }

      // 2. Also load any existing session from storage
      const { data: { session: existingSession } } = await client.auth.getSession();
      if (!cancelled) {
        console.log("[auth] getSession result:", !!existingSession);
        if (existingSession) {
          setSession(existingSession);
        }
        setLoading(false);
      }
    };

    initAuth();

    // 3. Listen for future auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    getSupabase().then((client) => {
      if (cancelled) return;
      const { data: { subscription: sub } } = client.auth.onAuthStateChange((event, newSession) => {
        console.log("[auth] onAuthStateChange:", event, !!newSession);
        if (!cancelled) {
          setSession(newSession);
        }
      });
      subscription = sub;
    });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const client = await getSupabase();
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error?.message };
  };

  const signUp = async (email: string, password: string) => {
    const client = await getSupabase();
    const { error } = await client.auth.signUp({
      email,
      password,
    });
    return { error: error?.message };
  };

  const signOut = async () => {
    const client = await getSupabase();
    await client.auth.signOut();
  };

  const signInWithGoogle = async () => {
    try {
      const client = await getSupabase();
      const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          skipBrowserRedirect: false,
        },
      });
      if (error) return { error: error.message };
      if (data?.url) {
        window.location.href = data.url;
      }
      return {};
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Google sign-in failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
