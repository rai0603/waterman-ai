"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createParticleEngine, type ParticleEngine } from "@/lib/particles/engine";
import { scenes, type SceneName } from "@/lib/particles/scenes";

const DEFAULT_SCENE: SceneName = "field";

function isSceneName(value: string | undefined): value is SceneName {
  return value !== undefined && value in scenes;
}

/** 固定在全站背景的畫布，依畫面中央的 data-scene 區塊切換粒子形態。 */
export default function ParticleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  const sceneRef = useRef<SceneName>(DEFAULT_SCENE);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;

    createParticleEngine(canvas).then((engine) => {
      if (cancelled) {
        engine?.dispose();
        return;
      }
      engineRef.current = engine;
      engine?.setScene(sceneRef.current);
    });

    return () => {
      cancelled = true;
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const active = new Set<Element>();
    const apply = () => {
      const element = [...active].at(-1) as HTMLElement | undefined;
      const name = element?.dataset.scene;
      sceneRef.current = isSceneName(name) ? name : DEFAULT_SCENE;
      engineRef.current?.setScene(sceneRef.current);
    };

    // 上下各縮 50%，只留畫面中線，同一時間只會命中一個區塊
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        }
        apply();
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    document.querySelectorAll("[data-scene]").forEach((element) => observer.observe(element));
    apply();
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
    />
  );
}
