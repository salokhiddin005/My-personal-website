import { useTranslation } from "react-i18next";
import { ArrowUp, GithubIcon, LinkedinIcon, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="relative z-10 border-t border-border bg-card/50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5">
        <div className="flex items-center gap-6">
          <a
            href="mailto:saloxiddingopirjonov@gmail.com"
            aria-label={t("social.email")}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/saloxiddin-g-opirjonov-b42274358"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.linkedin")}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/salokhiddin005"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.github")}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>

        <p className="font-mono text-[11px] text-muted-foreground">
          <span className="text-primary/50">// </span>
          {t("footer.credit")} · © {new Date().getFullYear()}
        </p>

        <button
          onClick={() => {
            const container = document.getElementById("page-scroll-container");
            container?.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
          aria-label={t("footer.backToTopAria")}
        >
          <ArrowUp className="h-3.5 w-3.5" />
          {t("footer.backToTop")}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
