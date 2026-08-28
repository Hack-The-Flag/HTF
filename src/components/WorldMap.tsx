import { WorldMap } from './ui/world-map';

const HTF_DOTS = [
  { start: { lat: 40.7128,  lng: -74.006  }, end: { lat: 55.5, lng: 8.4 } }, // New York → Esbjerg
  { start: { lat: 51.5074,  lng: -0.1278  }, end: { lat: 55.5, lng: 8.4 } }, // London
  { start: { lat: 48.8566,  lng: 2.3522   }, end: { lat: 55.5, lng: 8.4 } }, // Paris
  { start: { lat: 52.5200,  lng: 13.4050  }, end: { lat: 55.5, lng: 8.4 } }, // Berlin
  { start: { lat: 59.9139,  lng: 10.7522  }, end: { lat: 55.5, lng: 8.4 } }, // Oslo
  { start: { lat: 37.7749,  lng: -122.419 }, end: { lat: 55.5, lng: 8.4 } }, // San Francisco
  { start: { lat: 35.6762,  lng: 139.6503 }, end: { lat: 55.5, lng: 8.4 } }, // Tokyo
  { start: { lat: 1.3521,   lng: 103.8198 }, end: { lat: 55.5, lng: 8.4 } }, // Singapore
  { start: { lat: -33.8688, lng: 151.2093 }, end: { lat: 55.5, lng: 8.4 } }, // Sydney
  { start: { lat: -23.5505, lng: -46.6333 }, end: { lat: 55.5, lng: 8.4 } }, // São Paulo
  { start: { lat: 28.6139,  lng: 77.2090  }, end: { lat: 55.5, lng: 8.4 } }, // Delhi
  { start: { lat: 55.7558,  lng: 37.6176  }, end: { lat: 55.5, lng: 8.4 } }, // Moscow
];

export default function WorldMapWrapper() {
  return <WorldMap dots={HTF_DOTS} lineColor="#dc3545" />;
}
