import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInactivityLogout } from '../useInactivityLogout';

describe('useInactivityLogout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('dispara onTimeout tras transcurrir el tiempo sin actividad', () => {
    const onTimeout = vi.fn();
    renderHook(() =>
      useInactivityLogout({ enabled: true, timeoutMs: 1000, onTimeout }),
    );

    expect(onTimeout).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1001); });
    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it('se resetea cuando hay actividad antes del timeout', () => {
    const onTimeout = vi.fn();
    renderHook(() =>
      useInactivityLogout({ enabled: true, timeoutMs: 1000, onTimeout }),
    );

    act(() => { vi.advanceTimersByTime(800); });
    act(() => { window.dispatchEvent(new Event('keydown')); });
    act(() => { vi.advanceTimersByTime(800); });

    // 800 + 800 = 1600ms total pero el evento reseteó el timer en el 800 → no debería disparar
    expect(onTimeout).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(300); });
    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it('no dispara si enabled=false', () => {
    const onTimeout = vi.fn();
    renderHook(() =>
      useInactivityLogout({ enabled: false, timeoutMs: 500, onTimeout }),
    );

    act(() => { vi.advanceTimersByTime(2000); });
    expect(onTimeout).not.toHaveBeenCalled();
  });

  it('limpia timers y listeners al desmontar', () => {
    const onTimeout = vi.fn();
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useInactivityLogout({ enabled: true, timeoutMs: 1000, onTimeout }),
    );

    unmount();
    act(() => { vi.advanceTimersByTime(2000); });

    expect(onTimeout).not.toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    removeSpy.mockRestore();
  });
});
