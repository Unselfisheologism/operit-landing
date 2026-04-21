"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { cn } from "../../lib/utils";

// Types
export interface TerminalLine {
  text: string;
  color?: string;
  delay?: number;
}

export interface TabContent {
  label: string;
  command: string;
  lines: TerminalLine[];
}

export type TerminalAnimationRootProps = React.ComponentProps<"div"> & {
  tabs: TabContent[];
  defaultActiveTab?: number;
  activeTab?: number;
  onActiveTabChange?: (index: number) => void;
  backgroundImage?: string;
  alwaysDark?: boolean;
  hideCursorOnComplete?: boolean;
};

// Context
interface TerminalAnimationContextValue {
  activeTab: number;
  setActiveTab: (index: number) => void;
  commandTyped: string;
  isTypingCommand: boolean;
  showCursor: boolean;
  visibleLines: number;
  currentTab: TabContent;
  tabs: TabContent[];
}

const TerminalAnimationContext = createContext<
  TerminalAnimationContextValue | undefined
>(undefined);

function useTerminalAnimationContext() {
  const ctx = useContext(TerminalAnimationContext);
  if (!ctx) {
    throw new Error(
      "TerminalAnimation components must be used within TerminalAnimationRoot"
    );
  }
  return ctx;
}

// Root
export function TerminalAnimationRoot({
  tabs,
  defaultActiveTab = 0,
  activeTab: activeTabProp,
  onActiveTabChange,
  backgroundImage,
  alwaysDark = false,
  hideCursorOnComplete = true,
  className,
  children,
  ...props
}: TerminalAnimationRootProps) {
  const [activeTab, setActiveTab] = useControllableState({
    prop: activeTabProp,
    defaultProp: defaultActiveTab,
    onChange: onActiveTabChange,
  });

  const [visibleLines, setVisibleLines] = useState(0);
  const [commandTyped, setCommandTyped] = useState("");
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  }, []);

  const animateTab = useCallback(
    (tabIndex: number) => {
      clearTimeouts();
      setVisibleLines(0);
      setCommandTyped("");
      setIsTypingCommand(true);
      setShowCursor(true);

      const tab = tabs[tabIndex];
      if (!tab) return;

      const command = tab.command;
      let charIndex = 0;

      const typeCommand = () => {
        if (charIndex <= command.length) {
          setCommandTyped(command.slice(0, charIndex));
          charIndex++;
          const t = setTimeout(typeCommand, 25 + Math.random() * 35);
          timeoutRef.current.push(t);
        } else {
          const t = setTimeout(() => {
            setIsTypingCommand(false);
            showLines(0);
          }, 250);
          timeoutRef.current.push(t);
        }
      };

      const showLines = (lineIndex: number) => {
        if (lineIndex <= tab.lines.length) {
          setVisibleLines(lineIndex);
          if (lineIndex < tab.lines.length) {
            const delay = tab.lines[lineIndex].delay ?? 100;
            const t = setTimeout(() => showLines(lineIndex + 1), delay);
            timeoutRef.current.push(t);
          } else if (hideCursorOnComplete) {
            const t = setTimeout(() => setShowCursor(false), 600);
            timeoutRef.current.push(t);
          }
        }
      };

      const t = setTimeout(typeCommand, 300);
      timeoutRef.current.push(t);
    },
    [clearTimeouts, hideCursorOnComplete, tabs]
  );

  useEffect(() => {
    animateTab(activeTab);
    return clearTimeouts;
  }, [activeTab, animateTab, clearTimeouts]);

  const currentTab = tabs[activeTab] ?? tabs[0];
  const safeActiveTab = Math.min(activeTab, tabs.length - 1);

  const value: TerminalAnimationContextValue = {
    activeTab: safeActiveTab,
    setActiveTab,
    commandTyped,
    isTypingCommand,
    showCursor,
    visibleLines,
    currentTab,
    tabs,
  };

  return (
    <TerminalAnimationContext.Provider value={value}>
      <div
        className={cn(alwaysDark && "dark", className)}
        data-slot="terminal-animation-root"
        {...props}
      >
        {backgroundImage && (
          <div
            aria-hidden
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        {children}
      </div>
    </TerminalAnimationContext.Provider>
  );
}

// Container
export function TerminalAnimationContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative w-full", className)}
      data-slot="terminal-animation-container"
      {...props}
    />
  );
}

// Window
export function TerminalAnimationWindow({
  className,
  backgroundColor,
  minHeight = "28rem",
  animateOnVisible = true,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  backgroundColor?: string;
  minHeight?: string;
  animateOnVisible?: boolean;
}) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!(animateOnVisible && windowRef.current)) return;
    const el = windowRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setHasAnimated(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOnVisible]);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden",
        !backgroundColor && "bg-zinc-950",
        animateOnVisible &&
          "transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        animateOnVisible && !hasAnimated && "translate-y-16",
        animateOnVisible && hasAnimated && "translate-y-0",
        className
      )}
      data-slot="terminal-animation-window"
      ref={windowRef}
      style={
        backgroundColor
          ? { backgroundColor, minHeight, ...style }
          : { minHeight, ...style }
      }
      {...props}
    />
  );
}

// Content
export function TerminalAnimationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 px-6 py-6 sm:px-10 sm:py-8", className)}
      data-slot="terminal-animation-content"
      {...props}
    />
  );
}

// CommandBar
export function TerminalAnimationCommandBar({
  className,
  cursor,
  ...props
}: React.ComponentProps<"div"> & { cursor?: ReactNode }) {
  const { commandTyped, isTypingCommand, showCursor } =
    useTerminalAnimationContext();

  return (
    <div className={className} data-slot="terminal-animation-command" {...props}>
      <span className="text-zinc-500">$ </span>
      {commandTyped}
      {isTypingCommand && showCursor && (cursor ?? <span aria-hidden="true">▌</span>)}
    </div>
  );
}

// OutputLine
export function TerminalAnimationOutputLine({
  line,
  visible,
  className,
  ...props
}: React.ComponentProps<"div"> & { line: TerminalLine; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className={className} data-slot="terminal-animation-output-line" {...props}>
      <span className={line.color}>{line.text || "\u00A0"}</span>
    </div>
  );
}

// Output
export function TerminalAnimationOutput({
  className,
  renderLine,
  ...props
}: React.ComponentProps<"div"> & {
  renderLine?: (line: TerminalLine, index: number, visible: boolean) => ReactNode;
}) {
  const { isTypingCommand, visibleLines, currentTab, activeTab } =
    useTerminalAnimationContext();

  if (isTypingCommand) return null;

  return (
    <div
      aria-live="polite"
      className={className}
      data-slot="terminal-animation-output"
      role="log"
      {...props}
    >
      {currentTab.lines.map((line, i) => {
        const visible = i < visibleLines;
        const key = `${activeTab}-${i}`;
        if (renderLine) {
          const content = renderLine(line, i, visible);
          if (!(visible || content)) return null;
          return <div key={key}>{content}</div>;
        }
        return (
          <TerminalAnimationOutputLine key={key} line={line} visible={visible} />
        );
      })}
    </div>
  );
}

// TabList
export function TerminalAnimationTabList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-label="Terminal commands"
      className={className}
      data-slot="terminal-animation-tab-list"
      role="tablist"
      {...props}
    />
  );
}

// TabTrigger
export function TerminalAnimationTabTrigger({
  index,
  asChild = false,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  index: number;
  asChild?: boolean;
}) {
  const { activeTab, setActiveTab } = useTerminalAnimationContext();
  const isActive = activeTab === index;

  const triggerProps = {
    role: "tab" as const,
    "aria-selected": isActive,
    "data-state": isActive ? "active" : "inactive",
    onClick: () => setActiveTab(index),
    children,
  };

  if (asChild) {
    return <Slot {...triggerProps} {...props} className={className} />;
  }

  return (
    <button
      data-slot="terminal-animation-tab-trigger"
      type="button"
      {...triggerProps}
      className={className}
      {...props}
    />
  );
}

// Hook
export function useTerminalAnimation() {
  return useTerminalAnimationContext();
}
