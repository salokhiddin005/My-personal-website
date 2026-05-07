import type { ProjectContentProps } from "../contentRegistry";
import ProjectHero from "../blocks/ProjectHero";
import ProblemSolution from "../blocks/ProblemSolution";
import MetricsGrid from "../blocks/MetricsGrid";
import ArchitectureDiagram from "../blocks/ArchitectureDiagram";
import KeyHighlights from "../blocks/KeyHighlights";
import EvaluationMetrics from "../blocks/EvaluationMetrics";
import DemoVideos from "../blocks/DemoVideos";
import TechStackSection from "../blocks/TechStackSection";
import ProjectLinks from "../blocks/ProjectLinks";

const demos = [
  {
    src: "/projects/safety-ai/demos/demo-1-ppe.mp4",
    title: "PPE Compliance Detection",
    description: "YOLO11 detects helmets, vests, and other safety equipment in real-time. Workers without required PPE are flagged instantly with bounding box annotations.",
    tags: ["YOLO11", "Real-time", "Helmet & Vest"],
  },
  {
    src: "/projects/safety-ai/demos/demo-2-ppe.mp4",
    title: "Multi-Worker PPE Analysis",
    description: "Simultaneous monitoring of multiple workers across the frame. Each worker is individually assessed for PPE compliance with color-coded annotations.",
    tags: ["Multi-target", "Color-coded", "Compliance %"],
  },
  {
    src: "/projects/safety-ai/demos/demo-3-worker-count.mp4",
    title: "Worker Tracking & Counting",
    description: "ByteTrack-powered persistent tracking assigns unique IDs to each worker. Maintains identity across frames even through occlusions and re-entries.",
    tags: ["ByteTrack", "Persistent ID", "Head count"],
  },
  {
    src: "/projects/safety-ai/demos/demo-4-bird-eye-view.mp4",
    title: "Bird's Eye View & Proximity",
    description: "Homography-based top-down projection enables real-world distance estimation. Detects dangerous proximity between workers and vehicles.",
    tags: ["Homography", "Distance", "Vehicle proximity"],
  },
  {
    src: "/projects/safety-ai/demos/demo-4-vehicle-proximity.mp4",
    title: "Vehicle Proximity Alerts",
    description: "Detects vehicles on-site and measures real-world distance to nearby workers. Triggers instant alerts when personnel enter dangerous proximity zones around heavy machinery.",
    tags: ["Vehicle detection", "Distance alert", "Safety zones"],
  },
];

const evaluationCharts = [
  {
    src: "/projects/safety-ai/metrics/confusion-matrix.png",
    title: "Confusion Matrix (Normalized)",
    description: "Strong per-class accuracy on core PPE detection: Helmet (0.84), Vest (0.83), Person (0.89), Goggles (0.79), Boots (0.77). Negative classes (detecting absence of equipment) are inherently harder than positive detection — a known challenge in PPE compliance systems.",
  },
  {
    src: "/projects/safety-ai/metrics/precision-recall.png",
    title: "Precision-Recall Curve",
    description: "Per-class AP highlights: Vest 0.857, Helmet 0.841, Boots 0.840, Person 0.880. Positive PPE detection consistently achieves 0.80+ AP — negative class performance is lower due to the inherent difficulty of detecting equipment absence rather than presence.",
  },
];

const SafeSiteContent = ({ project }: ProjectContentProps) => {
  // Only keep Source Code link — demo videos are now embedded
  const sourceLinks = project.links.filter((l) => l.label === "Source Code");

  return (
    <>
      <ProjectHero
        title={project.title}
        oneLiner={project.oneLiner}
        categories={project.category}
        image={project.image}
        role={project.role}
        scale={project.scale}
      />

      <ProblemSolution
        problem={project.problem}
        solution={project.solution}
      />

      {project.metrics && (
        <MetricsGrid metrics={project.metrics} />
      )}

      <DemoVideos
        demos={demos}
        heroVideoSrc="/projects/safety-ai/demos/demo-main.mp4"
      />

      {project.architectureImage && (
        <ArchitectureDiagram imageSrc={project.architectureImage} />
      )}

      {project.highlights && (
        <KeyHighlights highlights={project.highlights} />
      )}

      <EvaluationMetrics charts={evaluationCharts} />

      <TechStackSection tech={project.tech} />

      <ProjectLinks links={sourceLinks} />
    </>
  );
};

export default SafeSiteContent;
