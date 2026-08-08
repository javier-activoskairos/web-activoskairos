"use client";
// Dispara el evento de vista una sola vez por montaje. El ref evita el doble
// disparo del StrictMode de React en desarrollo.
import React from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackView({ event }) {
  const sent = React.useRef(false);
  React.useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent(event);
  }, [event]);
  return null;
}
