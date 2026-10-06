import { useEffect, useRef, useState } from 'react';

type ScrollVideoProps = { src: string; poster?: string };

const MAX_FRAMES = 90;
const MIN_FRAMES = 24;
const FRAMES_PER_SECOND = 12;
const MAX_FRAME_WIDTH = 960;
const LERP = 0.12;
const SEEK_EPSILON = 0.04;

/** Dessine une source en mode « object-cover » (échelle max, recadrage centré). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sw: number,
  sh: number,
  cw: number,
  ch: number,
) {
  const scale = Math.max(cw / sw, ch / sh);
  const dw = sw * scale;
  const dh = sh * scale;
  ctx.drawImage(source, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

function once(target: EventTarget, event: string) {
  return new Promise<void>((resolve, reject) => {
    const ok = () => { cleanup(); resolve(); };
    const ko = () => { cleanup(); reject(new Error(`${event} failed`)); };
    const cleanup = () => {
      target.removeEventListener(event, ok);
      target.removeEventListener('error', ko);
    };
    target.addEventListener(event, ok, { once: true });
    target.addEventListener('error', ko, { once: true });
  });
}

/**
 * Fond vidéo piloté par le scroll (aucune lecture automatique).
 * Couches : poster → <video> (repli par seek) → <canvas> (cache de frames).
 */
export function ScrollVideo({ src, poster }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const targetRef = useRef(0);
  const smoothedRef = useRef(0);
  const lastDrawnRef = useRef(-1);

  const [hasFrame, setHasFrame] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  // Progression du scroll : scrollY / (scrollHeight - innerHeight), bornée 0–1
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Dimensionnement du canvas (DPR plafonné à 2)
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      lastDrawnRef.current = -1; // forcer un nouveau dessin
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Extraction des frames dans une vidéo hors écran, après loadeddata + 300 ms
  useEffect(() => {
    if (!hasFrame) return;
    let cancelled = false;
    const extracted: ImageBitmap[] = [];
    const off = document.createElement('video');
    off.muted = true;
    off.playsInline = true;
    off.preload = 'auto';

    const run = async () => {
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      off.src = src;
      if (off.readyState < 1) await once(off, 'loadedmetadata');
      if (off.readyState < 2) await once(off, 'loadeddata');
      const duration = off.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const count = Math.min(MAX_FRAMES, Math.max(MIN_FRAMES, Math.floor(duration * FRAMES_PER_SECOND)));
      const width = Math.min(MAX_FRAME_WIDTH, off.videoWidth);
      const height = Math.round((off.videoHeight / off.videoWidth) * width);
      const end = Math.max(0, duration - 0.05);

      for (let i = 0; i < count; i++) {
        if (cancelled) return;
        off.currentTime = (i / (count - 1)) * end;
        await once(off, 'seeked');
        extracted.push(
          await createImageBitmap(off, { resizeWidth: width, resizeHeight: height, resizeQuality: 'high' }),
        );
      }
      if (cancelled) return;
      framesRef.current = extracted;
      lastDrawnRef.current = -1;
      setCacheReady(true);
    };

    run().catch(() => {
      /* échec de l'extraction : on reste sur le repli par seek de la vidéo */
    });

    return () => {
      cancelled = true;
      off.removeAttribute('src');
      off.load();
      if (framesRef.current !== extracted) extracted.forEach((b) => b.close());
    };
  }, [hasFrame, src]);

  // Libération des frames au démontage
  useEffect(() => () => framesRef.current.forEach((b) => b.close()), []);

  // Boucle d'animation : lissage (lerp 0.12) puis dessin ou seek
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      smoothedRef.current += (targetRef.current - smoothedRef.current) * LERP;
      const p = smoothedRef.current;
      const frames = framesRef.current;
      const canvas = canvasRef.current;

      if (cacheReady && frames.length && canvas) {
        const index = Math.min(frames.length - 1, Math.round(p * (frames.length - 1)));
        if (index !== lastDrawnRef.current) {
          const ctx = canvas.getContext('2d');
          const frame = frames[index];
          if (ctx) {
            drawCover(ctx, frame, frame.width, frame.height, canvas.width, canvas.height);
            lastDrawnRef.current = index;
          }
        }
      } else {
        const video = videoRef.current;
        if (video && video.readyState >= 1 && Number.isFinite(video.duration) && !video.seeking) {
          const t = p * Math.max(0, video.duration - 0.05);
          if (Math.abs(video.currentTime - t) > SEEK_EPSILON) video.currentTime = t;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cacheReady]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]" aria-hidden="true">
      {poster && !posterFailed && (
        <img
          src={poster}
          alt=""
          onError={() => setPosterFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hasFrame || cacheReady ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setHasFrame(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hasFrame && !cacheReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          cacheReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
