import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useInView } from './useInView';

describe('useInView', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    const MockIntersectionObserver = vi.fn(function (this: IntersectionObserver, cb: IntersectionObserverCallback) {
      observerCallback = cb;
      this.observe = observeMock;
      this.disconnect = disconnectMock;
      this.unobserve = vi.fn();
      this.takeRecords = vi.fn(() => []);
      this.root = null;
      this.rootMargin = '';
      this.thresholds = [];
    });

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts as false', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useInView(ref);
    });
    expect(result.current).toBe(false);
  });

  it('becomes true when element intersects', () => {
    const div = document.createElement('div');
    const { result } = renderHook(() => {
      const ref = { current: div };
      return useInView(ref);
    });

    act(() => {
      observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(result.current).toBe(true);
  });

  it('disconnects after becoming visible (once=true)', () => {
    const div = document.createElement('div');
    renderHook(() => {
      const ref = { current: div };
      return useInView(ref);
    });

    act(() => {
      observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('does not update when not intersecting', () => {
    const div = document.createElement('div');
    const { result } = renderHook(() => {
      const ref = { current: div };
      return useInView(ref);
    });

    act(() => {
      observerCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(result.current).toBe(false);
  });

  it('does not observe when ref is null', () => {
    renderHook(() => useInView({ current: null }));
    expect(observeMock).not.toHaveBeenCalled();
  });

  it('does not disconnect when once=false', () => {
    const div = document.createElement('div');
    renderHook(() => useInView({ current: div }, { once: false }));

    act(() => {
      observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(disconnectMock).not.toHaveBeenCalled();
  });
});
