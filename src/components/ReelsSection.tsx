"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REELS = [
  { id: "qeeTg3ZBut4", label: "Campaña 01" },
  { id: "YyqP2VYu4c4", label: "Campaña 02" },
  { id: "TsolfBvNTeM", label: "Campaña 03" },
];

export default function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".reels-card");
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const phone = card.querySelector<HTMLElement>(".reels-phone");
      if (!phone) return;

      gsap.set(phone, { transformPerspective: 900, transformStyle: "preserve-3d" });

      const onEnter = () => {
        gsap.to(phone, {
          y: -14,
          scale: 1.05,
          duration: 0.45,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".reels-label"), {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(phone, {
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.55,
          ease: "power2.out",
        });
      };

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        gsap.to(phone, {
          rotateY: x * 22,
          rotateX: -y * 14,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("mousemove", onMove);

      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
        card.removeEventListener("mousemove", onMove);
      });
    });

    const ctx = gsap.context(() => {
      gsap.from(".reels-card", {
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        y: 56,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="reels" className="reels-section">
      <div className="reels-inner">
        <p className="reels-eyebrow">Contenido real</p>
        <h2 className="reels-title">Reels que convertimos</h2>
        <p className="reels-desc">
          Piezas verticales listas para TikTok, Reels y Shorts — estrategia, producción y resultado.
        </p>

        <div className="reels-grid">
          {REELS.map((reel) => (
            <article key={reel.id} className="reels-card">
              <div className="reels-phone">
                <div className="reels-phone-notch" aria-hidden />
                <div className="reels-phone-screen">
                  <iframe
                    src={`https://www.youtube.com/embed/${reel.id}?rel=0&modestbranding=1&playsinline=1`}
                    title={reel.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
              <span className="reels-label">{reel.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
