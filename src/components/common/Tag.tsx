interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "gold";
}

const Tag = ({ children, variant = "default" }: TagProps) => (
  <span
    className={`inline-block rounded-full px-3 py-1 font-mono text-xs transition-colors ${
      variant === "gold"
        ? "border border-primary/25 bg-primary/10 text-primary"
        : "border border-border bg-card text-muted-foreground"
    }`}
  >
    {children}
  </span>
);

export default Tag;
