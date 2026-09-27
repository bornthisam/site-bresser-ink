import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Botão flutuante de WhatsApp (desktop). */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-6 bottom-6 z-30 hidden h-14 w-14 items-center justify-center rounded-pill bg-whatsapp text-[#04140a] shadow-[0_16px_40px_-12px_var(--color-whatsapp)] transition hover:scale-105 lg:inline-flex"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-pill bg-whatsapp/40" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
