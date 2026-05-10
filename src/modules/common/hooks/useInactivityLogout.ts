import { useEffect, useRef } from 'react';

interface Options {
  enabled: boolean;
  timeoutMs: number;
  onTimeout: () => void;
}

const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  'mousemove',
  'mousedown',
  'keydown',
  'scroll',
  'touchstart',
];

/**
 * Hook que ejecuta `onTimeout` cuando no hay interacción del usuario por `timeoutMs`.
 * @param options             Configuración del watcher.
 * @param options.enabled     Activa o desactiva el watcher (típicamente `!!token`).
 * @param options.timeoutMs   Ventana de inactividad en milisegundos.
 * @param options.onTimeout   Callback ejecutado al vencer el tiempo sin actividad.
 */
export const useInactivityLogout = ({ enabled, timeoutMs, onTimeout }: Options): void => {
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  useEffect(() => {
    if (!enabled) return;

    let timer: ReturnType<typeof setTimeout>;

    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => onTimeoutRef.current(), timeoutMs);
    };

    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, reset, { passive: true }));
    reset();

    return () => {
      clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, reset));
    };
  }, [enabled, timeoutMs]);
};
