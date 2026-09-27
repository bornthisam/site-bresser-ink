import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site, whatsappUrl } from "@/lib/site";
import { Logo } from "@/components/ui/Brand";
import { WhatsAppButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { InstagramIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line bg-bg2 pb-24 lg:pb-0">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            Impressão DTF por metro. Você vende, a gente produz.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Impressão DTF Têxtil e DTF UV por metro para estamparias, confecções, lojas de brindes e
            personalização.
          </p>
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink"
          >
            <InstagramIcon className="h-4 w-4" /> @{site.instagram.handle}
          </a>
        </div>

        <div>
          <Eyebrow>Nesta página</Eyebrow>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="text-muted transition hover:text-ink">
                Política de privacidade
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Eyebrow>Fale com a gente</Eyebrow>
          <ul className="space-y-3 text-sm text-muted">
            <li>
              <a href={site.phone.href} className="inline-flex items-start gap-2.5 transition hover:text-ink">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" /> {site.phone.label}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-start gap-2.5 break-all transition hover:text-ink"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" /> {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2.5 transition hover:text-ink"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{site.address}</span>
              </a>
            </li>
          </ul>
          <ul className="mt-4 space-y-1 font-mono text-[0.72rem] text-faint">
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <WhatsAppButton href={whatsappUrl()} size="sm">
              WhatsApp {site.whatsapp.label}
            </WhatsAppButton>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-5 font-mono text-[0.7rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.company} · CNPJ {site.cnpj}
          </p>
          <p>São Paulo – SP</p>
        </div>
      </div>
    </footer>
  );
}
