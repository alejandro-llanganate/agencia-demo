"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { label: "Proyectos", value: 120, suffix: "+" },
  { label: "Clientes", value: 85, suffix: "+" },
  { label: "Satisfacción", value: 98, suffix: "%" },
];

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".metric-card");
    const heading = el.querySelector<HTMLElement>(".metrics-heading");
    const eyebrow = el.querySelector<HTMLElement>(".metrics-eyebrow");
    const introPlayedRef = { current: false };

    const resetCounters = () => {
      tweensRef.current.forEach((t) => t.kill());
      tweensRef.current = [];
      cards.forEach((card) => {
        const numEl = card.querySelector<HTMLElement>(".metric-value-num");
        if (numEl) numEl.textContent = "0";
      });
    };

    const runCounters = () => {
      resetCounters();
      cards.forEach((card, i) => {
        const numEl = card.querySelector<HTMLElement>(".metric-value-num");
        if (!numEl) return;
        const target = Number(numEl.dataset.value);
        const counter = { val: 0 };

        const tween = gsap.to(counter, {
          val: target,
          duration: 2.2,
          delay: i * 0.15,
          ease: "power2.out",
          onUpdate: () => {
            numEl.textContent = String(Math.round(counter.val));
          },
          onComplete: () => {
            numEl.textContent = String(target);
          },
        });
        tweensRef.current.push(tween);
      });
    };

    const playIntro = () => {
      if (introPlayedRef.current) return;
      introPlayedRef.current = true;
      gsap.fromTo(eyebrow, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      gsap.fromTo(heading, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.08, ease: "power3.out" });
      gsap.fromTo(cards, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, delay: 0.12, ease: "power3.out" });
    };

    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const numEl = card.querySelector<HTMLElement>(".metric-value-num");
      const glow = card.querySelector<HTMLElement>(".metric-card-glow");
      if (!numEl) return;

      const onEnter = () => {
        gsap.to(numEl, { scale: 1.18, duration: 0.4, ease: "back.out(2)" });
        gsap.to(card, { y: -6, duration: 0.4, ease: "power2.out" });
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.35 });
      };

      const onLeave = () => {
        gsap.to(numEl, { scale: 1, duration: 0.45, ease: "power2.out" });
        gsap.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: 0.45, ease: "power2.out" });
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.35 });
      };

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.3, ease: "power2.out" });
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
      ScrollTrigger.create({
        trigger: el,
        start: "top 72%",
        end: "bottom 28%",
        onEnter: () => {
          playIntro();
          runCounters();
        },
        onEnterBack: () => {
          runCounters();
        },
        onLeave: resetCounters,
        onLeaveBack: resetCounters,
      });
    }, sectionRef);

    return () => {
      cleanups.forEach((fn) => fn());
      tweensRef.current.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="metricas" className="metrics-section">
      <div className="metrics-grid-bg" aria-hidden />
      <div className="metrics-inner">
        <p className="metrics-eyebrow">Resultados</p>
        <h2 className="metrics-heading">Números que hablan</h2>
        <div className="metrics-cards">
          {METRICS.map((m) => (
            <div key={m.label} className="metric-card">
              <div className="metric-card-glow" aria-hidden />
              <span className="metric-value">
                <span className="metric-value-num" data-value={m.value}>
                  0
                </span>
                <span className="metric-value-suffix">{m.suffix}</span>
              </span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
