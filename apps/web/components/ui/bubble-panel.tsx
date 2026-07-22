"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const K = 0.5523; // bezier constant approximating a quarter-circle arc

// ─── Shape configurations extracted from Figma exports ────────────────────────
// All ratios are normalised to the element's own width / height.

type CurveSeg = { type: "C"; cp1: [number, number]; cp2: [number, number]; end: [number, number] };
type LineSeg = { type: "L"; end: [number, number] };
type StepSeg = CurveSeg | LineSeg;

type ShapeConfig = {
  /** Fixed corner radius in px (does not scale with element size) */
  cornerRadius: number;
  /** Step height as a fraction of total element height (Figma: step_h / canvas_h) */
  stepRatio: number;
  /** Step start x as a fraction of total element width */
  stepStartRatio: number;
  /** Step transition width as a fraction of total element width */
  stepSpanRatio: number;
  /** Normalised S-curve control points, relative to step bounding box */
  stepSegs: StepSeg[];
};

// Rectangle 9692 / 9694 — used for hero, cards, testimonial frame
// Source dimensions: 710 × 309 (9692) and 875 × 320 (9694)
const SHAPE_STANDARD: ShapeConfig = {
  cornerRadius: 36,
  stepRatio: 31.851 / 309, // 10.3%
  stepStartRatio: 226 / 710, // 31.8%
  stepSpanRatio: 69 / 710, // 9.7%
  stepSegs: [
    { type: "C", cp1: [0.181, 0], cp2: [0.354, 0.151], end: [0.484, 0.422] },
    { type: "L", end: [0.582, 0.626] },
    { type: "C", cp1: [0.695, 0.862], cp2: [0.845, 0.994], end: [1, 1] },
  ],
};

// Rectangle 9700 — used for large taller panels
// Source dimensions: 1180 × 652
const SHAPE_LARGE: ShapeConfig = {
  cornerRadius: 36,
  stepRatio: 53.978 / 652, // 8.3%
  stepStartRatio: 339.867 / 1180, // 28.8%
  stepSpanRatio: 93.581 / 1180, // 7.9%
  stepSegs: [
    { type: "C", cp1: [0.129, 0], cp2: [0.253, 0.084], end: [0.348, 0.236] },
    { type: "L", end: [0.697, 0.793] },
    { type: "C", cp1: [0.779, 0.926], cp2: [0.887, 0.999], end: [1, 1] },
  ],
};

// Vector 138 — the signature "photo frame" shape, used to mask images in the
// mission / about sections. Flat notch (not an S-curve) in the bottom-left edge.
// Source dimensions: 380 × 305
const SHAPE_PHOTO: ShapeConfig = {
  cornerRadius: 24,
  stepRatio: 27 / 305, // 8.9%
  stepStartRatio: 131.879 / 380, // 34.7%
  stepSpanRatio: 56.772 / 380, // 14.9%
  stepSegs: [
    { type: "C", cp1: [0.08296, 0], cp2: [0.16406, 0.0513], end: [0.23325, 0.14748] },
    { type: "L", end: [0.76684, 0.85252] },
    { type: "C", cp1: [0.83593, 0.9487], cp2: [0.91708, 1], end: [1, 1] },
  ],
};

export type BubbleShape = "standard" | "large" | "photo";

const SHAPE_CONFIGS: Record<BubbleShape, ShapeConfig> = {
  standard: SHAPE_STANDARD,
  large: SHAPE_LARGE,
  photo: SHAPE_PHOTO,
};

function buildPath(w: number, h: number, shape: ShapeConfig): string {
  const r = shape.cornerRadius;
  const stepH = shape.stepRatio * h;
  const rh = h - stepH; // right-side height (shorter)

  const stepX = w * shape.stepStartRatio;
  const stepSpanX = w * shape.stepSpanRatio;

  const sx = (t: number) => stepX + t * stepSpanX;
  const sy = (t: number) => h - t * stepH;

  const segs: string[] = [
    `M0 ${h - r}`,
    `C0 ${h - r + r * K} ${r * (1 - K)} ${h} ${r} ${h}`,
    `L${stepX} ${h}`,
  ];

  for (const seg of shape.stepSegs) {
    if (seg.type === "C") {
      segs.push(
        `C${sx(seg.cp1[0])} ${sy(seg.cp1[1])} ${sx(seg.cp2[0])} ${sy(seg.cp2[1])} ${sx(seg.end[0])} ${sy(seg.end[1])}`,
      );
    } else {
      segs.push(`L${sx(seg.end[0])} ${sy(seg.end[1])}`);
    }
  }

  segs.push(
    `L${w - r} ${rh}`,
    `C${w - r + r * K} ${rh} ${w} ${rh - r + r * K} ${w} ${rh - r}`,
    `V${r}`,
    `C${w} ${r * (1 - K)} ${w - r * (1 - K)} 0 ${w - r} 0`,
    `H${r}`,
    `C${r * (1 - K)} 0 0 ${r * (1 - K)} 0 ${r}`,
    `L0 ${h - r}`,
    `Z`,
  );

  return segs.join(" ");
}

// ─── Colour + text classes per variant ───────────────────────────────────────

export type BubbleVariant = "teal" | "orange" | "muted" | "cream" | "dark";

// Applied to the wrapper itself so the panel has a correct background before
// hydration measures the bubble shape; `clipPath` then refines it in place.
const bgClass: Record<BubbleVariant, string> = {
  teal: "bg-teal",
  orange: "bg-orange",
  muted: "bg-teal-muted",
  cream: "bg-cream",
  dark: "bg-gray-950",
};

const textClass: Record<BubbleVariant, string> = {
  teal: "text-cream",
  orange: "text-cream",
  muted: "text-teal",
  cream: "text-teal",
  dark: "text-cream",
};

// ─── Component ────────────────────────────────────────────────────────────────

type BubblePanelProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: BubbleVariant;
  /**
   * Which Figma shape to use.
   * "standard" (default) → Rectangle 9692/9694, for hero, cards, testimonial.
   * "large"              → Rectangle 9700, for tall/wider panels.
   * "photo"              → Vector 138, the photo-frame shape for mission/about photos.
   */
  shape?: BubbleShape;
  /**
   * Optional background layer between the shape fill and children —
   * use for photos or gradient overlays. Clipped to the bubble shape automatically.
   */
  media?: React.ReactNode;
};

export function BubblePanel({
  className,
  variant = "teal",
  shape = "standard",
  media,
  children,
  ...props
}: BubblePanelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const box = entry.borderBoxSize[0];
      if (!box) return;
      setSize({ w: Math.round(box.inlineSize), h: Math.round(box.blockSize) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const shapePath = size ? buildPath(size.w, size.h, SHAPE_CONFIGS[shape]) : null;

  return (
    <div
      ref={wrapperRef}
      style={{
        clipPath: shapePath ? `path("${shapePath}")` : undefined,
        borderRadius: shapePath ? undefined : SHAPE_CONFIGS[shape].cornerRadius,
      }}
      className={twMerge(
        "relative overflow-hidden",
        bgClass[variant],
        textClass[variant],
        className,
      )}
      {...props}
    >
      {media && <div className="absolute inset-0 z-[1]">{media}</div>}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
