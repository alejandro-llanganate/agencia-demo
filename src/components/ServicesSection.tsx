"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_BG =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop";

const services = [
  {
    num: "01",
    title: "Branding",
    desc: "Identidad que conecta.",
    image:
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=900&q=80&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Estrategia",
    desc: "Planes con resultados.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "Diseño",
    desc: "Experiencias memorables.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Contenido",
    desc: "Historias que convierten.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    if (!section || !visual) return;

    const slides = visual.querySelectorAll<HTMLElement>(".services-visual-slide");
    const imgs = visual.querySelectorAll<HTMLElement>(".services-visual-img");
    const cards = section.querySelectorAll<HTMLElement>(".service-card-item");

    const setActiveSlide = (index: number) => {
      setActiveIndex(index);
      slides.forEach((slide, si) => {
        gsap.to(slide, {
          opacity: si === index ? 1 : 0,
          scale: si === index ? 1 : 1.06,
          duration: 0.55,
          ease: "power2.out",
        });
        const img = imgs[si];
        if (img && si === index) {
          gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power2.out" });
        }
      });
    };

    const ctx = gsap.context(() => {
      gsap.from(".services-heading", {
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 35%",
        end: "bottom 65%",
        onUpdate: (self) => {
          const index = Math.min(services.length - 1, Math.floor(self.progress * services.length));
          setActiveSlide(index);
        },
      });

      cards.forEach((card, i) => {
        card.addEventListener("mouseenter", () => setActiveSlide(i));
        card.addEventListener("click", () => setActiveSlide(i));
      });

      gsap.from(cards, {
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });

      setActiveSlide(0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="services-section">
      <div className="services-bg" aria-hidden>
        <Image src={SERVICES_BG} alt="" fill sizes="100vw" className="services-bg-img" priority={false} />
        <div className="services-bg-overlay" />
      </div>

      <div className="services-layout">
        <div className="services-left">
          <p className="services-eyebrow">Lo que hacemos</p>
          <h2 className="services-heading">Servicios</h2>
          <div className="services-list services-list--grid">
            {services.map((s, i) => (
              <article
                key={s.num}
                className={`service-card-item ${activeIndex === i ? "service-card-item--active" : ""}`}
              >
                <span className="service-card-num">{s.num}</span>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="services-right">
          <div ref={visualRef} className="services-visual">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`services-visual-slide ${activeIndex === i ? "services-visual-slide--active" : ""}`}
              >
                <Image src={s.image} alt={s.title} fill sizes="40vw" className="services-visual-img" unoptimized />
                <div className="services-visual-gradient" />
                <span className="services-visual-tag">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
