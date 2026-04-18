"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ActiveCountryEarthProps {
  className?: string;
  onCountryChange?: (country: string | null) => void;
}

const COUNTRIES = [
  { name: "United States", code: "USA", lat: 39.8, lng: -98.5 },
  { name: "United Kingdom", code: "GBR", lat: 54.5, lng: -3.4 },
  { name: "India", code: "IND", lat: 21.0, lng: 78.9 },
  { name: "United Arab Emirates", code: "ARE", lat: 24.0, lng: 54.3 },
];

// Lat/lng to sphere point — must match Three.js SphereGeometry vertex layout exactly
// phi = horizontal (rad), theta = colatitude (0 at north). Geometry: x=-r*cos(phi)*sin(theta), y=r*cos(theta), z=r*sin(phi)*sin(theta)
const latLngToVec = (lat: number, lng: number, r: number) => {
  const theta = ((90 - lat) * Math.PI) / 180; // colatitude
  const phi = ((lng + 180) * Math.PI) / 180; // matches equirectangular u=(lng+180)/360
  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.sin(theta),
    r * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta)
  );
};

// Rotation to center longitude — geometry +Z is phi=90° (lng -90°), so rotate by (lng+90)° to bring lng to front
const lngToRotation = (lng: number) => ((lng + 90) * Math.PI) / 180;

export default function ActiveCountryEarth({ className = "", onCountryChange }: ActiveCountryEarthProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = Math.max(container.clientWidth, 1);
    const h = Math.max(container.clientHeight, 1);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.set(0, 0, 2.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 1;
    const loader = new THREE.TextureLoader();

    // Night lights texture - city lights on dark Earth
    const lightsTexture = loader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png"
    );

    const globeMat = new THREE.MeshPhongMaterial({
      map: lightsTexture,
      color: 0x0c0c18,
      emissive: 0x101020,
      emissiveMap: lightsTexture,
      emissiveIntensity: 1.4,
      specular: 0x334466,
      shininess: 6,
    });

    const globe = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), globeMat);
    globeGroup.add(globe);

    const ambient = new THREE.AmbientLight(0x446688, 0.7);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x6699cc, 1);
    key.position.set(2, 1, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x5577aa, 0.6);
    fill.position.set(-1.5, 0.5, 2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x336699, 0.4);
    rim.position.set(0, -1, -1.5);
    scene.add(rim);
    const point = new THREE.PointLight(0x99bbee, 0.8, 5);
    point.position.set(1, 0, 2);
    scene.add(point);

    // Borders canvas
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2d unavailable");

    const borderTex = new THREE.CanvasTexture(canvas);
    const borderMat = new THREE.MeshBasicMaterial({
      map: borderTex,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const borderMesh = new THREE.Mesh(new THREE.SphereGeometry(radius + 0.02, 64, 64), borderMat);
    globeGroup.add(borderMesh);

    let features: Array<{ geometry: { type: string; coordinates: unknown }; properties?: { ISO_A3?: string; ADM0_A3?: string } }> = [];

    const drawBorders = (activeCode: string | null) => {
      if (!features.length) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const drawRing = (ring: [number, number][]) => {
        ring.forEach((c, i) => {
          const x = ((c[0] + 180) / 360) * canvas.width;
          const y = ((90 - c[1]) / 180) * canvas.height;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
      };
      features.forEach((f) => {
        const code = f.properties?.ISO_A3 ?? f.properties?.ADM0_A3;
        const active = code === activeCode;
        const target = COUNTRIES.some((c) => c.code === code);
        if (active) {
          ctx.strokeStyle = "#00e5ff";
          ctx.lineWidth = 4;
          ctx.shadowBlur = 16;
          ctx.shadowColor = "#00e5ff";
        } else if (target) {
          ctx.strokeStyle = "#334455";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = "#1a1a22";
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        const coords = f.geometry.coordinates as [number, number][][] | [number, number][][][];
        const type = f.geometry.type;
        if (type === "Polygon") (coords as [number, number][][]).forEach(drawRing);
        else if (type === "MultiPolygon")
          (coords as [number, number][][][]).forEach((p) => p.forEach(drawRing));
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
      borderTex.needsUpdate = true;
    };

    fetch(
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
    )
      .then((r) => r.json())
      .then((data) => {
        features = data.features;
        drawBorders(COUNTRIES[0]!.code);
      });

    // Cinematic tour
    const targets = COUNTRIES.map((c) => lngToRotation(c.lng));
    const DURATION = 4000;
    const DWELL = 3500;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const state = { index: 0, phase: "dwell" as "dwell" | "move", startTime: 0, startY: 0 };
    globeGroup.rotation.y = targets[0]!;
    globeGroup.rotation.x = 0.2;
    state.startY = targets[0]!;
    onCountryChange?.(COUNTRIES[0]!.name);

    const isDragging = { current: false };
    const lastPos = { x: 0, y: 0 };

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const p = "touches" in e ? e.touches[0]! : e;
      lastPos.x = p.clientX;
      lastPos.y = p.clientY;
      container.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const p = "touches" in e ? e.touches[0]! : e;
      const dx = p.clientX - lastPos.x;
      const dy = p.clientY - lastPos.y;
      lastPos.x = p.clientX;
      lastPos.y = p.clientY;
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x - dy * 0.005));
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      container.style.cursor = "grab";
      const y = globeGroup.rotation.y;
      let best = 0;
      let bestD = Infinity;
      targets.forEach((t, i) => {
        let d = Math.abs(t - y);
        if (d > Math.PI) d = 2 * Math.PI - d;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      state.index = best;
      state.phase = "dwell";
      state.startTime = performance.now();
      activeCodeRef.current = COUNTRIES[best]!.code;
      drawBorders(activeCodeRef.current);
      onCountryChange?.(COUNTRIES[best]!.name);
    };

    container.addEventListener("mousedown", onDown);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseup", onUp);
    container.addEventListener("mouseleave", onUp);
    container.addEventListener("touchstart", onDown, { passive: true });
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("touchend", onUp);
    container.style.cursor = "grab";

    const activeCodeRef: { current: string | null } = { current: COUNTRIES[0]!.code };
    const tempVec = new THREE.Vector3();
    const tempProj = new THREE.Vector3();

    const detectActiveCountry = () => {
      globeGroup.updateMatrixWorld(true);
      let best: string | null = null;
      let bestScore = -Infinity;
      for (const c of COUNTRIES) {
        tempVec.copy(latLngToVec(c.lat, c.lng, radius)).applyMatrix4(globeGroup.matrixWorld);
        const toCam = camera.position.clone().sub(tempVec);
        if (tempVec.dot(toCam) <= 0) continue;
        tempProj.copy(tempVec).project(camera);
        if (tempProj.z < 0 || tempProj.z > 1) continue;
        const dist = Math.sqrt(tempProj.x * tempProj.x + tempProj.y * tempProj.y);
        const score = (1 - dist) * (1 - dist);
        if (dist < 0.8 && score > bestScore) {
          bestScore = score;
          best = c.code;
        }
      }
      return best;
    };

    const animate = (now: number = 0) => {
      rafRef.current = requestAnimationFrame(animate);

      if (!state.startTime) state.startTime = now;

      if (!isDragging.current) {
        if (state.phase === "move") {
          const elapsed = now - state.startTime;
          const p = Math.min(elapsed / DURATION, 1);
          const e = ease(p);
          let delta = targets[state.index]! - state.startY;
          if (delta > Math.PI) delta -= 2 * Math.PI;
          if (delta < -Math.PI) delta += 2 * Math.PI;
          globeGroup.rotation.y = state.startY + delta * e;
          if (p >= 1) {
            state.phase = "dwell";
            state.startTime = now;
          }
        } else if (state.phase === "dwell") {
          const elapsed = now - state.startTime;
          if (elapsed >= DWELL) {
            state.index = (state.index + 1) % COUNTRIES.length;
            state.phase = "move";
            state.startTime = now;
            state.startY = globeGroup.rotation.y;
          }
        }
      }

      const detected = detectActiveCountry();
      if (detected !== activeCodeRef.current) {
        activeCodeRef.current = detected;
        drawBorders(detected);
        const name = detected ? (COUNTRIES.find((c) => c.code === detected)?.name ?? null) : null;
        onCountryChange?.(name);
      }

      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const W = Math.max(container.clientWidth, 1);
      const H = Math.max(container.clientHeight, 1);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseup", onUp);
      container.removeEventListener("mouseleave", onUp);
      container.removeEventListener("touchstart", onDown);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchend", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [onCountryChange]);

  return <div ref={containerRef} className={`relative w-full h-full ${className}`} />;
}
