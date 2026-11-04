"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  motionValue,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Building2,
  Car,
  CheckCircle2,
  ChevronDown,
  HeartPulse,
  Home,
  Phone,
} from "lucide-react";
import { asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { useT } from "@/lib/useLang";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

// Image sequence rendered from the Higgsfield "nebula → Earth" flight.
// Two sizes so phones don't download desktop-resolution frames.
const FRAME_COUNT = 120;
const frameSrc = (set: "lg" | "sm", i: number) =>
  asset(`/images/hero-seq/${set}/f${String(i + 1).padStart(3, "0")}.webp`);

const QUOTE_URL =
  "https://cfd97c1e-303d-4132-818d-6cff751e4bde.quotes.iwantinsurance.com/welcome.aspx?AspxAutoDetectCookieSupport=1";

// Stat values and feature icons; their labels live in `copy` (same order).
const statValues = ["10+", "100+", "4", "100%"];

const heroFeatureIcons = [Car, Building2, Home, HeartPulse];

const copy = {
  en: {
    sectionLabel: "Universal Insurance Brokers — Protect what matters most",
    eyebrow: "Universal Insurance Brokers",
    titleLine1: "Protect What",
    titleLine2: "Matters Most",
    subtitle:
      "Welcome to the future of online insurance. All your policies, under one roof.",
    scrollCue: "Scroll to explore",
    midLine1: "100+ carriers.",
    midLine2: "One broker on your side.",
    finalHeading: "Coverage for your whole",
    finalHeadingAccent: "world.",
    finalText:
      "Get a real price on your auto insurance in less than 10 minutes. All policies under one roof.",
    quoteButton: "Get a Free Quote",
    callButton: "Call Us Now",
    stats: ["Years Experience", "Insurance Carriers", "Florida Locations", "Satisfaction"],
    cardTitle: "All Your Insurance, One Place",
    features: [
      "Auto Insurance — quotes in under 10 minutes",
      "Commercial Insurance — 10,000+ business types",
      "Home Insurance — best-in-class comparisons",
      "Health Insurance — zero cost through ACA",
    ],
    guarantee: "100% Satisfaction Guaranteed — Free rate revisions anytime",
  },
  es: {
    sectionLabel: "Universal Insurance Brokers — Proteja lo que más importa",
    eyebrow: "Universal Insurance Brokers",
    titleLine1: "Proteja Lo Que",
    titleLine2: "Más Importa",
    subtitle:
      "Bienvenido al futuro de los seguros en línea. Todas sus pólizas, bajo un mismo techo.",
    scrollCue: "Desplácese para explorar",
    midLine1: "100+ aseguradoras.",
    midLine2: "Un corredor de su lado.",
    finalHeading: "Cobertura para todo su",
    finalHeadingAccent: "mundo.",
    finalText:
      "Obtenga un precio real para su seguro de auto en menos de 10 minutos. Todas sus pólizas bajo un mismo techo.",
    quoteButton: "Cotización Gratis",
    callButton: "Llámenos Ahora",
    stats: ["Años de Experiencia", "Aseguradoras", "Oficinas en Florida", "Satisfacción"],
    cardTitle: "Todos Sus Seguros en un Solo Lugar",
    features: [
      "Seguro de Auto — cotizaciones en menos de 10 minutos",
      "Seguro Comercial — más de 10,000 tipos de negocio",
      "Seguro de Hogar — las mejores comparaciones",
      "Seguro de Salud — sin costo a través de ACA",
    ],
    guarantee: "Satisfacción 100% garantizada — Revisión de tarifas gratis cuando quiera",
  },
};

/* ------------------------------------------------------------------ */
/*  Canvas frame sequence                                              */
/* ------------------------------------------------------------------ */

function useFrameSequence(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  progress: MotionValue<number>,
  enabled: boolean,
) {
  const images = useRef<HTMLImageElement[]>([]);
  const current = useRef(-1);

  // Draw the requested frame (or the nearest one that has loaded) with
  // object-fit: cover semantics.
  const draw = (target: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let img: HTMLImageElement | undefined;
    for (let d = 0; d < FRAME_COUNT; d++) {
      const a = images.current[target - d];
      const b = images.current[target + d];
      if (a?.complete && a.naturalWidth) { img = a; break; }
      if (b?.complete && b.naturalWidth) { img = b; break; }
    }
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    current.current = target;
  };

  const frameFor = (p: number) =>
    Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));

  // Size canvas to the viewport at device pixel ratio (capped for perf).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(frameFor(progress.get()));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Progressive loading, so the hero never competes with the rest of the
  // page for bandwidth:
  //   1. now: only the frame that is on screen
  //   2. after the page has loaded: every 8th frame (coarse but scrubbable)
  //   3. once the visitor starts scrolling (or after a few idle seconds):
  //      the remaining frames, a few at a time
  // With Data Saver on, stage 3 is skipped.
  useEffect(() => {
    const set = window.innerWidth < 768 ? "sm" : "lg";
    let cancelled = false;
    const timers: number[] = [];

    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        if (cancelled || images.current[i]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = img.onerror = () => {
          if (!cancelled && img.naturalWidth) {
            const want = enabled ? frameFor(progress.get()) : FRAME_COUNT - 1;
            // Redraw if this frame is closer to what we want than what's shown.
            if (
              current.current === -1 ||
              Math.abs(i - want) < Math.abs(current.current - want)
            ) {
              draw(want);
            }
          }
          resolve();
        };
        img.src = frameSrc(set, i);
        images.current[i] = img;
      });

    // Load a list of frames with limited concurrency.
    const loadAll = async (frames: number[], concurrency: number) => {
      const queue = [...frames];
      const worker = async () => {
        while (queue.length && !cancelled) await loadFrame(queue.shift()!);
      };
      await Promise.all(Array.from({ length: concurrency }, worker));
    };

    if (!enabled) {
      loadFrame(FRAME_COUNT - 1);
      return () => {
        cancelled = true;
      };
    }

    const all = Array.from({ length: FRAME_COUNT }, (_, i) => i);
    const keyframes = all.filter((i) => i % 8 === 0 || i === FRAME_COUNT - 1);
    const rest = all.filter((i) => !keyframes.includes(i));
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;

    let restStarted = false;
    const startRest = () => {
      if (restStarted || saveData || cancelled) return;
      restStarted = true;
      window.removeEventListener("scroll", startRest);
      loadAll(rest, 4);
    };

    const startKeyframes = () => {
      loadAll(keyframes, 4).then(() => {
        if (cancelled) return;
        if (window.scrollY > 0) startRest();
        else {
          window.addEventListener("scroll", startRest, { passive: true });
          timers.push(window.setTimeout(startRest, 4000));
        }
      });
    };

    // Stage 1
    loadFrame(0);
    // Stage 2 (after load, so it never delays the page's own resources)
    if (document.readyState === "complete") {
      timers.push(window.setTimeout(startKeyframes, 300));
    } else {
      window.addEventListener("load", startKeyframes, { once: true });
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("load", startKeyframes);
      window.removeEventListener("scroll", startRest);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useMotionValueEvent(progress, "change", (p) => {
    if (!enabled) return;
    const f = frameFor(p);
    if (f !== current.current) requestAnimationFrame(() => draw(f));
  });
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const t = useT(copy);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // A light spring gives the scrub a weighty, cinematic feel.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });
  // The flight finishes at 82% so the final scene can hold while the
  // content settles before the section un-pins.
  const flight = useTransform(smooth, [0, 0.82], [0, 1], { clamp: true });

  useFrameSequence(canvasRef, flight, !reduceMotion);

  /* Act 1 — title over the nebula */
  const introOpacity = useTransform(smooth, [0, 0.14, 0.24], [1, 1, 0]);
  const introScale = useTransform(smooth, [0, 0.24], [1, 1.18]);
  const introBlur = useTransform(smooth, [0.1, 0.24], ["blur(0px)", "blur(6px)"]);
  const cueOpacity = useTransform(smooth, [0, 0.05], [1, 0]);
  // Fully hide faded layers so blurred/transparent layers don't cost
  // compositing work (or leave tiling artifacts) over the film.
  const introVisibility = useTransform(introOpacity, (v) => (v < 0.01 ? "hidden" : "visible"));

  /* Act 2 — mid-flight statement */
  const midOpacity = useTransform(smooth, [0.28, 0.36, 0.5, 0.58], [0, 1, 1, 0]);
  const midY = useTransform(smooth, [0.28, 0.58], [60, -60]);
  const midScale = useTransform(smooth, [0.28, 0.58], [0.92, 1.06]);
  const midVisibility = useTransform(midOpacity, (v) => (v < 0.01 ? "hidden" : "visible"));

  /* Act 3 — arrival at Earth */
  const finalOpacity = useTransform(smooth, [0.66, 0.8], [0, 1]);
  const finalY = useTransform(smooth, [0.66, 0.84], [50, 0]);
  const cardX = useTransform(smooth, [0.7, 0.88], [60, 0]);
  const cardOpacity = useTransform(smooth, [0.7, 0.86], [0, 1]);

  /* Atmosphere — purple/orange cosmic wash fades into Earth's blue */
  const nebulaGlow = useTransform(smooth, [0, 0.5], [1, 0]);
  const nebulaVisibility = useTransform(nebulaGlow, (v) => (v < 0.01 ? "hidden" : "visible"));
  const earthGlow = useTransform(smooth, [0.55, 0.85], [0, 1]);
  const scrim = useTransform(smooth, [0.6, 0.85], [0, 1]);
  const progressScale = useTransform(smooth, [0, 1], [0, 1]);

  // Reduced motion: static final frame with all content visible.
  if (reduceMotion) {
    return (
      <section className="relative h-screen min-h-[720px] overflow-hidden bg-primary-950">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/85 via-primary-950/40 to-transparent" />
        <FinalContent />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[420vh] bg-primary-950"
      aria-label={t.sectionLabel}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Film */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />

        {/* Color grading layers */}
        <motion.div
          aria-hidden
          style={{ opacity: nebulaGlow, visibility: nebulaVisibility }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-[10%] top-[10%] h-[60vmax] w-[60vmax] rounded-full bg-nebula-600/20 blur-[100px] animate-drift will-change-transform" />
          <div className="absolute -right-[15%] bottom-[-10%] h-[55vmax] w-[55vmax] rounded-full bg-ember-500/15 blur-[100px] animate-drift-slow will-change-transform" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ opacity: earthGlow }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-500/10 via-transparent to-transparent"
        />
        <motion.div
          aria-hidden
          style={{ opacity: scrim }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-950/75 via-primary-950/20 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(4,8,20,0.85)_100%)]"
        />
        <StarDust />

        {/* Act 1 */}
        <motion.div
          style={{ opacity: introOpacity, scale: introScale, filter: introBlur, visibility: introVisibility }}
          className="absolute inset-0 flex items-center justify-center px-6 pt-24"
        >
          <div className="max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0.25, y: 20, letterSpacing: "0.6em" }}
              animate={mounted ? { opacity: 1, y: 0, letterSpacing: "0.35em" } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-xs font-semibold uppercase text-ember-300 sm:text-sm"
            >
              {t.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0.25, y: 40 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] sm:text-7xl lg:text-8xl"
            >
              {t.titleLine1}
              <br />
              <span className="text-cosmic">{t.titleLine2}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0.25, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-xl text-lg text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-xl"
            >
              {t.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0.25, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <QuoteButton />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em]">
            {t.scrollCue}
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>

        {/* Act 2 */}
        <motion.div
          style={{ opacity: midOpacity, y: midY, scale: midScale, visibility: midVisibility }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
          aria-hidden
        >
          <p className="max-w-4xl text-center text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] sm:text-6xl">
            {t.midLine1}
            <br />
            <span className="text-cosmic">{t.midLine2}</span>
          </p>
        </motion.div>

        {/* Act 3 */}
        <FinalContent
          style={{ opacity: finalOpacity, y: finalY }}
          cardStyle={{ opacity: cardOpacity, x: cardX }}
          interactive={finalOpacity}
        />

        {/* Flight progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progressScale }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-nebula-500 via-ember-400 to-primary-400"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function QuoteButton() {
  const t = useT(copy);
  return (
    <a
      href={QUOTE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-silver-3d group inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-primary-900 transition-all duration-300"
    >
      {t.quoteButton}
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

type MV = MotionValue<number>;

function FinalContent({
  style,
  cardStyle,
  interactive,
}: {
  style?: { opacity: MV; y: MV };
  cardStyle?: { opacity: MV; x: MV };
  interactive?: MV;
}) {
  const t = useT(copy);
  // Only accept clicks once the final scene is visible.
  const pointerEvents = useTransform(interactive ?? ONE, (v) =>
    v > 0.5 ? "auto" : "none",
  );
  const visibility = useTransform(interactive ?? ONE, (v) =>
    v < 0.01 ? "hidden" : "visible",
  );

  return (
    <motion.div
      style={{ ...style, pointerEvents, visibility }}
      className="absolute inset-0 flex items-center"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pt-28 pb-10">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-16">
          <div className="w-full space-y-7 lg:w-1/2">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-5xl">
              {t.finalHeading}{" "}
              <span className="text-cosmic">{t.finalHeadingAccent}</span>
            </h2>
            <p className="max-w-lg text-lg text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {t.finalText}
            </p>
            <div className="flex flex-wrap gap-4">
              <QuoteButton />
              <a
                href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                {t.callButton}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-8 pt-2">
              {statValues.map((value, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-black text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] sm:text-4xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/80">
                    {t.stats[i]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            style={cardStyle}
            className="relative hidden w-full sm:block lg:w-5/12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-primary-950/40 p-8 shadow-[0_30px_80px_-20px_rgba(76,29,149,0.55)] backdrop-blur-xl">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/70 to-transparent"
              />
              <h3 className="mb-6 text-xl font-bold text-white">
                {t.cardTitle}
              </h3>
              <ul className="space-y-5">
                {heroFeatureIcons.map((Icon, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-nebula-500/30 to-ember-500/20 text-white ring-1 ring-white/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="pt-1.5 text-base leading-relaxed text-white">
                      {t.features[i]}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-6 text-sm text-primary-100">
                <CheckCircle2 className="h-4 w-4 text-ember-300" />
                {t.guarantee}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Static motion value used when the final content is shown without scroll.
const ONE = motionValue(1);

/** Twinkling foreground particles for extra depth over the film. */
function StarDust() {
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      left: (i * 37.7) % 100,
      top: (i * 61.3) % 100,
      size: (i % 3) + 1,
      delay: (i % 10) * 0.6,
      tint: i % 7 === 0 ? "bg-ember-300" : i % 5 === 0 ? "bg-nebula-300" : "bg-white",
    })),
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${s.tint} animate-twinkle`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
