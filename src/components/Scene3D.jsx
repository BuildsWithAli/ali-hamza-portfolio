"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Interactive 3D circuit / neural-network scene: a copper node cluster
// (hardware/PCB) bridged to a cyan node cluster (AI), with data packets
// traveling the bridge edges. Drag to rotate, move to parallax.
export default function Scene3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0.4, 10.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    function sizeRenderer() {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 1 || h < 1) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    function makeGlowTexture(hex) {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, hex + "ff");
      g.addColorStop(0.35, hex + "aa");
      g.addColorStop(1, hex + "00");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }
    const copperTex = makeGlowTexture("#d68a4c");
    const cyanTex = makeGlowTexture("#56d6c4");

    const group = new THREE.Group();
    scene.add(group);

    const COPPER = new THREE.Color("#d68a4c");
    const CYAN = new THREE.Color("#56d6c4");

    function clusterPoints(center, count, radius) {
      const pts = [];
      for (let i = 0; i < count; i++) {
        const v = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
        if (v.length() < 0.001) v.set(1, 0, 0);
        v.normalize().multiplyScalar(Math.pow(Math.random(), 0.5) * radius);
        v.add(center);
        pts.push(v);
      }
      return pts;
    }

    const left = clusterPoints(new THREE.Vector3(-3.1, 0.2, -0.6), 26, 2.5);
    const right = clusterPoints(new THREE.Vector3(3.1, -0.1, 0.4), 22, 2.3);
    const allNodes = left.concat(right);

    const disposables = [copperTex, cyanTex];

    allNodes.forEach((p, i) => {
      const isLeft = i < left.length;
      const mat = new THREE.SpriteMaterial({
        map: isLeft ? copperTex : cyanTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.95,
      });
      const s = new THREE.Sprite(mat);
      const scale = 0.16 + Math.random() * 0.14;
      s.scale.set(scale, scale, scale);
      s.position.copy(p);
      group.add(s);
      disposables.push(mat);
    });

    function kNearestEdges(points, k) {
      const edges = [];
      for (let i = 0; i < points.length; i++) {
        const dists = [];
        for (let j = 0; j < points.length; j++) {
          if (i === j) continue;
          dists.push([points[i].distanceTo(points[j]), j]);
        }
        dists.sort((a, b) => a[0] - b[0]);
        for (let n = 0; n < Math.min(k, dists.length); n++) {
          const pair = [i, dists[n][1]].sort((a, b) => a - b);
          edges.push({ key: pair[0] + "_" + pair[1], a: pair[0], b: pair[1] });
        }
      }
      const seen = {};
      const uniq = [];
      edges.forEach((e) => {
        if (!seen[e.key]) {
          seen[e.key] = true;
          uniq.push(e);
        }
      });
      return uniq;
    }

    const leftEdges = kNearestEdges(left, 2).map((e) => ({ a: left[e.a], b: left[e.b], t: 0 }));
    const rightEdges = kNearestEdges(right, 2).map((e) => ({ a: right[e.a], b: right[e.b], t: 1 }));

    const bridgeEdges = [];
    for (let b = 0; b < 6; b++) {
      const lp = left[Math.floor(Math.random() * left.length)];
      const rp = right[Math.floor(Math.random() * right.length)];
      bridgeEdges.push({ a: lp, b: rp, t: 0.5, bridge: true });
    }

    const allEdges = leftEdges.concat(rightEdges).concat(bridgeEdges);

    const linePositions = [];
    const lineColors = [];
    allEdges.forEach((e) => {
      linePositions.push(e.a.x, e.a.y, e.a.z, e.b.x, e.b.y, e.b.z);
      const c = COPPER.clone().lerp(CYAN, e.t);
      lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.34 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);
    disposables.push(lineGeo, lineMat);

    const packetEdges = bridgeEdges.concat(leftEdges.slice(0, 5)).concat(rightEdges.slice(0, 5));
    const packets = packetEdges.map((e, i) => {
      const tex = i % 2 === 0 ? cyanTex : copperTex;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const s = new THREE.Sprite(mat);
      s.scale.set(0.22, 0.22, 0.22);
      group.add(s);
      disposables.push(mat);
      return { sprite: s, edge: e, phase: Math.random(), speed: 0.15 + Math.random() * 0.18 };
    });

    sizeRenderer();
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(sizeRenderer);
      ro.observe(wrap);
    }
    window.addEventListener("resize", sizeRenderer);

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let dragging = false;
    const last = { x: 0, y: 0 };
    const dragRot = { x: 0, y: 0 };

    function onMove(clientX, clientY) {
      const rect = wrap.getBoundingClientRect();
      target.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((clientY - rect.top) / rect.height) * 2 - 1;
      if (dragging) {
        const dx = clientX - last.x;
        const dy = clientY - last.y;
        dragRot.y += dx * 0.005;
        dragRot.x += dy * 0.005;
        dragRot.x = Math.max(-0.6, Math.min(0.6, dragRot.x));
        last.x = clientX;
        last.y = clientY;
      }
    }
    const onPointerMove = (ev) => onMove(ev.clientX, ev.clientY);
    const onPointerDown = (ev) => {
      dragging = true;
      last.x = ev.clientX;
      last.y = ev.clientY;
      canvas.setPointerCapture(ev.pointerId);
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    wrap.addEventListener("mouseleave", onLeave);

    const clock = new THREE.Clock();
    let autoRot = 0;
    let visible = true;
    let rafId = null;
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    function animate() {
      rafId = requestAnimationFrame(animate);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);

      if (!reduceMotion) autoRot += dt * 0.06;

      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;

      group.rotation.y = autoRot + current.x * 0.35 + dragRot.y;
      group.rotation.x = current.y * -0.18 + dragRot.x;

      if (!reduceMotion) {
        packets.forEach((p) => {
          p.phase += dt * p.speed;
          const t = p.phase % 1;
          p.sprite.position.lerpVectors(p.edge.a, p.edge.b, t);
          const pulse = 0.16 + Math.sin(t * Math.PI) * 0.12;
          p.sprite.scale.set(pulse, pulse, pulse);
        });
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener("resize", sizeRenderer);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      wrap.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-canvas-wrap">
      <canvas id="scene-canvas" ref={canvasRef} />
    </div>
  );
}
