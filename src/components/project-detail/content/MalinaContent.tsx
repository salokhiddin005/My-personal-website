import type { ProjectContentProps } from "../contentRegistry";
import ProjectHero from "../blocks/ProjectHero";
import ProblemSolution from "../blocks/ProblemSolution";
import MetricsGrid from "../blocks/MetricsGrid";
import KeyHighlights from "../blocks/KeyHighlights";
import DemoVideos from "../blocks/DemoVideos";
import TechStackSection from "../blocks/TechStackSection";
import ProjectLinks from "../blocks/ProjectLinks";

const MalinaContent = ({ project }: ProjectContentProps) => {
  // Keep only Live App link — demo video is now embedded
  const appLinks = project.links.filter((l) => l.label !== "Watch Demo");

  return (
    <>
      <ProjectHero
        title={project.title}
        oneLiner={project.oneLiner}
        categories={project.category}
        image={project.image}
      />

      <ProblemSolution
        problem={project.problem}
        solution={project.solution}
      />

      {project.metrics && (
        <MetricsGrid metrics={project.metrics} />
      )}

      <DemoVideos
        demos={[]}
        heroVideoSrc="/projects/malinaai/malina_AI_Demo.mp4"
      />

      {project.highlights && (
        <KeyHighlights highlights={project.highlights} />
      )}

      <TechStackSection tech={project.tech} />

      <ProjectLinks links={appLinks} />
    </>
  );
};

export default MalinaContent;
