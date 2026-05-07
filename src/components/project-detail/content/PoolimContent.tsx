import type { ProjectContentProps } from "../contentRegistry";
import ProjectHero from "../blocks/ProjectHero";
import ProblemSolution from "../blocks/ProblemSolution";
import MetricsGrid from "../blocks/MetricsGrid";
import ArchitectureDiagram from "../blocks/ArchitectureDiagram";
import KeyHighlights from "../blocks/KeyHighlights";
import TechStackSection from "../blocks/TechStackSection";
import ImageGallery from "../blocks/ImageGallery";
import ProjectLinks from "../blocks/ProjectLinks";
import { getProjectImages } from "@/hooks/useProjectImages";

const PoolimContent = ({ project }: ProjectContentProps) => {
  const images = getProjectImages(project).filter(
    (img) => img !== project.image && !img.includes("architecture")
  );

  return (
    <>
      <ProjectHero
        title={project.title}
        oneLiner={project.oneLiner}
        categories={project.category}
        image={project.image}
        role={project.role}
        team={project.team}
        scale={project.scale}
      />

      <ProblemSolution
        problem={project.problem}
        solution={project.solution}
      />

      {project.metrics && (
        <MetricsGrid metrics={project.metrics} />
      )}

      {project.architectureImage && (
        <ArchitectureDiagram imageSrc={project.architectureImage} />
      )}

      {project.highlights && (
        <KeyHighlights highlights={project.highlights} />
      )}

      <TechStackSection tech={project.tech} />

      <ImageGallery images={images} />

      <ProjectLinks links={project.links} />
    </>
  );
};

export default PoolimContent;
