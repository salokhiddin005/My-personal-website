import type { ProjectContentProps } from "../contentRegistry";
import ProjectHero from "../blocks/ProjectHero";
import ProblemSolution from "../blocks/ProblemSolution";
import MetricsGrid from "../blocks/MetricsGrid";
import KeyHighlights from "../blocks/KeyHighlights";
import DemoVideos from "../blocks/DemoVideos";
import TechStackSection from "../blocks/TechStackSection";
import ProjectLinks from "../blocks/ProjectLinks";

const SmartOfficeContent = ({ project }: ProjectContentProps) => {
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
        heroVideoSrc="/projects/smart-office/Bakhtiyorjon_Smart_Office_AI_Monitoring_System_Real_Time_Employee_Activity.mp4"
      />

      {project.highlights && (
        <KeyHighlights highlights={project.highlights} />
      )}

      <TechStackSection tech={project.tech} />

      <ProjectLinks links={project.links} />
    </>
  );
};

export default SmartOfficeContent;
