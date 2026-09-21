import { NextResponse } from "next/server";

// Sello de build. Lo usa el workflow de deploy (.github/workflows/notion-sync.yml)
// para saber si la imagen nueva ya está sirviendo: lee este valor antes de
// disparar el deploy y espera a que cambie. Un simple 200 de la home no vale,
// porque mientras EasyPanel construye sigue respondiendo el contenedor viejo.
//
// `force-static`: la respuesta se genera una sola vez, en `next build`, así que
// el valor es el instante del build y cambia con cada imagen nueva.
export const dynamic = "force-static";

const BUILT_AT = new Date().toISOString();

export function GET() {
  return NextResponse.json({ build: BUILT_AT });
}
