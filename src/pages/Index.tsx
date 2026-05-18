import { useState, useEffect } from "react";
import Nav from "@/components/layout/Nav";
import { Hero, About, Experience, Projects, Skills, Blog, Education, Contact } from "@/components/sections";
import Footer from "@/components/layout/Footer";
import PageBackground from "@/components/common/PageBackground";
import CustomCursor from "@/components/common/CustomCursor";
import LoadingScreen from "@/components/common/LoadingScreen";
import ProgressBar from "@/components/common/ProgressBar";
import SlideDots from "@/components/common/SlideDots";
import SlideAnnouncement from "@/components/common/SlideAnnouncement";
import RippleEffect from "@/components/common/RippleEffect";
import AmbientGlow from "@/components/common/AmbientGlow";
import ParticleCanvas from "@/components/common/ParticleCanvas";
import SectionTint from "@/components/common/SectionTint";

const TOTAL_SLIDES = 8;

const useKeyboardNav = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      const container = document.getElementById("page-scroll-container");
      if (!container) return;
      const current = Math.round(container.scrollTop / container.clientHeight);
      if (e.key === "ArrowDown" && current < TOTAL_SLIDES - 1)
        container.scrollTo({ top: (current + 1) * container.clientHeight, behavior: "smooth" });
      if (e.key === "ArrowUp" && current > 0)
        container.scrollTo({ top: (current - 1) * container.clientHeight, behavior: "smooth" });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled]);
};

const useWheelNav = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    let isScrolling = false;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      const container = document.getElementById("page-scroll-container");
      if (!container) return;
      const current = Math.round(container.scrollTop / container.clientHeight);
      const direction = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(TOTAL_SLIDES - 1, current + direction));
      if (next === current) return;
      isScrolling = true;
      container.scrollTo({ top: next * container.clientHeight, behavior: "smooth" });
      setTimeout(() => { isScrolling = false; }, 800);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [enabled]);
};

const Slide = ({ children }: { children: React.ReactNode }) => (
  <div
    className="min-h-full w-full shrink-0 overflow-x-hidden"
    style={{ scrollSnapAlign: "start" }}
  >
    {children}
  </div>
);

const Index = () => {
  const [loading, setLoading] = useState(true);
  useKeyboardNav(!loading);
  useWheelNav(!loading);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      {!loading && (
        <div className="grain-overlay h-screen overflow-hidden bg-background">
          <CustomCursor />
          <AmbientGlow />
          <ProgressBar />
          <SlideDots />
          <SlideAnnouncement />
          <RippleEffect />
          <ParticleCanvas />
          <SectionTint />
          <PageBackground />
          <Nav />
          <main
            id="page-scroll-container"
            className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-hidden pt-14 lg:ml-64 lg:pt-0 no-scrollbar"
            style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" } as React.CSSProperties}
          >
            <Slide><Hero /></Slide>
            <Slide><About /></Slide>
            <Slide><Experience /></Slide>
            <Slide><Skills /></Slide>
            <Slide><Projects /></Slide>
            <Slide><Blog /></Slide>
            <Slide><Education /></Slide>
            <Slide><Contact /><Footer /></Slide>
          </main>
        </div>
      )}
    </>
  );
};

export default Index;
