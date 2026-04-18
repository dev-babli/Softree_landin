"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { COMPANY_LOCATIONS } from "@/data/company-locations";

const Globe = dynamic(() => import("react-globe.gl").then((mod) => mod.default), {
  ssr: false,
});

const EARTH_LIGHTS_URL =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png";
const ARC_JUMP_INTERVAL_MS = 2500;

interface CompanyLocationsGlobeProps {
  className?: string;
}

export default function CompanyLocationsGlobe({ className = "" }: CompanyLocationsGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [activeArcIndex, setActiveArcIndex] = useState(0);

  const arcsData = useMemo(() => {
    const arcs: Array<{
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
      color: string;
    }> = [];
    for (let i = 0; i < COMPANY_LOCATIONS.length; i++) {
      const from = COMPANY_LOCATIONS[i]!;
      const to = COMPANY_LOCATIONS[(i + 1) % COMPANY_LOCATIONS.length]!;
      arcs.push({
        startLat: from.lat,
        startLng: from.lng,
        endLat: to.lat,
        endLng: to.lng,
        color: "#00e5ff",
      });
    }
    return arcs;
  }, []);

  const singleArcData = useMemo(
    () => [arcsData[activeArcIndex] ?? arcsData[0]!],
    [arcsData, activeArcIndex]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setActiveArcIndex((i) => (i + 1) % arcsData.length);
    }, ARC_JUMP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [arcsData.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      if (el) {
        setDimensions({
          width: Math.max(el.clientWidth, 1),
          height: Math.max(el.clientHeight, 1),
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-w-[200px] min-h-[200px] ${className}`}
    >
      <Globe
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="transparent"
        animateIn={false}
        waitForGlobeReady={false}
        globeImageUrl={EARTH_LIGHTS_URL}
        showAtmosphere
        atmosphereColor="#6699cc"
        atmosphereAltitude={0.15}
        pointsData={COMPANY_LOCATIONS}
        pointLat="lat"
        pointLng="lng"
        pointLabel={(d) => {
          const obj = d as { name: string; address: string };
          return `<div style="padding:8px 12px;background:rgba(0,0,0,0.85);color:#fff;border-radius:8px;font-size:13px;max-width:240px;border:1px solid rgba(0,229,255,0.3);">
            <strong>${obj.name}</strong><br/>
            <span style="color:#00e5ff">${obj.address}</span>
          </div>`;
        }}
        pointColor={() => "#00e5ff"}
        pointAltitude={0.06}
        pointRadius={0.35}
        pointResolution={12}
        arcsData={singleArcData}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcStroke={0.8}
        arcDashLength={0.5}
        arcDashGap={0.3}
        arcDashAnimateTime={1200}
        arcAltitude={0.25}
      />
    </div>
  );
}
