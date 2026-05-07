import Nav from "@/components/layout/Nav";
import { Hero, About, Gallery, Experience, Projects, Skills, Blog, Education, Contact } from "@/components/sections";
import Footer from "@/components/layout/Footer";
import PageBackground from "@/components/common/PageBackground";

const Index = () => {
  return (
    <div className="grain-overlay min-h-screen overflow-x-hidden bg-background">
      <PageBackground />
      <Nav />
      <Hero />
      <About />
      <Gallery />
      <Experience />
      <Skills />
      <Projects />
      <Blog />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
