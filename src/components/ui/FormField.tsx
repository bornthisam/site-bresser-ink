import type { ReactNode } from "react";

export function FormField({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
