import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="relative z-10 border-t border-border bg-card/50 px-4 py-8 sm:px-6">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-5">
      <div className="flex items-center gap-6">
        <a
          href="mailto:saloxiddingopirjonov@gmail.com"
          aria-label="Email"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Mail className="h-4 w-4" />
        </a>
        <a
          href="https://linkedin.com/in/saloxiddin-g-opirjonov-b42274358"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="https://github.com/salokhiddin005"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>

      <p className="font-mono text-[11px] text-muted-foreground">
        <span className="text-primary/50">// </span>
        Designed & Built by Saloxiddin G'opirjonov · © {new Date().getFullYear()}
      </p>

      <button
        onClick={() => {
          const container = document.getElementById("page-scroll-container");
          container?.scrollTo({ left: 0, behavior: "smooth" });
        }}
        className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
        aria-label="Back to top"
      >
        <ArrowUp className="h-3.5 w-3.5" />
        back_to_top()
      </button>
    </div>
  </footer>
);

export default Footer;
