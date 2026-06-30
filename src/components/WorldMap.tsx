import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';

const GEO_URL = '/world-110m.json';

interface Dot {
  start: { lat: number; lng: number; label?: string };
  end:   { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
  dots?: Dot[];
}

const DEFAULT_DOTS: Dot[] = [
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

function AnimatedLine({ from, to, delay }: { from: [number, number]; to: [number, number]; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0.8, 0] }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: DEFAULT_DOTS.length * 0.4,
        times: [0, 0.1, 0.85, 1],
      }}
    >
      <Line
        from={from}
        to={to}
        stroke="#dc3545"
        strokeWidth={0.8}
        strokeLinecap="round"
        style={{ strokeDasharray: '4 2' }}
      />
    </motion.g>
  );
}

export default function WorldMap({ dots = DEFAULT_DOTS }: WorldMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto select-none" aria-hidden="true">
      <ComposableMap
        projectionConfig={{ scale: 140, center: [10, 20] }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#2a2a2a"
                stroke="#1a1a1a"
                strokeWidth={0.3}
                style={{
                  default: { outline: 'none' },
                  hover:   { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {inView && dots.map((dot, i) => (
          <AnimatedLine
            key={i}
            from={[dot.start.lng, dot.start.lat]}
            to={[dot.end.lng, dot.end.lat]}
            delay={i * 0.4}
          />
        ))}

        {/* City origin dots */}
        {inView && dots.map((dot, i) => (
          <motion.g
            key={`dot-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: i * 0.4, duration: 0.3 }}
          >
            <Marker coordinates={[dot.start.lng, dot.start.lat]}>
              <circle r={1.5} fill="#dc3545" />
            </Marker>
          </motion.g>
        ))}

        {/* Esbjerg destination marker */}
        <Marker coordinates={[8.4, 55.5]}>
          <motion.circle
            r={3.5}
            fill="#dc3545"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle r={7} fill="none" stroke="#dc3545" strokeWidth={0.5} opacity={0.4} />
        </Marker>
      </ComposableMap>
    </div>
  );
}
