"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { COMPANY_LOCATIONS } from "@/data/company-locations";

const INDIA = { lat: 21.0, lng: 78.9 };
const ARC_COLOR = 0x00e5ff;

// Lat/lng to sphere point — matches Three.js SphereGeometry
const latLngToVec = (lat: number, lng: number, r: number) => {
  const theta = ((90 - lat) * Math.PI) / 180;
  const phi = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.sin(theta),
    r * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta)
  );
};

// Create arc curve from start to end on sphere (raised in middle)
function createArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  numPoints: number
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const mid = start.clone().lerp(end, 0.5);
    const alt = 0.3;
    mid.normalize().multiplyScalar(radius * (1 + alt));
    const p = start.clone().lerp(end, t);
    p.lerp(mid, 4 * t * (1 - t));
    p.normalize().multiplyScalar(radius);
    points.push(p);
  }
  return points;
}

interface IndiaConnectionsGlobeProps {
  className?: string;
  onHoverChange?: (hovering: boolean) => void;
}

export default function IndiaConnectionsGlobe({
  className = "",
  onHoverChange,
}: IndiaConnectionsGlobeProps) {
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
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:auto;";
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 1;
    const loader = new THREE.TextureLoader();
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

    // Arcs from India to each company location
    const indiaPos = latLngToVec(INDIA.lat, INDIA.lng, radius);
    const arcMaterial = new THREE.LineBasicMaterial({
      color: ARC_COLOR,
      linewidth: 2,
      transparent: true,
      opacity: 0.8,
    });

    COMPANY_LOCATIONS.forEach((loc) => {
      const endPos = latLngToVec(loc.lat, loc.lng, radius);
      const points = createArcPoints(indiaPos, endPos, radius, 32);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, arcMaterial);
      globeGroup.add(line);
    });

    // Point markers at India and company locations
    const markerGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: ARC_COLOR });
    [INDIA, ...COMPANY_LOCATIONS].forEach(({ lat, lng }) => {
      const pos = latLngToVec(lat, lng, radius + 0.02);
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(pos);
      globeGroup.add(marker);
    });

    const ambient = new THREE.AmbientLight(0x446688, 0.7);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x6699cc, 1);
    key.position.set(2, 1, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x5577aa, 0.6);
    fill.position.set(-1.5, 0.5, 2);
    scene.add(fill);

    // Initial rotation to show India
    const indiaRotation = ((INDIA.lng + 90) * Math.PI) / 180;
    globeGroup.rotation.y = indiaRotation;
    globeGroup.rotation.x = 0.2;

    const isDragging = { current: false };
    const lastPos = { x: 0, y: 0 };
    let autoRotate = true;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      autoRotate = false;
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
      isDragging.current = false;
      container.style.cursor = "grab";
      setTimeout(() => (autoRotate = true), 3000);
    };

    container.addEventListener("mousedown", onDown);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseup", onUp);
    container.addEventListener("mouseleave", onUp);
    container.addEventListener("mouseenter", () => onHoverChange?.(true));
    container.addEventListener("mouseleave", () => onHoverChange?.(false));
    container.addEventListener("touchstart", onDown, { passive: true });
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("touchend", onUp);
    container.style.cursor = "grab";

    const animate = (now: number = 0) => {
      rafRef.current = requestAnimationFrame(animate);
      if (autoRotate && !isDragging.current) {
        globeGroup.rotation.y += 0.002;
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
      container.removeEventListener("mouseenter", () => onHoverChange?.(false));
      container.removeEventListener("touchstart", onDown);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchend", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [onHoverChange]);

  return <div ref={containerRef} className={`relative w-full h-full ${className}`} />;
}
