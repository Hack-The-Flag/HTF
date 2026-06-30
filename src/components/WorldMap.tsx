import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Simplified equirectangular projection
function latLngToXY(
  lat: number, lng: number,
  width: number, height: number
): [number, number] {
  const x = (lng + 180) / 360 * width;
  const y = (90 - lat) / 180 * height;
  return [x, y];
}

// Arc between two points as a quadratic bezier
function arcPath(
  x1: number, y1: number,
  x2: number, y2: number,
  width: number
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  // Wrap-around arcs: go the other way if crossing the date line
  const shortDx = Math.abs(dx) > width / 2
    ? (dx > 0 ? dx - width : dx + width)
    : dx;
  const mx = x1 + shortDx / 2;
  const my = y1 + dy / 2 - Math.sqrt(shortDx * shortDx + dy * dy) * 0.35;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

interface Dot {
  start: { lat: number; lng: number; label?: string };
  end:   { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
  dots?: Dot[];
}

const DEFAULT_DOTS: Dot[] = [
  // All arcs point toward Esbjerg, Denmark (~55.5°N, 8.4°E)
  { start: { lat: 40.7128,  lng: -74.006,  label: 'New York'  }, end: { lat: 55.5, lng: 8.4, label: 'Esbjerg' } },
  { start: { lat: 51.5074,  lng: -0.1278,  label: 'London'    }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 48.8566,  lng: 2.3522,   label: 'Paris'     }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 52.5200,  lng: 13.4050,  label: 'Berlin'    }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 59.9139,  lng: 10.7522,  label: 'Oslo'      }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 37.7749,  lng: -122.419, label: 'San Francisco' }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 35.6762,  lng: 139.6503, label: 'Tokyo'     }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 1.3521,   lng: 103.8198, label: 'Singapore' }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: -33.8688, lng: 151.2093, label: 'Sydney'    }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 55.7558,  lng: 37.6176,  label: 'Moscow'    }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: -23.5505, lng: -46.6333, label: 'São Paulo' }, end: { lat: 55.5, lng: 8.4 } },
  { start: { lat: 28.6139,  lng: 77.2090,  label: 'Delhi'     }, end: { lat: 55.5, lng: 8.4 } },
];

// Very minimal SVG world map as a dotted grid (proper world outline is huge;
// this gives the "dotted world" feel without shipping a 200kb SVG)
function DotGrid({ width, height }: { width: number; height: number }) {
  const dots = [];
  const spacing = 6;
  // Simplified land-mass lookup using a rough bounding approach
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const lat = 90 - (y / height) * 180;
      const lng = (x / width) * 360 - 180;
      if (isLand(lat, lng)) {
        dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={0.8} fill="#444" />);
      }
    }
  }
  return <>{dots}</>;
}

// Very rough land-mass check — good enough for a decorative map
function isLand(lat: number, lng: number): boolean {
  // North America
  if (lat > 15 && lat < 72 && lng > -168 && lng < -52) return true;
  // South America
  if (lat > -56 && lat < 13 && lng > -82 && lng < -34) return true;
  // Europe
  if (lat > 36 && lat < 71 && lng > -10 && lng < 40) return true;
  // Africa
  if (lat > -35 && lat < 37 && lng > -18 && lng < 52) return true;
  // Asia (rough)
  if (lat > 5  && lat < 77 && lng > 26  && lng < 145) return true;
  // South/SE Asia peninsula
  if (lat > -10 && lat < 28 && lng > 68  && lng < 106) return true;
  // Australia
  if (lat > -39 && lat < -10 && lng > 113 && lng < 154) return true;
  // Greenland
  if (lat > 60 && lat < 84 && lng > -55 && lng < -18) return true;
  // Japan
  if (lat > 30 && lat < 45 && lng > 129 && lng < 146) return true;
  // UK
  if (lat > 50 && lat < 59 && lng > -6 && lng < 2) return true;
  // Scandinavia
  if (lat > 57 && lat < 71 && lng > 4 && lng < 30) return true;
  return false;
}

function AnimatedArc({
  d, delay, color,
}: { d: string; delay: number; color: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 0.8, 0.8, 0] }}
      transition={{
        pathLength:  { duration: 1.8, delay, ease: 'easeInOut' },
        opacity:     { duration: 1.8, delay, times: [0, 0.1, 0.85, 1] },
        repeat:      Infinity,
        repeatDelay: DEFAULT_DOTS.length * 0.4,
      }}
    />
  );
}

export default function WorldMap({ dots = DEFAULT_DOTS }: WorldMapProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const W = 800;
  const H = 400;

  return (
    <div className="w-full max-w-4xl mx-auto select-none" aria-hidden="true">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        {/* Dot-grid land masses */}
        <DotGrid width={W} height={H} />

        {inView && dots.map((dot, i) => {
          const [x1, y1] = latLngToXY(dot.start.lat, dot.start.lng, W, H);
          const [x2, y2] = latLngToXY(dot.end.lat,   dot.end.lng,   W, H);
          const d = arcPath(x1, y1, x2, y2, W);
          return (
            <g key={i}>
              <AnimatedArc d={d} delay={i * 0.4} color="#dc3545" />
              {/* Origin dot */}
              <motion.circle
                cx={x1} cy={y1} r={2}
                fill="#dc3545"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ delay: i * 0.4, duration: 0.3 }}
              />
              {/* Destination pulse */}
              <motion.circle
                cx={x2} cy={y2} r={3}
                fill="none"
                stroke="#dc3545"
                strokeWidth={1}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{
                  delay: i * 0.4 + 1.6,
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: DEFAULT_DOTS.length * 0.4,
                }}
              />
            </g>
          );
        })}

        {/* Esbjerg marker */}
        {(() => {
          const [x, y] = latLngToXY(55.5, 8.4, W, H);
          return (
            <g>
              <motion.circle
                cx={x} cy={y} r={4}
                fill="#dc3545"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <circle cx={x} cy={y} r={8} fill="none" stroke="#dc3545" strokeWidth={0.5} opacity={0.4} />
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
