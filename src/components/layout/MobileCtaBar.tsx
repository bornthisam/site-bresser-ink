"use client";

import { MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Barra fixa inferior no mobile: aparece depois que o usuário rola além do hero. */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <a
          href="#orcamento"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-pill border border-line-2 bg-surface text-sm font-semibold text-ink"
        >
          <MessageSquareText className="h-4 w-4" />
          Pedir orçamento
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-pill bg-whatsapp text-sm font-semibold text-[#04140a]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
