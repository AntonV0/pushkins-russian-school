import type { ReactNode } from "react";

type CtaGroupProps = {
  children: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
};

export function CtaGroup({
  children,
  align = "left",
  className = "",
}: CtaGroupProps) {
  const alignment = {
    left: "sm:justify-start",
    right: "sm:justify-end",
    center: "sm:justify-center",
  }[align];

  return (
    <div
      className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap ${alignment} ${className}`}
    >
      {children}
    </div>
  );
}
