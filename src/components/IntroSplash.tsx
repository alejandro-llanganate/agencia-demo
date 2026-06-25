"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { assetPath } from "@/lib/assetPath";

const MARQUEE_TEXT = "CREA CON MALI";

const VIDEO_LOCAL = assetPath("/videos/tiktok-commercial.mp4");
const VIDEO_CDN =
  "https://assets.mixkit.co/videos/49141/49141-720.mp4";

const INTRO_DURATION = 4.5;

type IntroSplashProps = {
  onComplete: () => void;
};

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const marqueeRowsRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressPctLabelRef = useRef<HTMLSpanElement>(null);
  const progressInvertedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    const tryPlay = () => video?.play().catch(() => {});
    tryPlay();
    video?.addEventListener("loadeddata", tryPlay);

    const ctx = gsap.context(() => {
      const marqueeTracks =
        marqueeRowsRef.current?.querySelectorAll(".intro-marquee-track") ?? [];

      const tl = gsap.timeline({ onComplete });

      gsap.set(leftRef.current, { opacity: 0, x: -30 });
      gsap.set(phoneRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(rightRef.current, { opacity: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 16 });
      gsap.set(progressInvertedRef.current, { opacity: 0 });
      gsap.set(overlayRef.current, { scaleY: 0, transformOrigin: "top center" });
      if (progressFillRef.current) gsap.set(progressFillRef.current, { width: "0%" });

      marqueeTracks.forEach((track, i) => {
        gsap.fromTo(
          track,
          { x: i % 2 === 0 ? "-50%" : "0%" },
          {
            x: i % 2 === 0 ? "0%" : "-50%",
            duration: 32 + i * 3,
            ease: "none",
            repeat: -1,
          }
        );
      });

      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: INTRO_DURATION,
        ease: "power1.inOut",
        onUpdate: () => {
          const pct = Math.round(counter.val);
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${pct}%`;
          }
          if (progressPctLabelRef.current) {
            progressPctLabelRef.current.textContent = `${pct}%`;
          }
          if (progressInvertedRef.current) {
            progressInvertedRef.current.textContent = `${pct}%`;
          }
        },
      });

      tl.to(leftRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0)
        .to(
          phoneRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          0.1
        )
        .to(rightRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2)
        .to(
          progressInvertedRef.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          0.3
        );

      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.32em",
          duration: 0.8,
          ease: "power3.out",
        },
        INTRO_DURATION - 0.9
      )
        .to({}, { duration: 0.5 })
        .to(containerRef.current, { opacity: 0, duration: 0.55, ease: "power2.in" }, "exit")
        .to(
          overlayRef.current,
          { scaleY: 1, duration: 0.85, ease: "power4.inOut" },
          "exit+=0.1"
        );
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      video?.removeEventListener("loadeddata", tryPlay);
      ctx.revert();
    };
  }, [onComplete]);

  const marqueeRow = (rowIndex: number) => (
    <div className={`intro-marquee-row intro-marquee-row--${rowIndex}`}>
      <div className="intro-marquee-track">
        {[0, 1, 2, 3].map((n) => (
          <span key={`${rowIndex}-${n}`} className="intro-marquee-text">
            {MARQUEE_TEXT}
            <span className="intro-marquee-dot"> · </span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-[#0a0a0a] pointer-events-none"
        aria-hidden
      />
      <div
        ref={containerRef}
        className="intro-container fixed inset-0 z-50 bg-[#fdf2e3] overflow-hidden"
      >
        {/* Marquee — 4 filas distribuidas en toda la pantalla */}
        <div
          ref={marqueeRowsRef}
          className="intro-marquee-fullscreen"
          aria-hidden
        >
          {marqueeRow(0)}
          {marqueeRow(1)}
          {marqueeRow(2)}
          {marqueeRow(3)}
        </div>

        <div className="intro-content relative z-[2] flex flex-col lg:flex-row h-full pb-24">
          {/* iPhone + TikTok */}
          <div
            ref={leftRef}
            className="intro-left flex items-center justify-center min-w-0 px-4 sm:px-8 lg:px-12 py-6 lg:py-0 lg:flex-1"
          >
            <div ref={phoneRef} className="iphone-shell">
              <div className="iphone-btn iphone-btn--silent" aria-hidden />
              <div className="iphone-btn iphone-btn--vol-up" aria-hidden />
              <div className="iphone-btn iphone-btn--vol-down" aria-hidden />
              <div className="iphone-btn iphone-btn--power" aria-hidden />

              <div className="iphone-frame">
                <div className="iphone-screen">
                  <div className="iphone-island" aria-hidden>
                    <span className="iphone-island-cam" />
                  </div>

                  <div className="iphone-status">
                    <span className="iphone-time">9:41</span>
                    <div className="iphone-status-icons" aria-hidden>
                      <svg viewBox="0 0 18 12" className="iphone-icon-signal">
                        <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
                        <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
                        <rect x="10" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
                        <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 16 12" className="iphone-icon-wifi">
                        <path
                          d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM3.5 7.5a6.5 6.5 0 019 0"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1 4.5a10 10 0 0114 0"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="iphone-battery">
                        <div className="iphone-battery-fill" />
                      </div>
                    </div>
                  </div>

                  <div className="phone-viewfinder tiktok-feed">
                    <video
                      ref={videoRef}
                      className="tiktok-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source src={VIDEO_LOCAL} type="video/mp4" />
                      <source src={VIDEO_CDN} type="video/mp4" />
                    </video>

                    <div className="tiktok-tabs" aria-hidden>
                      <span className="tiktok-tab">Following</span>
                      <span className="tiktok-tab tiktok-tab--active">For You</span>
                    </div>

                    <div className="tiktok-sidebar" aria-hidden>
                      <div className="tiktok-action">
                        <div className="tiktok-avatar" />
                        <span className="tiktok-action-icon">♥</span>
                        <span className="tiktok-action-count">24.5K</span>
                      </div>
                      <div className="tiktok-action">
                        <span className="tiktok-action-icon">💬</span>
                        <span className="tiktok-action-count">892</span>
                      </div>
                      <div className="tiktok-action">
                        <span className="tiktok-action-icon">↗</span>
                        <span className="tiktok-action-count">Share</span>
                      </div>
                    </div>

                    <div className="tiktok-caption">
                      <p className="tiktok-user">@mali.agency</p>
                      <p className="tiktok-desc">Comercial creativo · Behind the scenes</p>
                      <p className="tiktok-music">♫ MALI Studio — Original</p>
                    </div>
                  </div>

                  <div className="iphone-home-bar" aria-hidden />
                </div>
              </div>
            </div>
          </div>

          {/* Logo + porcentaje */}
          <div
            ref={rightRef}
            className="intro-right relative flex min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-0 lg:flex-1"
          >
            <div className="intro-right-inner">
              <div className="intro-right-logo">
                <div className="logo-canvas">
                  <Image
                    src={assetPath("/logo_mali.png")}
                    alt="MALI"
                    fill
                    priority
                    className="object-contain logo-no-bg"
                  />
                </div>
                <p ref={taglineRef} className="intro-tagline opacity-0">
                  Creative & Strategy Agency
                </p>
              </div>

              <div
                ref={progressInvertedRef}
                className="intro-percent-inverted"
                aria-live="polite"
              >
                0%
              </div>
            </div>
          </div>
        </div>

        <div className="intro-progress absolute bottom-0 left-0 right-0 z-[3] px-6 sm:px-10 lg:px-16 pb-8 pt-4">
          <div className="intro-progress-track">
            <div ref={progressFillRef} className="intro-progress-fill" />
          </div>
          <p className="intro-progress-label">
            <span ref={progressPctLabelRef} className="intro-progress-pct">
              0%
            </span>{" "}
            para que tu negocio se transforme
          </p>
        </div>
      </div>
    </>
  );
}
