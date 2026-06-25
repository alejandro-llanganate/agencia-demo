import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";

const DELIVERABLES = [
  "Identidad visual del evento y key visual principal",
  "Piezas gráficas para redes y medios digitales",
  "Adaptaciones para ticketing y comunicación del festival",
  "Dirección creativa alineada con Six Studios y oui Producciones",
];

export default function PizzaFestPage() {
  return (
    <div className="case-page">
      <header className="case-nav">
        <Link href="/" className="case-back">
          ← Volver a MALI
        </Link>
      </header>

      <section className="case-hero">
        <div className="case-hero-image">
          <Image
            src={assetPath("/empresas/image copy 10.png")}
            alt="Pizza Fest — campaña visual"
            fill
            priority
            sizes="100vw"
            className="case-hero-img"
          />
          <div className="case-hero-gradient" />
        </div>
        <div className="case-hero-copy">
          <p className="case-eyebrow">Experiencia MALI</p>
          <h1 className="case-title">Pizza Fest</h1>
          <p className="case-lead">
            Festival gastronómico y musical en Quito. MALI co-produjo la experiencia visual
            junto a Six Studios y oui Producciones para una campaña de alto impacto.
          </p>
          <div className="case-meta">
            <div>
              <span className="case-meta-label">Lugar</span>
              <span className="case-meta-value">Parque Bicentenario, Quito</span>
            </div>
            <div>
              <span className="case-meta-label">Rol MALI</span>
              <span className="case-meta-value">Branding · Diseño · Campaña</span>
            </div>
            <div>
              <span className="case-meta-label">Alcance</span>
              <span className="case-meta-value">Digital + activación en vivo</span>
            </div>
          </div>
        </div>
      </section>

      <section className="case-body">
        <div className="case-block">
          <h2>El reto</h2>
          <p>
            Comunicar la energía de un festival que mezcla pizza, música en vivo y experiencias
            memorables. Necesitábamos una identidad vibrante, apetitosa y lista para convertir en
            venta de entradas.
          </p>
        </div>

        <div className="case-block">
          <h2>Lo que hicimos</h2>
          <ul className="case-list">
            {DELIVERABLES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="case-block case-block--highlight">
          <h2>Resultado</h2>
          <p>
            Una campaña visual coherente de punta a punta: desde el key visual con tipografía 3D y
            elementos de pizza, hasta las piezas para artistas, precios y call-to-action en
            buenplan.com.ec. Identidad lista para escalar en pantallas grandes y formatos verticales.
          </p>
        </div>
      </section>

      <footer className="case-footer">
        <Link href="/#contacto" className="case-cta">
          ¿Quieres una experiencia así? Hablemos
        </Link>
      </footer>
    </div>
  );
}
