import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useRevealOnScroll, REVEAL_FALLBACK_MS } from './useRevealOnScroll';

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

function mockIntersectionObserver() {
  const instance = { callback: null as ObserverCallback | null, observe: vi.fn(), disconnect: vi.fn() };
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(function (this: unknown, callback: ObserverCallback) {
      instance.callback = callback;
      return { observe: instance.observe, disconnect: instance.disconnect };
    }),
  );
  return instance;
}

function renderWithElement() {
  const element = document.createElement('section');
  return renderHook(() => useRevealOnScroll({ current: element }));
}

describe('useRevealOnScroll', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('should stay hidden until the element scrolls into view, then reveal once', () => {
    const observer = mockIntersectionObserver();
    const { result } = renderWithElement();

    expect(result.current).toBe(false);
    expect(observer.observe).toHaveBeenCalledOnce();

    act(() => observer.callback?.([{ isIntersecting: false }]));
    expect(result.current).toBe(false);

    act(() => observer.callback?.([{ isIntersecting: true }]));
    expect(result.current).toBe(true);
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('should reveal immediately when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { result } = renderWithElement();

    expect(result.current).toBe(true);
  });

  it('should reveal anyway if the observer never reports (throttled tab, crawler)', () => {
    vi.useFakeTimers();
    mockIntersectionObserver();
    const { result } = renderWithElement();

    expect(result.current).toBe(false);
    act(() => vi.advanceTimersByTime(REVEAL_FALLBACK_MS));
    expect(result.current).toBe(true);
    vi.useRealTimers();
  });
});

