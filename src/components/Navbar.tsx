"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useIntro } from "./IntroGate";
import { assetPath } from "@/lib/assetPath";

export default function Navbar() {
  const { replayIntro } = useIntro();
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      /* Logo blanco en hero y secciones oscuras */
      setOnHero(window.scrollY < window.innerHeight * 0.95);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-nav ${onHero ? "site-nav--hero" : "site-nav--light"}`}>
      <div className="site-nav-bar">
        <button
          type="button"
          onClick={replayIntro}
          className="nav-brand"
          aria-label="MALI — ver intro"
        >
          <Image
            src={onHero ? assetPath("/logo_mali_white.png") : assetPath("/logo_mali.png")}
            alt="MALI"
            width={72}
            height={72}
            className={onHero ? "nav-logo-white" : "nav-logo-blend"}
            priority
          />
        </button>

        <a href="#contacto" className="nav-cta">
          Hablemos
        </a>
      </div>
    </nav>
  );
}
