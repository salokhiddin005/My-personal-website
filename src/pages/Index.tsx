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

const Index = () => (
    <div className="grain-overlay h-screen overflow-hidden bg-background">
      <PageBackground />
      <Nav />
      <main
        id="page-scroll-container"
        className="relative z-10 flex h-full overflow-x-auto overflow-y-hidden pt-14 lg:ml-64 lg:pt-0 no-scrollbar"
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

export default Index;
