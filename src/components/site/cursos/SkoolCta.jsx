"use client";
// CTA hacia la comunidad Schole Kairos. Registra el clic ANTES de navegar y
// abre en la misma pestaña, para mantener un flujo predecible.
import React from "react";
import { Button } from "../ds";
import { ArrowRight } from "../icons";
import { trackEvent, EVENTS } from "@/lib/analytics";
import { COMMUNITY_URL_UTM } from "@/content/cursos";

/**
 * @param location — dónde vive el CTA: `hero`, `modules`, `offer`, `footer`.
 */
export function SkoolCta({
  children,
  location,
  size = "lg",
  variant = "primary",
  fullWidth = false,
  withArrow = true,
}) {
  return (
    <Button
      href={COMMUNITY_URL_UTM}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      iconRight={withArrow ? <ArrowRight size={18} /> : null}
      onClick={() => trackEvent(EVENTS.skoolClick, { cta_location: location })}
      style={{
        height: "auto",
        minHeight: size === "lg" ? 56 : 46,
        whiteSpace: "normal",
        textAlign: "center",
      }}
    >
      {children}
    </Button>
  );
}
