import manifest from "virtual:project-images";
import type { Project } from "@/components/sections/projects/projects.data";

export function getProjectImages(project: Project | null): string[] {
  if (!project?.image) return [];

  // Extract directory name from image path: /projects/poolim/file.png → poolim
  const match = project.image.match(/^\/projects\/([^/]+)\//);
  if (!match) return [project.image];

  const dirName = match[1];
  const allImages = manifest[dirName];
  if (!allImages || allImages.length === 0) return [project.image];

  // Hero image is always first, then remaining auto-discovered images (excluding hero)
  const rest = allImages.filter((img) => img !== project.image);
  return [project.image, ...rest];
}
