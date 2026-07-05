"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Decorative animated 3D laser-engraving scenes flanking the hero copy on
 * wide screens. Pure CSS-3D + framer-motion (no video, no external assets):
 * a laser dot traces a flourish into a tilted walnut board, and a rotating
 * tumbler takes an engraving band under a fixed beam. Purely visual:
 * aria-hidden, pointer-events-none, hidden below xl; reduced-motion users
 * get the finished static engraving.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** One engraving pass: 80% of the loop burns, 20% holds the finished mark. */
const PASS = {
  duration: 7,
  times: [0, 0.8, 1],
  repeat: Infinity,
  ease: "linear" as const,
};

/* ------------------------- Wood board scene ------------------------- */

function WoodScene({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, oklch(0.32 0.03 55) 0%, oklch(0.19 0.02 50) 70%)",
        perspective: "700px",
      }}
    >
      {/* Tilted engraving plane: board + traced flourish + laser dot */}
      <div
        className="absolute inset-x-5 bottom-4 top-10"
        style={{ transform: "rotateX(38deg)", transformStyle: "preserve-3d" }}
      >
        {/* Walnut board */}
        <div
          className="absolute inset-0 rounded-2xl border border-black/30"
          style={{
            background:
              "repeating-linear-gradient(98deg, oklch(0.42 0.06 55) 0px, oklch(0.36 0.055 50) 7px, oklch(0.45 0.06 60) 14px, oklch(0.38 0.055 52) 22px)",
            boxShadow:
              "0 30px 40px -18px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        />

        {/* "FomaPrint" wordmark burned in left-to-right, the laser dot
            riding the reveal edge so the letters appear behind it */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.span
              className="block whitespace-nowrap font-heading text-[22px] font-bold tracking-wide 2xl:text-[26px]"
              style={{
                color: "oklch(0.22 0.045 45)",
                textShadow: "0 1px 0 rgba(255,255,255,0.1)",
              }}
              initial={{
                clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              }}
              animate={
                reduce
                  ? undefined
                  : {
                      clipPath: [
                        "inset(0 100% 0 0)",
                        "inset(0 0% 0 0)",
                        "inset(0 0% 0 0)",
                      ],
                    }
              }
              transition={reduce ? undefined : PASS}
            >
              FomaPrint
            </motion.span>
            {!reduce && (
              <motion.span
                className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full"
                style={{
                  background: "oklch(0.97 0.05 85)",
                  boxShadow:
                    "0 0 6px 2px oklch(0.85 0.15 65), 0 0 18px 7px oklch(0.7 0.18 45 / 0.55)",
                }}
                animate={{ left: ["0%", "100%", "100%"], opacity: [1, 1, 0] }}
                transition={PASS}
              />
            )}
          </div>
        </div>
      </div>

      {/* Rising smoke wisp */}
      {!reduce && (
        <motion.div
          className="absolute left-1/2 top-1/3 h-16 w-8 -translate-x-1/2 rounded-full blur-md"
          style={{ background: "oklch(0.9 0.01 60 / 0.14)" }}
          animate={{ y: [-4, -26], opacity: [0, 0.5, 0], scaleX: [0.7, 1.4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </div>
  );
}

/* --------------------------- Tumbler scene -------------------------- */

function TumblerScene({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, oklch(0.3 0.02 260) 0%, oklch(0.17 0.015 260) 70%)",
      }}
    >
      {/* Tumbler body — cylindrical shading */}
      <div
        className="absolute left-1/2 top-[16%] h-[70%] w-[38%] -translate-x-1/2 rounded-[18%_18%_22%_22%/6%_6%_8%_8%]"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.14 0.01 260) 0%, oklch(0.34 0.015 260) 22%, oklch(0.5 0.015 260) 50%, oklch(0.34 0.015 260) 78%, oklch(0.12 0.01 260) 100%)",
          boxShadow: "0 26px 30px -16px rgba(0,0,0,0.7)",
        }}
      >
        {/* Lid */}
        <div
          className="absolute -top-[6%] left-1/2 h-[8%] w-[86%] -translate-x-1/2 rounded-[50%/100%]"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.2 0.01 260), oklch(0.55 0.01 260) 50%, oklch(0.2 0.01 260))",
          }}
        />

        {/* Rotating engraving band */}
        <div className="absolute inset-x-[6%] top-[38%] h-[22%] overflow-hidden rounded-sm">
          <motion.div
            className="flex h-full w-[300%] items-center"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={
              reduce
                ? undefined
                : { duration: 9, repeat: Infinity, ease: "linear" }
            }
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                className="flex h-full w-1/2 shrink-0 items-center justify-around font-heading text-[10px] font-bold uppercase tracking-[0.24em]"
                style={{ color: "oklch(0.72 0.12 60 / 0.85)" }}
              >
                <span>FomaPrint</span>
                <span>FomaPrint</span>
              </span>
            ))}
          </motion.div>
          {/* cylinder curvature shading over the band */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.1 0.01 260 / 0.85) 0%, transparent 30%, transparent 70%, oklch(0.1 0.01 260 / 0.85) 100%)",
            }}
          />
        </div>
      </div>

      {/* Fixed laser beam onto the band center */}
      {!reduce && (
        <>
          <motion.div
            className="absolute left-1/2 top-[6%] h-[43%] w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.9 0.1 70 / 0) 0%, oklch(0.9 0.12 70 / 0.9) 100%)",
              boxShadow: "0 0 8px 1px oklch(0.85 0.15 65 / 0.6)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Contact glow */}
          <motion.div
            className="absolute left-1/2 top-[48%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "oklch(0.97 0.04 85)",
              boxShadow:
                "0 0 8px 3px oklch(0.85 0.15 65), 0 0 24px 10px oklch(0.7 0.18 45 / 0.5)",
            }}
            animate={{ scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Sparks */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-[48%] size-1 rounded-full"
              style={{ background: "oklch(0.88 0.14 70)" }}
              animate={{
                x: [0, (i - 1) * 22 + 8],
                y: [0, -14 - i * 7, 10],
                opacity: [1, 1, 0],
                scale: [1, 0.6],
              }}
              transition={{
                duration: 0.9,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

/* ------------------------------ Layout ------------------------------ */

const CARDS = [
  {
    key: "wood",
    label: "Laser engraving · wood",
    pos: "left-[2%] top-1/2 -translate-y-1/2 w-52 2xl:left-[5%] 2xl:w-64",
    rotate: -5,
    drift: 10,
    duration: 8,
    delay: 0.25,
    Scene: WoodScene,
  },
  {
    key: "tumbler",
    label: "Laser engraving · steel",
    pos: "right-[2%] top-1/2 -translate-y-1/2 w-52 2xl:right-[5%] 2xl:w-64",
    rotate: 5,
    drift: 11,
    duration: 9,
    delay: 0.45,
    Scene: TumblerScene,
  },
];

function CardShell({
  label,
  reduce,
  children,
}: {
  label: string;
  reduce: boolean;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-ink shadow-card">
      {children}
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="relative flex size-1.5 shrink-0">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
          )}
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
        <span className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

export function HeroShowcase() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden select-none xl:block"
    >
      {CARDS.map(({ key, label, pos, rotate, drift, duration, delay, Scene }) => (
        <div key={key} className={`absolute ${pos}`}>
          {reduce ? (
            <div style={{ rotate: `${rotate}deg` }}>
              <CardShell label={label} reduce>
                <Scene reduce />
              </CardShell>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate }}
              animate={{ opacity: 1, scale: 1, rotate }}
              transition={{ duration: 0.7, delay, ease: EASE }}
            >
              <motion.div
                animate={{ y: [0, -drift, 0] }}
                transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <CardShell label={label} reduce={false}>
                  <Scene reduce={false} />
                </CardShell>
              </motion.div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
