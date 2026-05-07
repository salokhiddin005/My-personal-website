import { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import ScrollReveal from "@/components/common/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useCarousel } from "@/components/ui/carousel";

/* Inline prev/next that work on all screen sizes */
const InlineNav = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  return (
    <div className="mt-4 flex items-center justify-center gap-3 sm:mt-6">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="flex h-11 w-11 items-center justify-center border border-border bg-card/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="flex h-11 w-11 items-center justify-center border border-border bg-card/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

const ImageGallery = ({ images, title = "Product Preview" }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (images.length === 0) return null;

  return (
    <>
      <section className="px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              {title}
            </h3>
            <div className="gold-divider mb-8 sm:mb-12" />
          </ScrollReveal>

          <ScrollReveal>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplayPlugin.current]}
            >
              <CarouselContent>
                {images.map((src, i) => (
                  <CarouselItem key={src}>
                    <button
                      onClick={() => setSelectedImage(src)}
                      className="group relative w-full cursor-zoom-in overflow-hidden border border-border bg-card/50 transition-all hover:border-primary/30"
                    >
                      <img
                        src={src}
                        alt={`${title} ${i + 1}`}
                        className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full border border-primary/20 bg-background/80 p-4 backdrop-blur-sm">
                          <Maximize2 className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <InlineNav />
              <CarouselDots className="mt-4" />
            </Carousel>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-auto border-border bg-card p-3 sm:p-4">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={title}
              className="w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
