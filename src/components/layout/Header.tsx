"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, site, whatsappUrl } from "@/lib/site";
import { Logo } from "@/components/ui/Brand";
import { WhatsAppButton } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sempre-escuro sticky top-0 z-40" style={{ background: "var(--bg)" }}>
      {/* Degradê que "derrete" o header sobre o conteúdo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full h-14"
        style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)" }}
      />

      <div className="shell relative flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Logo />

        <nav aria-label="Seções da página" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-pill px-3.5 py-2 text-sm text-muted transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            className="hidden font-mono text-sm text-muted transition hover:text-ink xl:inline"
          >
            {site.phone.label}
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
          <WhatsAppButton href={whatsappUrl()} size="sm" className="hidden sm:inline-flex">
            WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="relative border-t border-line bg-bg lg:hidden">
          <nav className="shell flex flex-col py-4" aria-label="Menu">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-lg font-semibold last:border-0"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 flex items-center gap-3">
              <ThemeToggle />
              <a href={site.phone.href} className="font-mono text-sm text-muted">
                {site.phone.label}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
