import { Code } from "lucide-react";
import { getProjectImages } from "@/hooks/useProjectImages";
import type { Project } from "./projects.data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";

interface Props {
  project: Project;
}

const ProjectModalCarousel = ({ project }: Props) => {
  const images = getProjectImages(project);

  // No images — placeholder
  if (images.length === 0) {
    return (
      <div className="relative flex h-48 w-full shrink-0 items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
        <Code className="h-16 w-16 text-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    );
  }

  // Single image — static, no carousel controls
  if (images.length === 1) {
    return (
      <div className="relative h-[35vh] sm:h-[40vh] w-full shrink-0 overflow-hidden bg-muted/30">
        <img
          src={images[0]}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    );
  }

  // Multiple images — carousel
  return (
    <div className="relative w-full shrink-0">
      <Carousel opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {images.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <div className="relative h-[35vh] sm:h-[40vh] w-full overflow-hidden bg-muted/30">
                <img
                  src={src}
                  alt={`Screenshot ${i + 1} of ${project.title}`}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-8 sm:w-8 bg-black/40 border-0 text-white hover:bg-black/60 hover:text-white" />
        <CarouselNext className="right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-8 sm:w-8 bg-black/40 border-0 text-white hover:bg-black/60 hover:text-white" />
        <CarouselDots className="absolute bottom-3 left-0 right-0 z-10 pt-0" />
      </Carousel>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
  );
};

export default ProjectModalCarousel;
