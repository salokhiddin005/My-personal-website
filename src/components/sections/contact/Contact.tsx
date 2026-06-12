import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import MagneticButton from "@/components/common/MagneticButton";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation("contact");

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionTitle overline={t("overline")} title={t("title")} id="contact" />

        <ScrollReveal>
          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <MagneticButton>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=saloxiddingopirjonov@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg bg-primary px-8 py-4 sm:py-3 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-light"
              >
                <Mail className="h-4 w-4" />
                {t("sendEmail")}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://linkedin.com/in/saloxiddin-g-opirjonov-b42274358"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg border border-primary/40 px-8 py-4 sm:py-3 font-body text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
              >
                <Linkedin className="h-4 w-4" />
                {t("linkedin")}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://github.com/salokhiddin005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg border border-primary/40 px-8 py-4 sm:py-3 font-body text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
              >
                <Github className="h-4 w-4" />
                {t("github")}
              </a>
            </MagneticButton>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t("resume")}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
            <MagneticButton>
              <a
                href="/resume.eng.pdf"
                download
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg border border-primary/40 px-8 py-4 sm:py-3 font-body text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
              >
                <Download className="h-4 w-4" />
                {t("downloadResumeEn")}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/resume.eng.pdf"
                download
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg border border-primary/40 px-8 py-4 sm:py-3 font-body text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
              >
                <Download className="h-4 w-4" />
                {t("downloadResumeRu")}
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
