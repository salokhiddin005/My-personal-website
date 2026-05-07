import { useState } from "react";
import { Maximize2 } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import { galleryEntries, type GalleryEntry } from "./gallery.data";
import { getGalleryThumbnail } from "@/hooks/usePersonalMedia";
import GalleryLightbox from "./GalleryLightbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const staggerDelays = [0, 0.1, 0.15, 0.2];

const spanClasses: Record<GalleryEntry["span"], string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

const Gallery = () => {
  const [selected, setSelected] = useState<GalleryEntry | null>(null);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline="Life in Moments" title="Beyond Code" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryEntries.map((entry, i) => {
            const thumbnail = entry.thumbnail ?? getGalleryThumbnail(entry.folder);

            return (
              <ScrollReveal
                key={entry.id}
                delay={staggerDelays[i] ?? 0}
                className={`${spanClasses[entry.span]} ${
                  entry.span === "tall" ? "min-h-[160px] sm:min-h-[320px] md:min-h-[480px]" : "min-h-[160px] sm:min-h-[200px] md:min-h-[240px]"
                }`}
              >
                <button
                  onClick={() => setSelected(entry)}
                  className="group relative h-full w-full cursor-pointer overflow-hidden border border-border bg-card"
                >
                  <img
                    src={thumbnail}
                    alt={entry.alt}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Glassmorphism Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                    <div className="translate-y-4 rounded-full border border-primary/20 bg-background/80 p-4 transition-transform duration-500 group-hover:translate-y-0">
                      <Maximize2 className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Floating Category Tag */}
                  <div className="absolute left-3 top-3 z-10 md:left-4 md:top-4">
                    <span className="inline-block border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur-md">
                      {entry.category}
                    </span>
                  </div>

                  {/* Bottom Gradient Caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12">
                    <p className="font-display text-sm font-bold italic text-white md:text-base">
                      {entry.caption}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Lightbox */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-h-[90vh] overflow-hidden border-border bg-card p-0 sm:max-w-4xl rounded-none">
            {selected && (
              <div className="flex flex-col">
                <GalleryLightbox entry={selected} />
                <div className="flex items-center gap-3 border-t border-border px-6 py-4">
                  <span className="inline-block border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                    {selected.category}
                  </span>
                  <DialogTitle className="font-display text-lg font-bold italic text-foreground">
                    {selected.caption}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {selected.alt}
                  </DialogDescription>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
