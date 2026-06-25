"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const VIDEO_SRC = "/videos/tiktok-commercial.mp4";

export default function ScrollExperience() {
  const masterRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sideCopyRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const inscreenUIRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const transitionedRef = useRef(false);

  useEffect(() => {
    bgVideoRef.current?.play().catch(() => {});
    screenVideoRef.current?.play().catch(() => {});

    const phone = phoneRef.current;
    const scene = sceneRef.current;
    const sideCopy = sideCopyRef.current;
    const bgText = bgTextRef.current;
    const phoneWrap = phoneWrapRef.current;
    const master = masterRef.current;

    const restoreHero = () => {
      if (!master) return;
      gsap.set(master, { opacity: 1 });
      gsap.set(phoneWrap, { opacity: 1, scale: 1, filter: "none", x: 0, y: 0 });
      gsap.set(sideCopy, { opacity: 1, x: 0, y: 0 });
      gsap.set(bgText, { opacity: 1, x: 0, y: 0 });
      gsap.set(phone, { rotateX: 0, rotateY: 0, x: 0, y: 0 });
      transitionedRef.current = false;
    };

    const onMove = (e: MouseEvent) => {
      if (!scene || !phone || transitionedRef.current) return;
      const rect = scene.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(phone, {
        rotateY: x * 38,
        rotateX: -y * 24,
        x: x * 42,
        y: y * 22,
        duration: 0.45,
        ease: "power2.out",
      });

      if (sideCopy) {
        gsap.to(sideCopy, { x: x * -65, y: y * -38, duration: 0.55, ease: "power2.out" });
      }
      if (bgText) {
        gsap.to(bgText, { x: x * -95, y: y * -60, duration: 0.75, ease: "power1.out" });
      }
    };

    const goToStatement = () => {
      if (transitionedRef.current) return;
      transitionedRef.current = true;

      const statement = document.getElementById("statement");

      gsap
        .timeline({
          onComplete: () => {
            statement?.scrollIntoView({ behavior: "smooth", block: "start" });
          },
        })
        .to(sideCopyRef.current, { opacity: 0, x: -40, duration: 0.55, ease: "power2.in" }, 0)
        .to(bgTextRef.current, { opacity: 0, duration: 0.45, ease: "power2.in" }, 0)
        .to(
          phoneWrapRef.current,
          { opacity: 0, scale: 0.92, filter: "blur(6px)", duration: 0.6, ease: "power2.in" },
          0
        )
        .to(masterRef.current, { opacity: 0.25, duration: 0.45, ease: "power2.in" }, 0.1);
    };

    const onPhoneMove = (e: MouseEvent) => {
      if (!phoneWrap || transitionedRef.current) return;
      const rect = phoneWrap.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (inside) goToStatement();
    };

    const onPhoneTap = () => goToStatement();

    const onScroll = () => {
      if (!master) return;
      const rect = master.getBoundingClientRect();
      const heroVisible = rect.top >= -40 && rect.top < window.innerHeight * 0.55;
      if (heroVisible && window.scrollY < window.innerHeight * 0.85) {
        restoreHero();
      }
    };

    scene?.addEventListener("mousemove", onMove);
    scene?.addEventListener("mousemove", onPhoneMove);
    phoneWrap?.addEventListener("click", onPhoneTap);
    window.addEventListener("scroll", onScroll, { passive: true });

    const ctx = gsap.context(() => {
      gsap.from(phoneWrapRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(sideCopyRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.to(phoneRef.current, {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, masterRef);

    return () => {
      scene?.removeEventListener("mousemove", onMove);
      scene?.removeEventListener("mousemove", onPhoneMove);
      phoneWrap?.removeEventListener("click", onPhoneTap);
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={masterRef} className="scroll-master scroll-master--static">
      <div className="scroll-viewport scroll-viewport--static">
        <div className="scroll-layer scroll-layer--hero">
          <div ref={sceneRef} className="hero-scene">
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

            <div ref={bgTextRef} className="hero-bg-typo" aria-hidden>
              <div className="hero-glitch-line">
                <span className="hero-glitch hero-glitch--red">CREA CON MALI</span>
                <span className="hero-glitch hero-glitch--main">CREA CON MALI</span>
                <span className="hero-glitch hero-glitch--cream">CREA CON MALI</span>
              </div>
            </div>

            <div className="hero-split">
              <div ref={sideCopyRef} className="hero-side-copy">
                <p className="hero-eyebrow">Creative & Strategy Agency</p>
                <h1 className="hero-side-title">
                  Creamos
                  <br />
                  <span className="hero-accent">contenido</span>
                </h1>
                <h1 className="hero-side-title">
                  Creamos
                  <br />
                  <span className="hero-accent">experiencias</span>
                </h1>
                <p className="hero-side-desc">
                  Desde el celular hasta la pantalla grande. Ideas que se ven,
                  se sienten y convierten.
                </p>
              </div>

              <div className="hero-phone-col">
                <div ref={phoneWrapRef} className="hero-phone-wrap hero-phone-wrap--interactive">
                  <div ref={phoneRef} className="hero-phone-3d">
                    <div className="iphone-shell-hero">
                      <div className="iphone-btn-hero iphone-btn-hero--silent" aria-hidden />
                      <div className="iphone-btn-hero iphone-btn-hero--vol-up" aria-hidden />
                      <div className="iphone-btn-hero iphone-btn-hero--vol-down" aria-hidden />
                      <div className="iphone-btn-hero iphone-btn-hero--power" aria-hidden />

                      <div className="iphone-frame-hero">
                        <div className="iphone-island-hero" aria-hidden>
                          <span className="iphone-island-cam-hero" />
                        </div>

                        <div className="iphone-screen-hero">
                          <div className="iphone-status-hero">
                            <span>9:41</span>
                            <div className="iphone-status-icons-hero">
                              <svg viewBox="0 0 18 12" width="17" height="12" fill="#fff">
                                <rect x="0" y="7" width="3" height="5" rx="0.5" />
                                <rect x="5" y="5" width="3" height="7" rx="0.5" />
                                <rect x="10" y="2" width="3" height="10" rx="0.5" />
                                <rect x="15" y="0" width="3" height="12" rx="0.5" />
                              </svg>
                              <div className="iphone-battery-hero" />
                            </div>
                          </div>

                          <div className="iphone-screen-inner">
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
                            <div ref={inscreenUIRef} className="hero-phone-inscreen">
                              <p>@mali.agency</p>
                              <span className="hero-phone-rec-dot" />
                            </div>
                          </div>

                          <div className="iphone-home-hero" aria-hidden />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="hero-phone-hint">Pasa el cursor sobre el celular</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
