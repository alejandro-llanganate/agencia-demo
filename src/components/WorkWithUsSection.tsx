"use client";

import { FormEvent, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "5255512345678";

const INTERESTS = [
  "Branding",
  "Contenido / Reels",
  "Influencers",
  "Estrategia digital",
  "Producción",
  "Otro",
];

export default function WorkWithUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [empresa, setEmpresa] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [interes, setInteres] = useState(INTERESTS[0]);

  useEffect(() => {
    const el = sectionRef.current;
    const phone = phoneRef.current;
    if (!el || !phone) return;

    const ctx = gsap.context(() => {
      gsap.from(phone, {
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
        y: 90,
        opacity: 0,
        scale: 0.92,
        duration: 1.1,
        ease: "power3.out",
      });
    }, sectionRef);

    const onMove = (e: MouseEvent) => {
      const rect = phone.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(phone, { rotateY: x * 10, rotateX: -y * 8, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(phone, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
    };

    phone.addEventListener("mousemove", onMove);
    phone.addEventListener("mouseleave", onLeave);

    return () => {
      phone.removeEventListener("mousemove", onMove);
      phone.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hola MALI, quiero trabajar con ustedes.",
      "",
      `Empresa: ${empresa}`,
      `Contacto: ${contacto}`,
      `Teléfono: ${telefono}`,
      `Interés: ${interes}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section ref={sectionRef} id="contacto" className="work-section">
      <div className="work-inner work-inner--centered">
        <div className="work-copy work-copy--centered">
          <p className="work-eyebrow">Trabajemos juntos</p>
          <h2 className="work-title">Cuéntanos tu proyecto</h2>
          <p className="work-desc">
            Completa el formulario en el dispositivo y te contactamos por WhatsApp.
          </p>
        </div>

        <div ref={phoneRef} className="work-phone-stage">
          <div className="work-phone-shell work-phone-shell--xl">
            <div className="work-phone-btn work-phone-btn--silent" aria-hidden />
            <div className="work-phone-btn work-phone-btn--vol-up" aria-hidden />
            <div className="work-phone-btn work-phone-btn--vol-down" aria-hidden />
            <div className="work-phone-btn work-phone-btn--power" aria-hidden />
            <div className="work-phone-island" aria-hidden />
            <form className="work-phone-form" onSubmit={onSubmit}>
              <div className="work-form-header">
                <p className="work-form-brand">MALI</p>
                <span className="work-form-sub">Agencia creativa</span>
              </div>
              <label className="work-field">
                <span>Empresa</span>
                <input
                  type="text"
                  required
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Nombre de la empresa"
                />
              </label>
              <label className="work-field">
                <span>Contacto</span>
                <input
                  type="text"
                  required
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                  placeholder="Tu nombre"
                />
              </label>
              <label className="work-field">
                <span>Teléfono</span>
                <input
                  type="tel"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+52 ..."
                />
              </label>
              <label className="work-field">
                <span>Me interesa</span>
                <select value={interes} onChange={(e) => setInteres(e.target.value)}>
                  {INTERESTS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="work-submit">
                Enviar por WhatsApp
              </button>
            </form>
            <div className="work-phone-home" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
