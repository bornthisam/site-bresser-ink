import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-display font-semibold tracking-tight whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color,filter] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-cmyk text-on-brand [text-shadow:0_1px_2px_#0006] shadow-[0_10px_30px_-12px_var(--color-brand)] hover:brightness-110 hover:shadow-[0_14px_34px_-12px_var(--color-brand)]",
  whatsapp:
    "bg-whatsapp text-[#04140a] shadow-[0_10px_30px_-12px_var(--color-whatsapp)] hover:brightness-110",
  ghost: "border border-line-2 bg-transparent text-ink hover:border-brand hover:text-brand",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "lg", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant,
  size,
  className,
  children,
  ...props
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClass(variant, size, className)} {...props}>
      {children}
    </a>
  );
}

/** Botão verde de WhatsApp que abre em nova aba. */
export function WhatsAppButton({
  href,
  size = "lg",
  className,
  children,
}: {
  href: string;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <LinkButton
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      size={size}
      className={className}
    >
      <WhatsAppIcon className="h-[1.15em] w-[1.15em]" />
      {children}
    </LinkButton>
  );
}
