"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { COMPANY_LOCATIONS } from "@/data/company-locations";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-cyan-500/50 text-sm animate-pulse font-mono tracking-widest">
      INITIALIZING SATELLITE LINK...
    </div>
  ),
});

const INDIA_COORDS = { lat: 21.0, lng: 78.9 };
// Using a high-res night texture with better contrast
const EARTH_LIGHTS_URL =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png";
const GEOJSON_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

// Map our location names to GeoJSON country names/codes
const TARGET_COUNTRIES = [
  "India",
  "United States of America",
  "Netherlands",
  "Lithuania",
  "Singapore",
];

interface CinematicConnectionsGlobeProps {
  className?: string;
  onHoverChange?: (hovering: boolean) => void;
}

export default function CinematicConnectionsGlobe({
  className = "",
  onHoverChange,
}: CinematicConnectionsGlobeProps) {
  const globeEl = useRef<any>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [isReady, setIsReady] = useState(false);

  // Animation State
  const [currentLocIndex, setCurrentLocIndex] = useState<number>(-1); // -1 = India start
  const [geoJsonFeatures, setGeoJsonFeatures] = useState<any[]>([]);

  // Load GeoJSON for borders
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        const relevant = data.features.filter((f: any) =>
          TARGET_COUNTRIES.includes(f.properties.NAME) ||
          TARGET_COUNTRIES.includes(f.properties.ADMIN)
        );
        setGeoJsonFeatures(relevant);
      })
      .catch((err) => console.error("Failed to load GeoJSON", err));
  }, []);

  // Handle Resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateSize);
      ro.disconnect();
    };
  }, []);

  // Animation Loop
  useEffect(() => {
    if (!isReady) return;

    // Start the loop
    const interval = setInterval(() => {
      setCurrentLocIndex((prev) => (prev + 1) % COMPANY_LOCATIONS.length);
    }, 5000); // 5 seconds per location

    // Initial trigger
    if (currentLocIndex === -1) {
      setCurrentLocIndex(0);
    }

    return () => clearInterval(interval);
  }, [isReady]);

  // Camera Movement Effect
  useEffect(() => {
    if (!isReady || !globeEl.current || currentLocIndex === -1) return;

    const target = COMPANY_LOCATIONS[currentLocIndex];
    if (!target) return;

    // Calculate midpoint for better arc visibility? 
    // Or just focus on destination as requested: "viewport it will show the usa in center"
    // Let's focus on the destination but zoomed out enough to see the arc coming in.
    
    // Smoothly rotate to the target location
    globeEl.current.pointOfView(
      { lat: target.lat, lng: target.lng, altitude: 1.8 },
      2000 // 2s transition
    );

  }, [currentLocIndex, isReady]);

  const handleGlobeReady = useCallback(() => {
    setIsReady(true);
    if (globeEl.current) {
      // Set initial view on India
      globeEl.current.pointOfView({ lat: INDIA_COORDS.lat, lng: INDIA_COORDS.lng, altitude: 1.8 });
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3; // Gentle rotation
      globeEl.current.controls().enableZoom = false; // Disable zoom to keep cinematic feel? Or maybe allow it.
    }
  }, []);

  // --- Data Preparation ---

  const pointsData = useMemo(() => {
    const india = { 
      name: "India HQ", 
      address: "Strategic Hub", 
      lat: INDIA_COORDS.lat, 
      lng: INDIA_COORDS.lng, 
      color: "#ffaa00",
      radius: 0.8,
      pulse: true
    };

    // Show India + Current Target + Previously Visited (optional, let's show all visited so far to build the map)
    // Actually, "use only one connecting line" implies focus. 
    // But "dots getting connected" usually implies building a network.
    // Let's show India + Current Target.
    
    if (currentLocIndex === -1) return [india];

    const target = COMPANY_LOCATIONS[currentLocIndex];
    if (!target) return [india];

    return [
      india,
      {
        ...target,
        color: "#00e5ff",
        radius: 0.6,
        pulse: true
      }
    ];
  }, [currentLocIndex]);

  const arcsData = useMemo(() => {
    if (currentLocIndex === -1) return [];
    
    const target = COMPANY_LOCATIONS[currentLocIndex];
    if (!target) return [];

    // Single arc from India to current target
    return [{
      startLat: INDIA_COORDS.lat,
      startLng: INDIA_COORDS.lng,
      endLat: target.lat,
      endLng: target.lng,
      color: ["#ffaa00", "#00e5ff"],
      dashLength: 0.8, // Longer dash for "beam" effect
      dashGap: 0.2,
      dashAnimateTime: 1500 // Fast travel
    }];
  }, [currentLocIndex]);

  // Always show borders for context
  const polygonsData = useMemo(() => geoJsonFeatures, [geoJsonFeatures]);

  const currentTargetName = currentLocIndex !== -1 ? COMPANY_LOCATIONS[currentLocIndex]?.name : "India HQ";
  const currentTargetAddress = currentLocIndex !== -1 ? COMPANY_LOCATIONS[currentLocIndex]?.address : "Strategic Hub";

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      
      {/* Status Overlay */}
      <div className="absolute top-6 left-0 w-full flex flex-col items-center pointer-events-none z-20 transition-all duration-500">
        <div className="liquid-glass flex items-center gap-3 rounded-full border border-cyan-500/30 bg-black/60 px-6 py-3 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00e5ff]" />
          <div className="flex flex-col items-start">
            <span className="text-[10px] text-cyan-400/70 tracking-[0.2em] uppercase font-semibold leading-none mb-1">
              CONNECTING TO
            </span>
            <span className="text-white font-bold tracking-wide text-sm leading-none">
              {currentLocIndex === -1 ? "INDIA HQ" : currentTargetName?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Location Detail Overlay (Bottom Left) */}
      <div className={`absolute bottom-12 left-8 z-20 pointer-events-none transition-opacity duration-500 ${currentLocIndex !== -1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-start">
          <div className="h-[1px] w-12 bg-cyan-500/50 mb-2" />
          <span className="text-cyan-400 font-mono text-xs tracking-widest mb-1">COORDINATES LOCKED</span>
          <span className="text-white/80 text-xs max-w-[200px] leading-relaxed">
            {currentTargetAddress}
          </span>
        </div>
      </div>

      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={EARTH_LIGHTS_URL}
        onGlobeReady={handleGlobeReady}
        
        // Atmosphere - Enhanced for aesthetics
        atmosphereColor="#00aaff" // Cyan/Blue glow
        atmosphereAltitude={0.2}
        
        // Points
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.05}
        pointRadius="radius"
        pointResolution={12}
        pointsMerge={true}
        
        // Arcs
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={(d: any) => d.dashLength}
        arcDashGap={(d: any) => d.dashGap}
        arcDashAnimateTime={(d: any) => d.dashAnimateTime}
        arcStroke={0.8} // Thicker line
        arcAltitude={0.3}
        
        // Polygons (Borders)
        polygonsData={polygonsData}
        polygonCapColor={() => "rgba(0, 229, 255, 0.05)"}
        polygonSideColor={() => "rgba(0, 229, 255, 0.1)"}
        polygonStrokeColor={() => "#00e5ff"}
        polygonAltitude={0.01}
        
        // Labels
        labelsData={pointsData}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.2}
        labelDotRadius={0.3}
        labelColor={() => "rgba(255, 255, 255, 0.9)"}
        labelResolution={2}
        labelAltitude={0.06}
        
        // Interaction
        onPointHover={(point: any) => onHoverChange?.(!!point)}
      />
    </div>
  );
}
