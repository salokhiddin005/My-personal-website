import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Counter from "@/components/common/Counter";

const About = () => (
  <section className="px-6 py-16 md:py-24">
    <div className="mx-auto max-w-6xl">
      <SectionTitle overline="About Me" title="Passionate About AI & Modern Tech" id="about" />

      <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-6">
        {/* Profile photo */}
        <ScrollReveal className="flex justify-center md:col-span-1 md:justify-start md:pt-2">
          <div className="relative">
            <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-primary/40 ring-4 ring-primary/10">
              <img
                src="/profile.jpeg"
                alt="Saloxiddin G'opirjonov"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute bottom-1 right-1 flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
          </div>
        </ScrollReveal>

        {/* Prose */}
        <div className="space-y-5 md:col-span-3">
          <ScrollReveal>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              I am a 4th-year student at Tashkent University of Information Technologies.
              I combine a strong theoretical foundation with hands-on engineering experience
              across the full AI product lifecycle — from research and prototyping to deployment.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              I build production-grade AI systems end-to-end — spanning LLM integration, RAG
              pipelines, computer vision models, and full-stack web applications. My focus is on
              clean architecture, efficient inference, and real-world deployability rather than
              theoretical complexity alone.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              I'm driven by the challenge of transforming ideas into reliable, scalable products.
              Whether working independently or within a team, I bring precision, adaptability,
              and a commitment to delivering AI solutions that solve genuine problems.
            </p>
          </ScrollReveal>
        </div>

        {/* Quick Facts Card */}
        <ScrollReveal className="md:col-span-2" delay={0.2}>
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 transition-colors hover:border-primary/30">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">Quick Facts</h3>
            <div className="space-y-4">
              {[
                { label: "Location", value: "Uzbekistan" },
                { label: "Education", value: "TUIT — 4th Year (2025)" },
                { label: "Focus", value: "AI/ML Engineering" },
                { label: "Languages", value: "Uzbek (Native), English (Advanced)" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-xs uppercase tracking-wider text-primary">{item.label}</p>
                  <p className="mt-1 font-body text-sm text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Animated stats */}
      <ScrollReveal delay={0.3}>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-border pt-10">
          {[
            { end: 11, suffix: "+", label: "AI Projects Built" },
            { end: 5,  suffix: "+", label: "CV Systems Deployed" },
            { end: 3,  suffix: "",  label: "Industries Served" },
            { end: 2,  suffix: "",  label: "Languages Spoken" },
          ].map(({ end, suffix, label }) => (
            <div key={label} className="text-center">
              <Counter end={end} suffix={suffix} />
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default About;
