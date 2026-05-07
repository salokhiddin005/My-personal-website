import type { ProjectContentProps } from "../contentRegistry";
import ProjectHero from "../blocks/ProjectHero";
import ProblemSolution from "../blocks/ProblemSolution";
import MetricsGrid from "../blocks/MetricsGrid";
import ArchitectureDiagram from "../blocks/ArchitectureDiagram";
import DemoVideos from "../blocks/DemoVideos";
import ImageGallery from "../blocks/ImageGallery";
import EvaluationMetrics from "../blocks/EvaluationMetrics";
import KeyHighlights from "../blocks/KeyHighlights";
import TechStackSection from "../blocks/TechStackSection";
import ProjectLinks from "../blocks/ProjectLinks";

const evaluationCharts = [
  {
    src: "/projects/fall-detection/evaluation/confusion_matrix.png",
    title: "Confusion Matrix — 3-Class Fall Detection",
    description:
      "Strong diagonal dominance across Normal, Falling, and Fallen states. Fallen class achieves 98.1% F1 — critical for detecting persons who remain on the ground.",
  },
  {
    src: "/projects/fall-detection/evaluation/per_class_metrics.png",
    title: "Per-Class Performance Breakdown",
    description:
      "Detailed precision, recall, and F1 per class. The Falling state is the most challenging — it occurs briefly and varies across individuals — yet still achieves 93.4% F1.",
  },
];

const demos = [
  {
    src: "/projects/fall-detection/demos/elderly_falling_result.mp4",
    title: "Hospital Corridor Fall Detection",
    description:
      "Elderly person fall detected in a hospital corridor. The system identifies the fall event, transitions through Falling → Fallen states, and maintains a persistent alert with duration timer until the person stands back up.",
    tags: ["YOLO11-Pose", "LSTM", "Fallen State"],
  },
  {
    src: "/projects/fall-detection/demos/outdoor_falling_result.mp4",
    title: "Outdoor Multi-Person Tracking",
    description:
      "Fall detected on a crowded sidewalk with multiple bystanders. BoT-SORT maintains persistent IDs for each person, correctly identifying only the fallen individual among 6 tracked people.",
    tags: ["BoT-SORT", "Multi-Person", "Crowded Scene"],
  },
  {
    src: "/projects/fall-detection/demos/skating_result.mp4",
    title: "4K Skating Fall Detection",
    description:
      "High-resolution 4K video test with a skating fall. The system processes at 12 FPS on 4K and correctly detects the fall with 98% confidence, demonstrating resolution-adaptive rendering.",
    tags: ["4K Video", "High Confidence", "Scale-Aware"],
  },
];

const demoImages = [
  "/projects/fall-detection/demos/demo_elderly_fallen.png",
  "/projects/fall-detection/demos/demo_outdoor_fallen.png",
  "/projects/fall-detection/demos/demo_skating_fallen.png",
  "/projects/fall-detection/demos/demo_dancing_normal.png",
  "/projects/fall-detection/demos/features_normal.png",
  "/projects/fall-detection/demos/features_fallen.png",
];

const FallDetectionContent = ({ project }: ProjectContentProps) => (
  <>
    <ProjectHero
      title={project.title}
      oneLiner={project.oneLiner}
      categories={project.category}
      image={project.image}
      role={project.role}
      scale={project.scale}
    />

    <ProblemSolution problem={project.problem} solution={project.solution} />

    {project.metrics && <MetricsGrid metrics={project.metrics} />}

    <DemoVideos
      demos={demos}
      domain="fall-detection.ai"
      heading={false}
    />

    {project.architectureImage && (
      <ArchitectureDiagram imageSrc={project.architectureImage} />
    )}

    {project.highlights && <KeyHighlights highlights={project.highlights} />}

    <ImageGallery images={demoImages} title="Detection Examples" />

    <EvaluationMetrics charts={evaluationCharts} />

    <TechStackSection tech={project.tech} />

    <ProjectLinks links={project.links} />
  </>
);

export default FallDetectionContent;
