import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Counter from "@/components/common/Counter";

const About = () => (
  <section className="px-6 py-16 md:py-24">
    <div className="mx-auto max-w-6xl">
      <SectionTitle overline="About Me" title="Passionate About AI & Modern Tech" id="about" />

      <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-5">
        {/* Prose */}
        <div className="space-y-5 md:col-span-3">
          <ScrollReveal>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              I am a graduate from Tashkent University of Information Technologies
              with a strong interest in artificial intelligence, blockchain, web development, and
              modern technologies.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              I have hands-on experience using AI tools to build real projects — from conversational
              chatbots and RAG-based knowledge systems to text classification pipelines and
              AI-powered web applications. I focus on turning ideas into working products efficiently
              and intelligently.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              I'm a fast learner, responsible, and deeply motivated to grow in the technology field.
              I believe in solving real problems with practical AI — building systems that are not
              just smart, but useful and reliable.
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
                { label: "Education", value: "TUIT (2025)" },
                { label: "Focus", value: "AI/ML Engineering" },
                { label: "Languages", value: "Uzbek (Native), English (Advanced), Russian" },
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
            { end: 3,  suffix: "",  label: "Languages Spoken" },
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
