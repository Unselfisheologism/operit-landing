import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

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

      // 1. Try to exchange implicit flow tokens from URL hash
      const tokens = parseHashTokens();
      if (tokens) {
        console.log("[auth] found tokens in URL hash, calling setSession...");
        cleanupUrl();
        try {
          const { data, error } = await supabase.auth.setSession({
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
      const { data: { session: existingSession } } = await supabase.auth.getSession();
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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("[auth] onAuthStateChange:", event, !!newSession);
      if (!cancelled) {
        setSession(newSession);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error?.message };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error: error?.message };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
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
