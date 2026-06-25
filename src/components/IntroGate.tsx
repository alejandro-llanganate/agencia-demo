"use client";

import { createContext, useCallback, useContext, useState } from "react";
import IntroSplash from "./IntroSplash";

type IntroContextValue = {
  replayIntro: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  replayIntro: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const handleComplete = useCallback(() => setPlaying(false), []);

  const replayIntro = useCallback(() => {
    setKey((k) => k + 1);
    setPlaying(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <IntroContext.Provider value={{ replayIntro }}>
      {playing && <IntroSplash key={key} onComplete={handleComplete} />}
      <div className={playing ? "invisible h-0 overflow-hidden" : undefined}>
        {children}
      </div>
    </IntroContext.Provider>
  );
}
