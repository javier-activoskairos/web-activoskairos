"use client";
// Kairos icon set — Lucide-style line icons (24px grid, 1.75 stroke, round caps).
import React from "react";

export function KairosIcon({
  children,
  size = 24,
  stroke = 1.75,
  style = {},
  ...rest
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...rest}
    >
      {children}
    </svg>
  );
}
const Icon = KairosIcon;

export const ArrowRight = (p) => (
  <Icon {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);
export const ArrowDown = (p) => (
  <Icon {...p}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </Icon>
);
export const ArrowUpRight = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Icon>
);
export const Check = (p) => (
  <Icon {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);
export const Sparkles = (p) => (
  <Icon {...p}>
    <path d="M9.9 3.4 11 7l3.6 1.1L11 9.2 9.9 12.8 8.8 9.2 5.2 8.1 8.8 7z" />
    <path d="M18 4v3M19.5 5.5h-3M18 17v3M19.5 18.5h-3" />
  </Icon>
);
export const Layers = (p) => (
  <Icon {...p}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </Icon>
);
export const Workflow = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
  </Icon>
);
export const Compass = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m15.7 8.3-2 5.4-5.4 2 2-5.4z" />
  </Icon>
);
export const Database = (p) => (
  <Icon {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </Icon>
);
export const Users = (p) => (
  <Icon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
  </Icon>
);
export const Clock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7v5l3.5 2" />
  </Icon>
);
export const Gauge = (p) => (
  <Icon {...p}>
    <path d="M12 14 16 9" />
    <path d="M3.5 16a9 9 0 1 1 17 0" />
    <circle cx="12" cy="14" r="1.5" />
  </Icon>
);
export const Quote = (p) => (
  <Icon {...p}>
    <path d="M6 11c0-3 2-5 5-5M6 11h4v6H4v-4M18 11c0-3-2-5-5-5M18 11h-4v6h6v-4" />
  </Icon>
);
export const Menu = (p) => (
  <Icon {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Icon>
);
export const Mail = (p) => (
  <Icon {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);
export const Shield = (p) => (
  <Icon {...p}>
    <path d="M12 2.5 4 5.5v6c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10v-6z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
export const Link = (p) => (
  <Icon {...p}>
    <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
  </Icon>
);
export const ChevronLeft = (p) => (
  <Icon {...p}>
    <path d="m15 18-6-6 6-6" />
  </Icon>
);
export const MessageCircle = (p) => (
  <Icon {...p}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L3 21z" />
  </Icon>
);
export const Calendar = (p) => (
  <Icon {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 3v3M16 3v3" />
  </Icon>
);
export const TrendingUp = (p) => (
  <Icon {...p}>
    <path d="M3 17 9 11l4 4 8-8" />
    <path d="M17 4h4v4" />
  </Icon>
);
export const ChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);
export const Table = (p) => (
  <Icon {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M3 10h18M3 14.5h18M9 4.5v15M15 4.5v15" />
  </Icon>
);
