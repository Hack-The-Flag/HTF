import { useEffect, useRef } from 'react';

const LETTERS = 'Hack The Flag'.split('');

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DecodeTitle() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const indices = shuffle(LETTERS.map((_, i) => i));

    indices.forEach((idx, order) => {
      const el = lettersRef.current[idx];
      if (!el || el.textContent === ' ') return;

      const delay = Math.round(Math.random() * 1200) + 100;

      setTimeout(() => {
        el.classList.add('state-1');
        setTimeout(() => {
          el.classList.add('state-2');
          setTimeout(() => {
            el.classList.add('state-3');
          }, 100);
        }, 100);
      }, delay);
    });
  }, []);

  return (
    <h1
      className="font-htf uppercase tracking-tight leading-none select-none"
      style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
    >
      {LETTERS.map((char, i) => {
        if (char === ' ') {
          // Real space in the HTML text ("Hack The Flag"), zero width so the look is unchanged.
          return <span key={i} style={{ fontSize: 0 }}>{' '}</span>;
        }
        return (
          <span
            key={i}
            ref={el => { lettersRef.current[i] = el; }}
            className="decode-letter"
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
