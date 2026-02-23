"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
type ProgressState = "idle" | "loading" | "completing" | "done";

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useNavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<ProgressState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathRef = useRef<string>("");

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startLoading = () => {
    clear();
    setProgress(0);
    setState("loading");

    let current = 0;
    intervalRef.current = setInterval(() => {
      // Easing: fast at start, slows down toward 85%
      const remaining = 85 - current;
      const increment = remaining * 0.12;
      current = Math.min(current + increment, 85);
      setProgress(current);

      if (current >= 85) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 120);
  };

  const completeLoading = () => {
    clear();
    setState("completing");
    setProgress(100);

    timerRef.current = setTimeout(() => {
      setState("done");
      timerRef.current = setTimeout(() => {
        setState("idle");
        setProgress(0);
      }, 300);
    }, 400);
  };

  useEffect(() => {
    const current = pathname + searchParams.toString();

    if (prevPathRef.current && prevPathRef.current !== current) {
      startLoading();
      // Simulate completing after a brief moment
      // In real usage, Next.js App Router handles this automatically
      const complete = setTimeout(() => completeLoading(), 600);
      return () => clearTimeout(complete);
    }

    prevPathRef.current = current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => () => clear(), []);

  return { progress, state };
}

// ─── Component ────────────────────────────────────────────────────────────────
export function NavigationProgress() {
  const { progress, state } = useNavigationProgress();

  if (state === "idle") return null;

  return (
    <>
      {/* Top progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: "2px",
          pointerEvents: "none",
        }}
      >
        {/* Glow blur layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
            boxShadow: "0 0 12px 2px rgba(139, 92, 246, 0.8)",
            transition:
              state === "completing"
                ? "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease"
                : "width 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: state === "done" ? 0 : 1,
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Leading shimmer dot */}
        {state === "loading" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${progress}%`,
              transform: "translate(-50%, -50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#c4b5fd",
              boxShadow: "0 0 10px 4px rgba(196, 181, 253, 0.9)",
              transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        )}
      </div>

      {/* Subtle page overlay flash */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          pointerEvents: "none",
          background: "rgba(99, 102, 241, 0.03)",
          opacity: state === "loading" ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
