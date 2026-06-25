"use client";

import { useEffect, useRef, useState } from "react";
import StaggerPaintText from "./StaggerPaintText";

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="statement" className="statement-section">
      <div className="grid-markers grid-markers--4 grid-markers--3rows" aria-hidden />
      <StaggerPaintText
        active={active}
        className="grid-statement-paint"
        words={[
          { text: "CREAMOS" },
          { text: "HISTORIAS" },
          { text: "QUE VENDEN", accent: true },
        ]}
      />
    </section>
  );
}
