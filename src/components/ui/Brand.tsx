import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Logo e wordmark "DTF" nas cores CMY.

export function Logo({ className = "h-10 w-auto sm:h-12" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — página inicial`}
      className="inline-flex items-center text-ink transition-opacity hover:opacity-80"
    >
      {/* width/height = proporção do viewBox do brand.svg (1500×675); o tamanho real vem do className */}
      <Image src="/brand.svg" alt="" width={1500} height={675} priority unoptimized className={className} />
    </Link>
  );
}

export function DtfWord({ suffix }: { suffix?: string }) {
  return (
    <>
      <span className="text-cyan">D</span>
      <span className="text-magenta">T</span>
      <span className="text-yellow">F</span>
      {suffix && <> {suffix}</>}
    </>
  );
}
