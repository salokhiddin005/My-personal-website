import { useEffect } from "react";
import Nav from "@/components/layout/Nav";
import { Hero, About, Experience, Projects, Skills, Blog, Education, Contact } from "@/components/sections";
import Footer from "@/components/layout/Footer";
import PageBackground from "@/components/common/PageBackground";

const Slide = ({ children }: { children: React.ReactNode }) => (
  <div
    className="min-w-full h-full shrink-0 overflow-y-auto"
    style={{ scrollSnapAlign: "start" }}
  >
    {children}
  </div>
);

const Index = () => {
  useEffect(() => {
    const container = document.getElementById("page-scroll-container");
    if (!container) return;

    let locked = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (locked) return;
      locked = true;

      const slideWidth = container.clientWidth;
      const current = Math.round(container.scrollLeft / slideWidth);

      if (e.deltaY > 0) {
        container.scrollTo({ left: (current + 1) * slideWidth, behavior: "smooth" });
      } else if (e.deltaY < 0) {
        container.scrollTo({ left: Math.max(0, (current - 1) * slideWidth), behavior: "smooth" });
      }

      setTimeout(() => { locked = false; }, 800);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="grain-overlay h-screen overflow-hidden bg-background">
      <PageBackground />
      <Nav />
      <main
        id="page-scroll-container"
        className="relative z-10 flex h-full overflow-x-auto overflow-y-hidden pt-14 lg:pl-64 lg:pt-0 no-scrollbar"
        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" } as React.CSSProperties}
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
  );
};

export default Index;
