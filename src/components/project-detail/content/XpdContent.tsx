import type { ProjectContentProps } from "../contentRegistry";
import ProjectHero from "../blocks/ProjectHero";
import ProblemSolution from "../blocks/ProblemSolution";
import MetricsGrid from "../blocks/MetricsGrid";
import EvaluationMetrics from "../blocks/EvaluationMetrics";
import ImageGallery from "../blocks/ImageGallery";
import KeyHighlights from "../blocks/KeyHighlights";
import TechStackSection from "../blocks/TechStackSection";
import ProjectLinks from "../blocks/ProjectLinks";
import { getProjectImages } from "@/hooks/useProjectImages";

const evaluationCharts = [
  {
    src: "/projects/xpd/metrics/confusion_matrices.png",
    title: "Confusion Matrices — 3 Architectures",
    description: "Side-by-side comparison on 624 test images. DenseNet121 (94.2%) achieves the best balance of precision and recall with only 14 false negatives.",
  },
  {
    src: "/projects/xpd/metrics/roc_curves.png",
    title: "ROC Curves — Architecture Comparison",
    description: "DenseNet121 achieves AUC 0.9812, outperforming ResNet50 (0.9785) and ResNet34 (0.9710). All three far exceed the random baseline.",
  },
  {
    src: "/projects/xpd/metrics/metrics_bar_chart.png",
    title: "Metrics Comparison Across Architectures",
    description: "DenseNet121 leads in all metrics — accuracy, precision, recall, F1, and AUC-ROC — while using 3x fewer parameters than ResNet50.",
  },
  {
    src: "/projects/xpd/metrics/training_curves.png",
    title: "Training Curves — 2-Stage Fine-Tuning",
    description: "Loss and accuracy progression across all 3 architectures. Dotted line marks backbone unfreeze point — discriminative learning rates prevent catastrophic forgetting while adapting to X-ray domain.",
  },
];

const XpdContent = ({ project }: ProjectContentProps) => {
  const images = getProjectImages(project).filter(
    (img) => img !== project.image && !img.includes("metrics")
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

    <EvaluationMetrics charts={evaluationCharts} />

    {images.length > 0 && <ImageGallery images={images} />}

    {project.highlights && (
      <KeyHighlights highlights={project.highlights} />
    )}

    <TechStackSection tech={project.tech} />

    <ProjectLinks links={project.links} />
  </>
  );
};

export default XpdContent;
