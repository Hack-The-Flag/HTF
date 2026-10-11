import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?<>/\\';

const UNITS = ['Days', 'Hrs', 'Min', 'Sec'];
const DIGITS_PER_UNIT = 2;
const TICK_MS = 60;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ObfuscatedCountdown() {
  const cellsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const scramble = () => {
      cellsRef.current.forEach(el => {
        if (el) el.textContent = randomChar();
      });
    };

    scramble();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const t = setInterval(scramble, TICK_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="countdown" role="timer" aria-label="Countdown: date to be announced">
      <span className="countdown-label">Next breach in</span>
      <div className="countdown-row" aria-hidden="true">
        {UNITS.map((unit, u) => (
          <div key={unit} className="countdown-group">
            {u > 0 && <span className="countdown-sep">:</span>}
            <div className="countdown-unit">
              <span className="countdown-digits">
                {Array.from({ length: DIGITS_PER_UNIT }, (_, d) => (
                  <span
                    key={d}
                    ref={el => { cellsRef.current[u * DIGITS_PER_UNIT + d] = el; }}
                    className="countdown-cell"
                  />
                ))}
              </span>
              <span className="countdown-unit-label">{unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
