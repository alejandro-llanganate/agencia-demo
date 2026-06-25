"use client";

import Navbar from "./Navbar";
import ScrollExperience from "./ScrollExperience";
import StatementSection from "./StatementSection";
import GridShowcase, { CREATORS } from "./GridShowcase";
import ReelsSection from "./ReelsSection";
import MetricsSection from "./MetricsSection";
import ServicesSection from "./ServicesSection";
import WorkWithUsSection from "./WorkWithUsSection";
import ExperiencesFinale from "./ExperiencesFinale";
import SiteFooter from "./SiteFooter";

export default function HomePage() {
  return (
    <div className="site-root bg-[#fdf2e3] text-[#0a0a0a]">
      <Navbar />
      <ScrollExperience />
      <StatementSection />
      <GridShowcase
        id="creadores"
        type="creators"
        items={CREATORS}
        titleLine1="Creadores de ideas"
        titleLine2="Verdaderos influencers"
      />
      <GridShowcase
        id="marcas"
        type="brands"
        titleLine1="Marcas que han"
        titleLine2="confiado en nosotros"
      />
      <ReelsSection />
      <MetricsSection />
      <ServicesSection />
      <WorkWithUsSection />
      <ExperiencesFinale />
      <SiteFooter />
    </div>
  );
}
