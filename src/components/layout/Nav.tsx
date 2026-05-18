import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { label: "About",      href: "#about",      num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Skills",     href: "#skills",     num: "03" },
  { label: "Projects",   href: "#projects",   num: "04" },
  { label: "Blog",       href: "#blog",       num: "05" },
  { label: "Education",  href: "#education",  num: "06" },
  { label: "Contact",    href: "#contact",    num: "07" },
];

// slide 0 = Hero, slides 1-7 match nav link nums
const scrollToSlide = (slideIndex: number, onDone?: () => void) => {
  onDone?.();
  const container = document.getElementById("page-scroll-container");
  if (!container) return;
  const slides = Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));
  const slide = slides[slideIndex];
  if (slide) container.scrollTo({ top: slide.offsetTop, behavior: "smooth" });
};

const SidebarNav = ({
  active,
  basePath,
  onLinkClick,
}: {
  active: string;
  basePath: string;
  onLinkClick?: () => void;
}) => (
  <nav className="flex-1 py-5 overflow-y-auto">
    <p className="px-5 mb-2 font-mono text-[9px] uppercase tracking-[0.45em] text-muted-foreground/40">
      Navigation
    </p>
    <ul className="space-y-0.5">
      {navLinks.map((link) => {
        const isActive = active === link.href.slice(1);
        return (
          <li key={link.href}>
            <a
              href={basePath !== "" ? basePath + link.href : undefined}
              onClick={(e) => {
                if (basePath !== "") return;
                e.preventDefault();
                scrollToSlide(parseInt(link.num), onLinkClick);
              }}
              className={`flex cursor-pointer items-center gap-3 border-l-2 px-5 py-2.5 font-mono text-[11px] transition-all duration-150 ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-transparent text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
              }`}
            >
              <span className={`text-[10px] tabular-nums ${isActive ? "text-primary" : "text-muted-foreground/35"}`}>
                {link.num}
              </span>
              <span className="uppercase tracking-widest">{link.label}</span>
              {isActive && <span className="ml-auto h-1 w-1 rounded-full bg-primary" />}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

const LocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(
      new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Tashkent", hour: "2-digit", minute: "2-digit", hour12: false })
    );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="px-5 py-3 border-b border-border">
      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground/50">My Time</p>
      <p className="mt-0.5 font-mono text-sm font-bold text-primary">
        {time} <span className="text-[10px] font-normal text-muted-foreground">UZT</span>
      </p>
    </div>
  );
};

const CurrentlyBuilding = () => (
  <div className="border-t border-border px-5 py-4">
    <div className="flex items-center gap-2 mb-3">
      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
      <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground">
        Currently Building
      </span>
    </div>
    <ul className="space-y-2">
      {["Scam Call Detector", "AI Roof Visualizer", "Smart Package Room"].map((p) => (
        <li key={p} className="flex items-start gap-2">
          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/40 flex-shrink-0" />
          <span className="font-mono text-[10px] text-muted-foreground/70 leading-snug">{p}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SidebarBottom = () => (
  <div className="border-t border-border px-5 py-4">
    <div className="flex items-center gap-3">
      <a href="https://github.com/salokhiddin005" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
        className="text-muted-foreground transition-colors hover:text-primary">
        <Github className="h-4 w-4" />
      </a>
      <a href="https://linkedin.com/in/saloxiddin-g-opirjonov-b42274358" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
        className="text-muted-foreground transition-colors hover:text-primary">
        <Linkedin className="h-4 w-4" />
      </a>
      <a href="mailto:saloxiddingopirjonov@gmail.com" aria-label="Email"
        className="text-muted-foreground transition-colors hover:text-primary">
        <Mail className="h-4 w-4" />
      </a>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  </div>
);

const Nav = ({ basePath = "" }: { basePath?: string }) => {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (basePath !== "") return;
    const container = document.getElementById("page-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const slides = Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((el, i) => {
        const dist = Math.abs(el.offsetTop - container.scrollTop);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      const link = navLinks.find((l) => parseInt(l.num) === closest);
      setActive(link ? link.href.slice(1) : "");
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [basePath]);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-border bg-card/95 backdrop-blur-xl lg:flex">
        <div className="border-b border-border px-5 py-5">
          <a href="/" className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-bold tracking-widest text-foreground">
              SG<span className="animate-blink text-primary">_</span>
            </span>
          </a>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            AI / ML Engineer
          </p>
        </div>
        <LocalTime />
        <SidebarNav active={active} basePath={basePath} />
        <CurrentlyBuilding />
        <SidebarBottom />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-xl lg:hidden">
        <a href="/" className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm font-bold tracking-widest">
            SG<span className="animate-blink text-primary">_</span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
            className="text-muted-foreground transition-colors hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-mono text-sm font-bold tracking-widest">
                SG<span className="animate-blink text-primary">_</span>
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu"
                className="text-muted-foreground transition-colors hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarNav active={active} basePath={basePath} onLinkClick={() => setMobileOpen(false)} />
            <SidebarBottom />
          </aside>
        </div>
      )}
    </>
  );
};

export default Nav;
