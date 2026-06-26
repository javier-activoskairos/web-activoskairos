"use client";
// Composición de la one-page Activos Kairos (orden de index.html del diseño).
import React from "react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Problem, Methodology } from "./Methodology";
import { Services } from "./Services";
import { Cases } from "./Cases";
import { Contact, Footer } from "./Contact";

export function KairosSite() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Methodology />
        <Services />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}
