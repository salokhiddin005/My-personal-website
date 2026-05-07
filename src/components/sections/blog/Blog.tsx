import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Tag from "@/components/common/Tag";
import { blogPosts } from "./blog.data";

const Blog = () => (
  <section className="px-6 py-16 md:py-24">
    <div className="mx-auto max-w-6xl">
      <SectionTitle overline="Blog" title="Writing & Insights" id="blog" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <ScrollReveal key={post.title} delay={i * 0.1}>
            <div className="group relative rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
              <Tag variant="gold">{post.category}</Tag>
              <h3 className="mt-3 font-display text-base sm:text-lg font-bold leading-snug text-foreground">
                {post.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {post.date} · {post.readTime}
              </p>
              <p className="mt-3 font-body text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              {post.comingSoon && (
                <span className="mt-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
                  Coming Soon
                </span>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
