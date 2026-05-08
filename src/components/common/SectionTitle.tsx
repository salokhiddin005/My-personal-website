interface SectionTitleProps {
  overline: string;
  title: string;
  id?: string;
}

const SectionTitle = ({ overline, title, id }: SectionTitleProps) => {
  return (
    <div id={id} className="mb-12 scroll-mt-20 md:mb-16">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
        <span className="mr-2 opacity-50">//</span>
        {overline}
      </p>
      <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <div className="mt-3 h-px w-12 bg-primary/50" />
    </div>
  );
};

export default SectionTitle;
