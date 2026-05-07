import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="relative z-10 bg-background border-t border-border px-4 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
      <div className="flex items-center gap-8 sm:gap-6">
        <a href="mailto:saloxiddingopirjonov@gmail.com" aria-label="Email" className="p-2 text-muted-foreground transition-colors hover:text-primary">
          <Mail className="h-5 w-5" />
        </a>
        <a href="https://linkedin.com/in/saloxiddin-g-opirjonov-b42274358" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 text-muted-foreground transition-colors hover:text-primary">
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="https://github.com/salokhiddin005" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 text-muted-foreground transition-colors hover:text-primary">
          <Github className="h-5 w-5" />
        </a>
      </div>

      <p className="font-body text-sm text-muted-foreground">
        Designed & Built by Saloxiddin G'opirjonov · © {new Date().getFullYear()}
      </p>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
        Back to Top
      </button>
    </div>
  </footer>
);

export default Footer;
