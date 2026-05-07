import type { ProjectContentProps } from "../contentRegistry";
import ProjectHero from "../blocks/ProjectHero";
import ProblemSolution from "../blocks/ProblemSolution";
import MetricsGrid from "../blocks/MetricsGrid";
import ArchitectureDiagram from "../blocks/ArchitectureDiagram";
import KeyHighlights from "../blocks/KeyHighlights";
import EvaluationMetrics from "../blocks/EvaluationMetrics";
import TechStackSection from "../blocks/TechStackSection";
import ImageGallery from "../blocks/ImageGallery";
import ProjectLinks from "../blocks/ProjectLinks";
import { getProjectImages } from "@/hooks/useProjectImages";

const evaluationCharts = [
  {
    src: "/projects/potato-desease/metrics/confusion-matrix.png",
    title: "Confusion Matrix (Normalized)",
    description: "3-class classification on 256 test images. Some expected confusion between Early Blight and Late Blight — visually similar disease patterns on potato leaves.",
  },
  {
    src: "/projects/potato-desease/metrics/per-class-metrics.png",
    title: "Per-Class Precision, Recall & F1-Score",
    description: "Balanced performance across all classes. Healthy leaves (F1: 0.96) easiest to classify, blight types (F1: 0.93-0.94) show slight cross-confusion due to visual similarity.",
  },
];

const LeafSenseContent = ({ project }: ProjectContentProps) => {
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

      <EvaluationMetrics charts={evaluationCharts} />

      <TechStackSection tech={project.tech} />

      <ImageGallery images={images} />

      <ProjectLinks links={project.links} />
    </>
  );
};

export default LeafSenseContent;
