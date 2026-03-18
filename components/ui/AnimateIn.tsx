"use client";

import { useInView } from "react-intersection-observer";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateIn({ children, className = "", delay = 0 }: AnimateInProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${
        inView
          ? "animate-[fade-up_0.8s_cubic-bezier(0.2,0,0,1)_forwards]"
          : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
