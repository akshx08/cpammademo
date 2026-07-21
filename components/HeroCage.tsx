"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Wireframe octagon cage — the hero object. LineSegments only, blood-red
 * additive lines, breathing scale, mouse-lerp tilt, scroll-velocity kick.
 * DPR capped at 2, paused offscreen/hidden, static under reduced-motion.
 */
export default function HeroCage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // no WebGL — hero type still carries the section
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 1.75, 6.4);
    camera.lookAt(0, 0.5, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const BLOOD = new THREE.Color("#FF3B2F");
    const BONE = new THREE.Color("#C9CDD4");

    // ---------- octagon cage geometry ----------
    const R = 2.05;
    const H = 1.3;
    const SIDES = 8;
    const ringAt = (y: number, r: number) => {
      const pts: number[] = [];
      for (let i = 0; i < SIDES; i++) {
        const a1 = ((i + 0.5) / SIDES) * Math.PI * 2;
        const a2 = ((i + 1.5) / SIDES) * Math.PI * 2;
        pts.push(
          Math.cos(a1) * r, y, Math.sin(a1) * r,
          Math.cos(a2) * r, y, Math.sin(a2) * r
        );
      }
      return pts;
    };
    const vert = (i: number, y: number, r = R) => {
      const a = ((i + 0.5) / SIDES) * Math.PI * 2;
      return [Math.cos(a) * r, y, Math.sin(a) * r] as const;
    };

    const cage = new THREE.Group();

    // main frame: top ring, bottom ring, posts
    const framePts: number[] = [...ringAt(0, R), ...ringAt(H, R)];
    for (let i = 0; i < SIDES; i++) {
      framePts.push(...vert(i, 0), ...vert(i, H));
    }
    const frameGeo = new THREE.BufferGeometry();
    frameGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(framePts, 3)
    );
    const frameMat = new THREE.LineBasicMaterial({
      color: BLOOD,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    cage.add(new THREE.LineSegments(frameGeo, frameMat));

    // lattice: X diagonals per face + mid ring — the chain-link suggestion
    const latticePts: number[] = [...ringAt(H * 0.52, R)];
    for (let i = 0; i < SIDES; i++) {
      const j = (i + 1) % SIDES;
      latticePts.push(...vert(i, 0), ...vert(j, H));
      latticePts.push(...vert(j, 0), ...vert(i, H));
    }
    const latGeo = new THREE.BufferGeometry();
    latGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(latticePts, 3)
    );
    const latMat = new THREE.LineBasicMaterial({
      color: BLOOD,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    cage.add(new THREE.LineSegments(latGeo, latMat));

    // corner nodes
    const nodePts: number[] = [];
    for (let i = 0; i < SIDES; i++) {
      nodePts.push(...vert(i, 0), ...vert(i, H));
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodePts, 3)
    );
    const nodeMat = new THREE.PointsMaterial({
      color: BLOOD,
      size: 0.075,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    cage.add(new THREE.Points(nodeGeo, nodeMat));

    // radar floor rings
    const floorPts: number[] = [
      ...ringAt(0, R * 1.35),
      ...ringAt(0, R * 1.85),
      ...ringAt(0, R * 2.45),
    ];
    const floorGeo = new THREE.BufferGeometry();
    floorGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(floorPts, 3)
    );
    const floorMat = new THREE.LineBasicMaterial({
      color: BONE,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    cage.add(new THREE.LineSegments(floorGeo, floorMat));

    scene.add(cage);

    // red dust drifting inside the void
    const DUST = 240;
    const dustPos = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * R * 2.6;
      dustPos[i * 3] = Math.cos(a) * r;
      dustPos[i * 3 + 1] = Math.random() * H * 2.6 - H * 0.4;
      dustPos[i * 3 + 2] = Math.sin(a) * r;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: BLOOD,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ---------- sizing ----------
    let baseZ = 6.4;
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      // portrait: pull back so the full cage stays in frame
      baseZ = camera.aspect < 1 ? 10.6 - 2.6 * camera.aspect : 6.4;
      camera.position.z = baseZ;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---------- animation ----------
    let raf = 0;
    let inView = true;
    let hidden = false;
    let mx = 0;
    let my = 0;
    let smx = 0;
    let smy = 0;
    let lastScroll = window.scrollY;
    let scrollVel = 0;
    let t = 0;

    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        const was = inView;
        inView = entry.isIntersecting;
        if (inView && !was && !hidden && !reduced) loop();
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const onVis = () => {
      hidden = document.hidden;
      if (!hidden && inView && !reduced) loop();
    };
    document.addEventListener("visibilitychange", onVis);

    const render = () => {
      t += 0.016;
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;

      const sc = window.scrollY;
      scrollVel += (sc - lastScroll - scrollVel) * 0.08;
      lastScroll = sc;

      cage.rotation.y += 0.0016 + Math.min(Math.abs(scrollVel) * 0.00008, 0.01);
      cage.rotation.x = smy * 0.1;
      cage.rotation.z = smx * 0.04;
      const breathe = 1 + Math.sin(t * 0.6) * 0.018;
      cage.scale.setScalar(breathe);
      cage.position.y = Math.sin(t * 0.4) * 0.04;

      dust.rotation.y -= 0.0006;
      dust.position.y = Math.sin(t * 0.25) * 0.08;

      camera.position.x = smx * 0.28;
      camera.position.y = 1.75 - smy * 0.15;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    const loop = () => {
      cancelAnimationFrame(raf);
      const frame = () => {
        if (!inView || hidden) return;
        render();
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      render(); // single static frame
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
      [frameGeo, latGeo, nodeGeo, floorGeo, dustGeo].forEach((g) =>
        g.dispose()
      );
      [frameMat, latMat, nodeMat, floorMat, dustMat].forEach((m) =>
        m.dispose()
      );
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 [&>canvas]:!h-full [&>canvas]:!w-full"
      aria-hidden
    />
  );
}
