"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type WordConfig = {
  text: string;
  accent?: boolean;
};

type Props = {
  words: WordConfig[];
  active?: boolean;
  className?: string;
};

export default function StaggerPaintText({ words, active = false, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = rootRef.current?.querySelectorAll<HTMLElement>(".paint-letter");
    if (!letters?.length) return;

    if (!active) {
      gsap.set(letters, { "--paint": 0 });
      return;
    }

    gsap.set(letters, { "--paint": 0 });
    gsap.to(letters, {
      "--paint": 1,
      duration: 0.07,
      stagger: 0.055,
      ease: "none",
    });
  }, [active]);

  return (
    <div ref={rootRef} className={`paint-text-root ${className}`}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className={`paint-word ${word.accent ? "paint-word--accent" : ""}`}
        >
          {word.text.split("").map((char, ci) => (
            <span key={ci} className="paint-letter">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
