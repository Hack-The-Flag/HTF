import { useEffect, useRef } from 'react';

// Dithered noise shader rendered on a canvas — sits behind the hero as an
// animated grain/texture overlay, layered over the circle.svg geometry.
export default function DitherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const SCALE = 4; // pixel block size — larger = more visible dither grain
    let width = 0;
    let height = 0;

    function resize() {
      width  = Math.ceil(canvas!.offsetWidth  / SCALE);
      height = Math.ceil(canvas!.offsetHeight / SCALE);
      canvas!.width  = width;
      canvas!.height = height;
    }

    // Bayer 4×4 dither matrix (normalised 0–1)
    const BAYER = [
       0/16,  8/16,  2/16, 10/16,
      12/16,  4/16, 14/16,  6/16,
       3/16, 11/16,  1/16,  9/16,
      15/16,  7/16, 13/16,  5/16,
    ];

    function draw(t: number) {
      const img = ctx.createImageData(width, height);
      const d   = img.data;
      const T   = t * 0.0003;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Gradient: dark at edges, slightly lighter toward center
          const nx = (x / width)  * 2 - 1;
          const ny = (y / height) * 2 - 1;
          const dist = Math.sqrt(nx * nx + ny * ny);
          const base = Math.max(0, 0.18 - dist * 0.18);

          // Slow animated noise
          const noise = (Math.sin(x * 0.7 + T) * Math.cos(y * 0.5 - T * 0.7) + 1) * 0.5;

          const value = base + noise * 0.06;
          const threshold = BAYER[(y % 4) * 4 + (x % 4)];
          const on = value > threshold * 0.12;

          const i = (y * width + x) * 4;
          // Very dark reddish grain
          d[i]     = on ? 18 : 0;
          d[i + 1] = on ? 4  : 0;
          d[i + 2] = on ? 4  : 0;
          d[i + 3] = on ? 60 : 0;
        }
      }
      ctx.putImageData(img, 0, 0);
      frameRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);
    resize();
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.9,
      }}
    />
  );
}
