import { useState } from "react";
import ScrollReveal from "@/components/common/ScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";

interface ArchitectureDiagramProps {
  imageSrc: string;
  caption?: string;
}

const ArchitectureDiagram = ({ imageSrc, caption = "System Architecture" }: ArchitectureDiagramProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              {caption}
            </h3>
            <div className="gold-divider mb-8 sm:mb-12" />
          </ScrollReveal>

          <ScrollReveal>
            <button
              onClick={() => setOpen(true)}
              className="group relative w-full cursor-zoom-in overflow-hidden border border-border bg-card/50 p-1.5 transition-all hover:border-primary/30 sm:p-4"
            >
              <img
                src={imageSrc}
                alt={caption}
                className="w-full rounded-sm object-contain"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-full border border-primary/20 bg-background/80 p-4 backdrop-blur-sm">
                  <Maximize2 className="h-5 w-5 text-primary" />
                </div>
              </div>
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-auto border-border bg-card p-3 sm:p-4">
          <DialogTitle className="sr-only">{caption}</DialogTitle>
          <img
            src={imageSrc}
            alt={caption}
            className="w-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArchitectureDiagram;
