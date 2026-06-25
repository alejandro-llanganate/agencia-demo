"use client";

import Image from "next/image";
import Link from "next/link";
import { useIntro } from "./IntroGate";
import { assetPath } from "@/lib/assetPath";

const FOOTER_LINKS = {
  agencia: [
    { label: "Creadores", href: "#creadores" },
    { label: "Marcas", href: "#marcas" },
    { label: "Reels", href: "#reels" },
    { label: "Servicios", href: "#servicios" },
    { label: "Métricas", href: "#metricas" },
  ],
  experiencias: [{ label: "Pizza Fest", href: "/experiencias/pizza-fest" }],
  contacto: [
    { label: "Hablemos", href: "#contacto" },
    { label: "WhatsApp", href: "https://wa.me/5255512345678", external: true },
    { label: "hola@mali.agency", href: "mailto:hola@mali.agency", external: true },
  ],
};

export default function SiteFooter() {
  const { replayIntro } = useIntro();

  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <Image
            src={assetPath("/logo_mali_white.png")}
            alt="MALI Agency"
            width={80}
            height={80}
            className="site-footer-logo"
          />
          <p className="site-footer-tagline">
            Creamos historias que venden. Estrategia, contenido y experiencias que convierten.
          </p>
          <div className="site-footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              IG
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              TK
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              IN
            </a>
          </div>
        </div>

        <div className="site-footer-col">
          <h4>Agencia</h4>
          <ul>
            {FOOTER_LINKS.agencia.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-col">
          <h4>Experiencias</h4>
          <ul>
            {FOOTER_LINKS.experiencias.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-col">
          <h4>Contacto</h4>
          <ul>
            {FOOTER_LINKS.contacto.map((link) => (
              <li key={link.href}>
                {"external" in link && link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <a href={link.href}>{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© 2026 MALI Agency. Todos los derechos reservados.</span>
        <div className="site-footer-bottom-links">
          <button type="button" onClick={replayIntro} className="site-footer-replay">
            Ver intro
          </button>
          <span className="site-footer-dot">·</span>
          <span>Quito · México</span>
        </div>
      </div>
    </footer>
  );
}
