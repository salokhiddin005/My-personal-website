import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Tag from "@/components/common/Tag";
import { blogPosts } from "./blog.data";

interface BlogPostText {
  title: string;
  category: string;
  readTime: number;
  excerpt: string;
}

const Blog = () => {
  const { t } = useTranslation("blog");
  const postsText = t("posts", { returnObjects: true }) as Record<string, BlogPostText>;

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline={t("overline")} title={t("title")} id="blog" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => {
            const text = postsText[post.id];
            return (
              <ScrollReveal key={post.id} delay={i * 0.1}>
                <div className="group relative rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                  <Tag variant="gold">{text.category}</Tag>
                  <h3 className="mt-3 font-display text-base sm:text-lg font-bold leading-snug text-foreground">
                    {text.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {t("comingSoon")} · {text.readTime} {t("readTimeSuffix")}
                  </p>
                  <p className="mt-3 font-body text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {text.excerpt}
                  </p>
                  {post.comingSoon && (
                    <span className="mt-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
                      {t("comingSoon")}
                    </span>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
