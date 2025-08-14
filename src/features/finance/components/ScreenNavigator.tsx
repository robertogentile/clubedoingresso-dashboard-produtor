"use client";
import { ReactNode, useMemo, useRef, useState } from "react";

type ScreenId =
  | "home"
  | "details"
  | "pix-create"
  | "pix-list"
  | "account-create"
  | "account-list"
  | "coupons"
  | "promoters";

interface ScreenNavigatorProps {
  initial?: ScreenId;
  render: (
    screen: ScreenId,
    navigate: (id: ScreenId) => void,
    goBack: () => void
  ) => ReactNode;
}

export function ScreenNavigator({
  initial = "home",
  render,
}: ScreenNavigatorProps) {
  const [stack, setStack] = useState<ScreenId[]>([initial]);
  const [direction, setDirection] = useState<"push" | "pop">("push");
  const keyRef = useRef(0);

  const current = stack[stack.length - 1];

  function navigate(id: ScreenId) {
    setDirection("push");
    setStack((s) => [...s, id]);
    keyRef.current += 1;
  }

  function goBack() {
    if (stack.length <= 1) return;
    setDirection("pop");
    setStack((s) => s.slice(0, -1));
    keyRef.current += 1;
  }

  const animationClass = useMemo(() => {
    // Tailwind-like classes for slide transitions (basic)
    return direction === "push"
      ? "animate-in slide-in-from-right fade-in duration-300"
      : "animate-in slide-in-from-left fade-in duration-300";
  }, [direction]);

  return (
    <div className="relative overflow-hidden">
      <div key={keyRef.current} className={animationClass}>
        {render(current, navigate, goBack)}
      </div>
    </div>
  );
}
