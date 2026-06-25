"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/assetPath";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = assetPath("/videos/tiktok-commercial.mp4");
const BG_TEXT = "CREA CON MALI";

export default function HeroSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    bgVideoRef.current?.play().catch(() => {});
    screenVideoRef.current?.play().catch(() => {});

    const phone = phoneRef.current;
    const bgText = bgTextRef.current;
    const scene = sceneRef.current;

    const onMove = (e: MouseEvent) => {
      if (!scene || !phone) return;
      const rect = scene.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(phone, {
        rotateY: x * 14,
        rotateX: -y * 10,
        duration: 0.8,
        ease: "power2.out",
      });

      if (bgText) {
        gsap.to(bgText, {
          x: x * -30,
          y: y * -20,
          duration: 1.1,
          ease: "power1.out",
        });
      }
    };

    scene?.addEventListener("mousemove", onMove);

    const ctx = gsap.context(() => {
      gsap.from(phoneWrapRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.88,
        duration: 1.4,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-glitch-line", {
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        stagger: 0.08,
        delay: 0.1,
        ease: "power2.out",
      });

      gsap.from(".hero-phone-copy", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.7,
        ease: "power3.out",
      });

      gsap.to(phoneWrapRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(phoneWrapRef.current, {
          scale: 0.72,
          y: 80,
          opacity: 0.2,
          duration: 0.5,
        }, 0)
        .to(bgTextRef.current, { opacity: 0, scale: 1.15, duration: 0.5 }, 0)
        .to(".hero-bg-media", { scale: 1.1, opacity: 0.4, duration: 0.5 }, 0);
    }, pinRef);

    return () => {
      scene?.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pinRef} className="hero-pin">
      <section ref={heroRef} className="hero-section">
        <div ref={sceneRef} className="hero-scene">
          {/* Fondo cinematográfico */}
          <div className="hero-bg-media" aria-hidden>
            <video
              ref={bgVideoRef}
              className="hero-bg-video"
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="hero-bg-vignette" />
            <div className="hero-bg-tint" />
          </div>

          {/* Texto gigante con aberración cromática */}
          <div ref={bgTextRef} className="hero-bg-typo" aria-hidden>
            {[0, 1].map((row) => (
              <div key={row} className="hero-glitch-line">
                <span className="hero-glitch hero-glitch--red">{BG_TEXT}</span>
                <span className="hero-glitch hero-glitch--main">{BG_TEXT}</span>
                <span className="hero-glitch hero-glitch--cream">{BG_TEXT}</span>
              </div>
            ))}
          </div>

          {/* Celular centrado estilo referencia */}
          <div className="hero-center">
            <div ref={phoneWrapRef} className="hero-phone-wrap">
              <div ref={phoneRef} className="hero-phone-3d">
                <div className="hero-phone-glow" aria-hidden />
                <div className="hero-phone-device">
                  <div className="hero-phone-island" aria-hidden />

                  <div className="hero-phone-status">
                    <span>9:41</span>
                    <div className="hero-phone-status-icons">
                      <span /><span /><span />
                    </div>
                  </div>

                  <div className="hero-phone-icons">
                    <span className="hero-phone-icon" aria-hidden>⌕</span>
                    <span className="hero-phone-icon hero-phone-icon--logo" aria-hidden />
                    <span className="hero-phone-icon" aria-hidden>◯</span>
                  </div>

                  <div className="hero-phone-screen">
                    <video
                      ref={screenVideoRef}
                      className="hero-phone-video"
                      src={VIDEO_SRC}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                    <div className="hero-phone-screen-overlay" />

                    <div className="hero-phone-copy">
                      <h1>
                        Conoce MALI.
                        <br />
                        Un crew creativo
                        <br />
                        en tu celular.
                      </h1>
                      <p>
                        Creamos contenido, dirección y experiencias
                        que transforman tu negocio.
                      </p>
                    </div>
                  </div>

                  <div className="hero-phone-home" aria-hidden />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-scroll-hint">
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </div>
      </section>
    </div>
  );
}
