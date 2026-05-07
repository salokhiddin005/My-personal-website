import { getGalleryMedia, isVideo } from "@/hooks/usePersonalMedia";
import type { GalleryEntry } from "./gallery.data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";

interface Props {
  entry: GalleryEntry;
}

const MediaItem = ({ src, alt, loading }: { src: string; alt: string; loading?: "eager" | "lazy" }) => {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        controls
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className="h-full w-full object-contain"
    />
  );
};

const GalleryLightbox = ({ entry }: Props) => {
  const media = getGalleryMedia(entry.folder);

  if (media.length === 0) return null;

  // Single item — static, no carousel controls
  if (media.length === 1) {
    return (
      <div className="relative flex h-[45vh] sm:h-[55vh] md:h-[65vh] w-full items-center justify-center bg-black">
        <MediaItem src={media[0]} alt={entry.alt} loading="eager" />
      </div>
    );
  }

  // Multiple items — carousel
  return (
    <div className="relative w-full shrink-0">
      <Carousel opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {media.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <div className="relative flex h-[45vh] sm:h-[55vh] md:h-[65vh] w-full items-center justify-center bg-black">
                <MediaItem
                  src={src}
                  alt={`${entry.alt} ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 border-0 text-white hover:bg-black/60 hover:text-white" />
        <CarouselNext className="right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 border-0 text-white hover:bg-black/60 hover:text-white" />
        <CarouselDots className="absolute bottom-3 left-0 right-0 z-10 pt-0" />
      </Carousel>
    </div>
  );
};

export default GalleryLightbox;
