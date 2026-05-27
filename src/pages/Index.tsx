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

const getSlides = () =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));

const getCurrentIndex = (container: HTMLElement) => {
  const slides = getSlides();
  let closest = 0;
  let minDist = Infinity;
  slides.forEach((el, i) => {
    const dist = Math.abs(el.offsetTop - container.scrollTop);
    if (dist < minDist) { minDist = dist; closest = i; }
  });
  return closest;
};

const scrollToSlide = (container: HTMLElement, index: number) => {
  const slide = getSlides()[index];
  if (slide) container.scrollTo({ top: slide.offsetTop, behavior: "smooth" });
};

const TOTAL_SLIDES = 8;

const useKeyboardNav = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      const container = document.getElementById("page-scroll-container");
      if (!container) return;
      const current = getCurrentIndex(container);
      const next = e.key === "ArrowDown"
        ? Math.min(TOTAL_SLIDES - 1, current + 1)
        : Math.max(0, current - 1);
      if (next !== current) scrollToSlide(container, next);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled]);
};


const Slide = ({ children }: { children: React.ReactNode }) => (
  <div data-slide className="w-full">
    {children}
  </div>
);

const Index = () => {
  const [loading, setLoading] = useState(true);
  useKeyboardNav(!loading);

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
