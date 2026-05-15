import { useEffect, useRef, useState } from "react";

const SCRIPT = "> initializing...\n> loading modules...\n> ready.";
const CHAR_DELAY = 22;
const HOLD_DELAY = 380;
const FADE_MS = 450;

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  const [fading, setFading] = useState(false);
  const idx = useRef(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      if (idx.current < SCRIPT.length) {
        setDisplayed(SCRIPT.slice(0, idx.current + 1));
        idx.current++;
        timer = setTimeout(type, CHAR_DELAY);
      } else {
        timer = setTimeout(() => {
          setFading(true);
          timer = setTimeout(() => onDoneRef.current(), FADE_MS);
        }, HOLD_DELAY);
      }
    };

    timer = setTimeout(type, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-background transition-opacity ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <pre className="font-mono text-sm leading-relaxed text-primary">
        {displayed}
        <span className="animate-blink">█</span>
      </pre>
    </div>
  );
};

export default LoadingScreen;
