import { lazy, type ComponentType } from "react";
import type { Project } from "@/components/sections/projects/projects.data";

export type ProjectContentProps = { project: Project };

const registry: Record<string, () => Promise<{ default: ComponentType<ProjectContentProps> }>> = {
  poolim: () => import("./content/PoolimContent"),
  "safety-ai": () => import("./content/SafeSiteContent"),
  "ai-video": () => import("./content/WizPlusContent"),
  leafsense: () => import("./content/LeafSenseContent"),
  "smart-office": () => import("./content/SmartOfficeContent"),
  "fall-detection": () => import("./content/FallDetectionContent"),
  malina: () => import("./content/MalinaContent"),
  xpd: () => import("./content/XpdContent"),
};

export function getProjectContent(id: string) {
  const loader = registry[id];
  if (!loader) return null;
  return lazy(loader);
}
