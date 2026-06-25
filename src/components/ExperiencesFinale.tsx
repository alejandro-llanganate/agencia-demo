"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/assetPath";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = assetPath("/videos/tiktok-commercial.mp4");
const TYPING_TEXT = "¿Quieres ver otras experiencias?";

const EXPERIENCES = [
  {
    slug: "pizza-fest",
    title: "Pizza Fest",
    subtitle: "Producción · Branding · Campaña",
    image: assetPath("/empresas/image copy 10.png"),
    href: "/experiencias/pizza-fest",
  },
];

export default function ExperiencesFinale() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    const bg = bgRef.current;
    const typo = typoRef.current;
    if (!bg || !typo) return;

    const layers = typo.querySelectorAll<HTMLElement>(".hero-glitch");
    gsap.set(layers, { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      const rect = bg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(typo, {
        x: x * -88,
        y: y * -56,
        duration: 0.65,
        ease: "power2.out",
      });

      layers.forEach((layer, i) => {
        gsap.to(layer, {
          x: x * (10 + i * 12),
          y: y * (6 + i * 8),
          duration: 0.5 + i * 0.1,
          ease: "power2.out",
        });
      });
    };

    const onLeave = () => {
      gsap.to(typo, { x: 0, y: 0, duration: 0.75, ease: "power2.out" });
      layers.forEach((layer) => {
        gsap.to(layer, { x: 0, y: 0, duration: 0.75, ease: "power2.out" });
      });
    };

    bg.addEventListener("mousemove", onMove);
    bg.addEventListener("mouseleave", onLeave);

    return () => {
      bg.removeEventListener("mousemove", onMove);
      bg.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let typingInterval: ReturnType<typeof setInterval> | undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el.querySelector(".exp-finale-bottom"),
        start: "top 88%",
        once: true,
        onEnter: () => {
          let charIndex = 0;
          typingInterval = setInterval(() => {
            charIndex += 1;
            setTyped(TYPING_TEXT.slice(0, charIndex));
            if (charIndex >= TYPING_TEXT.length) {
              clearInterval(typingInterval);
              setTypingDone(true);
              gsap.from(".exp-card", {
                y: 32,
                opacity: 0,
                duration: 0.75,
                ease: "power3.out",
              });
            }
          }, 42);
        },
      });

      gsap.from(".exp-finale-typo", {
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="exp-finale">
      <div ref={bgRef} className="exp-finale-bg" aria-hidden>
        <video
          ref={videoRef}
          className="exp-finale-video"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="exp-finale-vignette" />
        <div className="exp-finale-tint" />
        <div ref={typoRef} className="exp-finale-typo">
          <div className="hero-glitch-line">
            <span className="hero-glitch hero-glitch--red">CREA CON MALI</span>
            <span className="hero-glitch hero-glitch--main">CREA CON MALI</span>
            <span className="hero-glitch hero-glitch--cream">CREA CON MALI</span>
          </div>
        </div>
      </div>

      <div className="exp-finale-bottom">
        <p className="exp-typing">
          {typed}
          <span className={`exp-cursor ${typingDone ? "exp-cursor--hide" : ""}`}>|</span>
        </p>

        <div className="exp-cards">
          {EXPERIENCES.map((exp) => (
            <Link key={exp.slug} href={exp.href} className="exp-card">
              <div className="exp-card-image">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width:900px) 92vw, 420px"
                  className="exp-card-img"
                />
              </div>
              <div className="exp-card-body">
                <h3 className="exp-card-title">{exp.title}</h3>
                <p className="exp-card-sub">{exp.subtitle}</p>
                <span className="exp-card-cta">Ver caso →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
