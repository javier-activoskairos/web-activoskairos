"use client";
// Composición de la landing Kairos Vitae (orden de ui_kits/website/vitae.html).
// Reutiliza Nav y Footer del sitio; el resto son secciones propias de Vitae.
import React from "react";
import { Nav } from "../Nav";
import { Footer } from "../Contact";
import { VitaeStyles } from "./ui";
import { VitaeHero } from "./VitaeHero";
import { VitaeProblem } from "./VitaeProblem";
import { VitaePrinciples } from "./VitaePrinciples";
import { VitaeCore } from "./VitaeCore";
import { VitaeModules } from "./VitaeModules";
import { VitaeAI } from "./VitaeAI";
import { VitaePhilosophy } from "./VitaePhilosophy";
import { VitaeCTA } from "./VitaeCTA";

export function VitaeLanding() {
  return (
    <React.Fragment>
      <VitaeStyles />
      <Nav />
      <main>
        <VitaeHero />
        <VitaeProblem />
        <VitaePrinciples />
        <VitaeCore />
        <VitaeModules />
        <VitaeAI />
        <VitaePhilosophy />
        <VitaeCTA />
      </main>
      <Footer />
    </React.Fragment>
  );
}
