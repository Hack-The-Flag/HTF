import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?<>/\\';

interface FlipBoardProps {
  words: string[];
  interval?: number; // ms between word changes
}

function ScrambleChar({ target, delay }: { target: string; delay: number }) {
  const [display, setDisplay] = useState(() =>
    CHARS[Math.floor(Math.random() * CHARS.length)]
  );
  const resolved = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target);
      return;
    }

    resolved.current = false;
    let ticks = 0;
    const maxTicks = 6;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (ticks >= maxTicks) {
          setDisplay(target === ' ' ? ' ' : target);
          resolved.current = true;
          clearInterval(interval);
        } else {
          setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
          ticks++;
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay]);

  return (
    <span
      className="inline-block"
      style={{ minWidth: target === ' ' ? '0.35em' : undefined }}
    >
      {display}
    </span>
  );
}

export default function FlipBoard({ words, interval = 2800 }: FlipBoardProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  const word = words[index].toUpperCase();

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="inline-block"
        aria-live="polite"
        aria-label={words[index]}
      >
        {word.split('').map((char, i) => (
          <ScrambleChar key={`${index}-${i}`} target={char} delay={i * 35} />
        ))}
      </motion.span>
    </AnimatePresence>
  );
}
