import Nav from "@/components/layout/Nav";
import { Hero, About, Experience, Projects, Skills, Blog, Education, Contact } from "@/components/sections";
import Footer from "@/components/layout/Footer";
import PageBackground from "@/components/common/PageBackground";

const Index = () => {
  return (
    <div className="grain-overlay min-h-screen bg-background">
      <PageBackground />
      <Nav />
      {/* pt-14 offsets the mobile top bar; lg:pl-64 offsets the desktop sidebar */}
      <main className="relative z-10 pt-14 lg:pl-64 lg:pt-0">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Blog />
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
