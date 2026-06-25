"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/assetPath";

gsap.registerPlugin(ScrollTrigger);

type SlotItem = { row: number; col: number };

export const CREATORS = [
  { name: "Busta Brothers", image: assetPath("/influencers/creator-1.png"), row: 1, col: 1 },
  { name: "Luciana Guchner", image: assetPath("/influencers/creator-2.png"), row: 2, col: 2 },
  { name: "Jonathan Cruz", image: assetPath("/influencers/creator-3.png"), row: 1, col: 3 },
  { name: "Nexar Gomez", image: assetPath("/influencers/image copy 3.png"), row: 2, col: 4 },
] satisfies (SlotItem & { name: string; image: string })[];

export const BRAND_POOL = [
  { name: "Marca 1", image: assetPath("/empresas/brand-1.png") },
  { name: "Marca 2", image: assetPath("/empresas/brand-2.png") },
  { name: "Marca 3", image: assetPath("/empresas/brand-3.png") },
  { name: "Marca 4", image: assetPath("/empresas/brand-4.png") },
  { name: "Marca 5", image: assetPath("/empresas/brand-5.png") },
  { name: "Marca 6", image: assetPath("/empresas/brand-6.png") },
  { name: "Marca 7", image: assetPath("/empresas/image copy 7.png") },
  { name: "Marca 8", image: assetPath("/empresas/image copy 8.png") },
];

const BRAND_SLOTS = [
  { row: 1, col: 1, startIndex: 0 },
  { row: 2, col: 2, startIndex: 2 },
  { row: 1, col: 3, startIndex: 4 },
  { row: 2, col: 4, startIndex: 6 },
];

const MOBILE_CREATORS = CREATORS;

function PortraitCell({ name, image }: { name: string; image: string }) {
  return (
    <div className="grid-portrait-cell grid-reveal-item">
      <Image src={image} alt={name} fill sizes="25vw" className="grid-portrait-img" />
      <div className="grid-portrait-gradient" />
      <span className="grid-portrait-name">{name}</span>
    </div>
  );
}

function BrandRotatorCell({ startIndex }: { startIndex: number }) {
  const [index, setIndex] = useState(startIndex % BRAND_POOL.length);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeMs = 220;
    const intervalMs = 2200;
    const phaseOffset = (startIndex % BRAND_POOL.length) * 350;

    let intervalId: ReturnType<typeof setInterval>;

    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % BRAND_POOL.length);
          setFade(true);
        }, fadeMs);
      }, intervalMs);
    }, phaseOffset);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [startIndex]);

  const brand = BRAND_POOL[index];

  return (
    <div className="grid-brand-cell grid-reveal-item">
      <div className="grid-brand-logo-wrap">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          sizes="180px"
          className={`grid-brand-img ${fade ? "grid-brand-img--in" : "grid-brand-img--out"}`}
        />
      </div>
    </div>
  );
}

function MobileCarousel({
  type,
  creators,
}: {
  type: "creators" | "brands";
  creators?: typeof CREATORS;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const creatorItems = creators ?? MOBILE_CREATORS;
  const slideCount = type === "creators" ? creatorItems.length : BRAND_POOL.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || slideCount <= 1) return;

    const onScroll = () => {
      const first = track.querySelector<HTMLElement>(".grid-mobile-slide");
      if (!first) return;
      const slideWidth = first.offsetWidth + 12;
      const index = Math.round(track.scrollLeft / slideWidth);
      setActiveIndex(Math.min(index, slideCount - 1));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slideCount]);

  return (
    <div className="grid-mobile-carousel-wrap">
      <div ref={trackRef} className={`grid-mobile-carousel grid-mobile-carousel--${type}`}>
        {type === "creators"
          ? creatorItems.map((creator) => (
              <article key={creator.name} className="grid-mobile-slide grid-mobile-slide--portrait grid-reveal-item">
                <div className="grid-mobile-slide-media">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    sizes="45vw"
                    className="grid-portrait-img"
                  />
                  <div className="grid-portrait-gradient" />
                </div>
                <span className="grid-portrait-name">{creator.name}</span>
              </article>
            ))
          : BRAND_POOL.map((brand) => (
              <article key={brand.name} className="grid-mobile-slide grid-mobile-slide--brand grid-reveal-item">
                <div className="grid-mobile-brand-logo">
                  <Image src={brand.image} alt={brand.name} fill sizes="120px" className="grid-brand-img" />
                </div>
              </article>
            ))}
      </div>

      {slideCount > 1 && (
        <div className="grid-mobile-dots" aria-hidden>
          {Array.from({ length: slideCount }).map((_, i) => (
            <span key={i} className={`grid-mobile-dot ${i === activeIndex ? "grid-mobile-dot--active" : ""}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GridShowcase({
  type,
  items,
  titleLine1,
  titleLine2,
  id,
}: {
  type: "creators" | "brands";
  items?: typeof CREATORS;
  titleLine1: string;
  titleLine2: string;
  id?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const revealItems = el.querySelectorAll<HTMLElement>(".grid-reveal-item");
    const titles = el.querySelectorAll<HTMLElement>(".grid-reveal-title");
    const targets = el.querySelectorAll<HTMLElement>(".grid-reveal-item, .grid-reveal-title");

    gsap.set(targets, { opacity: 0, y: 40, scale: 0.97 });

    const playReveal = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      gsap.to(revealItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.to(titles, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
      });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        once: true,
        onEnter: playReveal,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) playReveal();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const creatorAt = (row: number, col: number) =>
    items?.find((item) => item.row === row && item.col === col);

  const brandAt = (row: number, col: number) =>
    BRAND_SLOTS.find((slot) => slot.row === row && slot.col === col);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`grid-showcase-section grid-showcase-section--${type}`}
    >
      {/* Desktop: grilla 3×4 */}
      <div className="grid-triple-inner grid-showcase-desktop">
        {[1, 2, 3, 4].map((col) => {
          const creator = creatorAt(1, col);
          const brand = brandAt(1, col);

          return (
            <div
              key={`1-${col}`}
              className={`grid-triple-cell ${(type === "creators" ? creator : brand) ? (type === "brands" ? "grid-triple-cell--brand" : "") : "grid-triple-cell--empty"}`}
            >
              {creator && type === "creators" && (
                <PortraitCell name={creator.name} image={creator.image} />
              )}
              {brand && type === "brands" && (
                <BrandRotatorCell startIndex={brand.startIndex} />
              )}
            </div>
          );
        })}

        {[1, 2, 3, 4].map((col) => {
          const creator = creatorAt(2, col);
          const brand = brandAt(2, col);

          return (
            <div
              key={`2-${col}`}
              className={`grid-triple-cell ${(type === "creators" ? creator : brand) ? (type === "brands" ? "grid-triple-cell--brand" : "") : "grid-triple-cell--empty"}`}
            >
              {creator && type === "creators" && (
                <PortraitCell name={creator.name} image={creator.image} />
              )}
              {brand && type === "brands" && (
                <BrandRotatorCell startIndex={brand.startIndex} />
              )}
            </div>
          );
        })}

        <div className="grid-triple-title-row grid-reveal-title">
          <h2 className="grid-quad-title grid-quad-title--tall">{titleLine1}</h2>
          <p className="grid-quad-subtitle">{titleLine2}</p>
        </div>
      </div>

      {/* Mobile: carrusel simplificado */}
      <div className="grid-showcase-mobile">
        <div className="grid-showcase-mobile-header grid-reveal-title">
          <h2 className="grid-quad-title grid-quad-title--tall">{titleLine1}</h2>
          <p className="grid-quad-subtitle">{titleLine2}</p>
        </div>
        <MobileCarousel type={type} creators={type === "creators" ? items : undefined} />
      </div>
    </section>
  );
}
