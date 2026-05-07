import { Suspense, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageBackground from "@/components/common/PageBackground";
import ProjectNavigation from "@/components/project-detail/blocks/ProjectNavigation";
import { projects } from "@/components/sections/projects/projects.data";
import { getProjectContent } from "@/components/project-detail/contentRegistry";

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  // Set document title
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Bakhtiyorjon Dadajonov`;
    }
    return () => {
      document.title = "Bakhtiyorjon Dadajonov — AI/ML Engineer";
    };
  }, [project]);

  if (!project) return <Navigate to="/404" replace />;

  const ContentComponent = getProjectContent(project.id);

  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <PageBackground />
      <Nav basePath="/" />

      <main className="relative z-10">
        {ContentComponent ? (
          <Suspense
            fallback={
              <div className="flex min-h-[60vh] items-center justify-center">
                <div className="font-mono text-sm text-muted-foreground">Loading...</div>
              </div>
            }
          >
            <ContentComponent project={project} />
          </Suspense>
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center pt-24">
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Coming Soon
              </h1>
              <p className="mt-2 font-body text-muted-foreground">
                This project page is being built.
              </p>
            </div>
          </div>
        )}

        <ProjectNavigation prev={prev} next={next} />
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
