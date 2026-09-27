"use client";

import { useEffect, useRef, useState } from "react";

// Seção "sticky" com scroll: um vídeo do filme DTF descolando da camiseta,
// com o currentTime do vídeo amarrado ao progresso do scroll dentro da seção.
// Em iPhone/iPad o seek de vídeo trava, então lá o vídeo só roda em loop.

// Gravação própria da Bresser Ink em public/videos/. Para o scrub ficar liso, o MP4
// precisa ter keyframe em todo quadro (ffmpeg: -g 1 -keyint_min 1, sem áudio).
const VIDEO_SRC = "/videos/bresser-peel.mp4";
const POSTER_SRC = "/videos/bresser-peel-poster.jpg";

const captions = ["Filme aplicado na prensa", "Filme sai, estampa fica"];

const isIOS = () =>
  /iP(hone|ad|od)/.test(navigator.userAgent) ||
  (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);

export function FilmPeel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [peeled, setPeeled] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    // Movimento reduzido ou tela pequena: fica só o pôster
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    // O vídeo só é carregado quando o efeito vai de fato rodar
    if (!video.getAttribute("src")) video.src = VIDEO_SRC;

    if (isIOS()) {
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    video.pause();
    let raf = 0;
    let inView = false;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      const duration = video.duration;
      if (duration && Number.isFinite(duration)) {
        const target = progress * duration;
        // Evita seeks minúsculos e seeks empilhados enquanto o anterior não terminou
        if (Math.abs(video.currentTime - target) > 1 / 60 && !video.seeking) {
          video.currentTime = target;
        }
      }
      setPeeled(progress >= 0.5);
    };

    const schedule = () => {
      if (!inView) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        if (inView) schedule();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "100px 0px" },
    );

    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    video.addEventListener("loadedmetadata", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      video.removeEventListener("loadedmetadata", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Filme DTF descolando da camiseta"
      className="sempre-escuro relative z-0 hidden h-[200vh] md:block"
      style={{ background: "#000" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "linear-gradient(to bottom, var(--bg) 0%, #000 12%)" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ transform: "translateY(4vh)" }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={POSTER_SRC}
            aria-label="Filme DTF sendo descolado de uma camiseta branca"
            className="shrink-0"
            style={{
              display: "block",
              width: "min(100%, 1400px, 80vh)",
              aspectRatio: "1 / 1",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[11vh] flex justify-center px-6">
          <div className="relative h-16 w-full max-w-2xl">
            {captions.map((c, i) => (
              <p
                key={c}
                className="absolute inset-x-0 flex justify-center transition-opacity duration-500"
                style={{ opacity: (peeled ? 1 : 0) === i ? 1 : 0 }}
              >
                <span
                  className="rounded-pill px-6 py-2.5 font-display text-3xl font-bold backdrop-blur-sm sm:text-4xl"
                  style={{ color: "#f7f4f1", background: "color-mix(in oklab, #100f0d 68%, transparent)" }}
                >
                  {c}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
