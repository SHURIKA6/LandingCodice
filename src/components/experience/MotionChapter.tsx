'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionMode } from './useMotionMode';
import './mobile-chapters.css';

const ease = 'cubic-bezier(.16,1,.3,1)';
const control = 'a, button, summary, input, select, textarea, [tabindex]';
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Server-rendered children stay visible; choreography is an optional layer. */
export function MotionChapter({ children, className, id, labelledBy }: {
  children: ReactNode;
  className: string;
  id: string;
  labelledBy: string;
}) {
  const section = useRef<HTMLElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const revealed = useRef(new WeakSet<HTMLElement>());
  const mode = useMotionMode();
  const { scrollYProgress, scrollY } = useScroll({ target: section, offset: ['start end', 'start 20%'] });
  const radius = useTransform(scrollYProgress, [0, 1], [64, 0]);

  useEffect(() => {
    const root = section.current;
    if (!root || mode === 'static' || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const mobile = mode !== 'desktop';
    const animations = new Map<Animation, HTMLElement>();
    const restores: (() => void)[] = [];
    const headingLines = new Map<HTMLElement, HTMLElement[]>();
    const play = (target: HTMLElement, frames: Keyframe[], duration: number, delay = 0) => {
      // The target box and every ancestor of a control remain in the stable layer.
      if (document.hidden || root.contains(document.activeElement) || target.matches(control) || target.querySelector(control)) return;
      const previous = target.style.willChange;
      target.style.willChange = 'transform, opacity';
      const animation = target.animate(frames, { duration, easing: ease, delay, fill: 'backwards' });
      animations.set(animation, target);
      const finish = () => {
        target.style.willChange = previous;
        animations.delete(animation);
      };
      animation.addEventListener('finish', finish, { once: true });
      animation.addEventListener('cancel', finish, { once: true });
    };

    if (mobile) root.querySelectorAll<HTMLElement>('[data-reveal="heading"] h2').forEach(heading => {
      const original = Array.from(heading.childNodes);
      if (!original.some(node => node instanceof HTMLBRElement)) return;
      const fragment = document.createDocumentFragment();
      const lines: HTMLElement[] = [];
      let line: HTMLSpanElement;
      const nextLine = () => {
        const mask = document.createElement('span');
        mask.className = 'chapter-title-line';
        line = document.createElement('span');
        mask.append(line);
        fragment.append(mask);
        lines.push(line);
      };
      nextLine();
      for (const node of original) {
        if (node instanceof HTMLBRElement) nextLine();
        else if (!(node instanceof SVGElement)) line!.append(node);
      }
      // Keep the decorative contact arrow a direct child for its authored layout.
      original.filter(node => node instanceof SVGElement).forEach(node => fragment.append(node));
      heading.replaceChildren(fragment);
      headingLines.set(heading, lines);
      restores.push(() => heading.replaceChildren(...original));
    });

    // Only decorative, aria-hidden lettering is split. The server text and arrow
    // are restored before a responsive mode change or unmount.
    const word = mobile ? root.querySelector<HTMLElement>('.footer-word[aria-hidden="true"]') : null;
    let letters: HTMLElement[] = [];
    if (word) {
      const text = Array.from(word.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
      if (text) {
        const wrapper = document.createElement('span');
        wrapper.className = 'footer-letters';
        letters = Array.from(text.textContent || '').map(letter => {
          const span = document.createElement('span');
          span.className = 'footer-letter';
          span.textContent = letter;
          wrapper.append(span);
          return span;
        });
        text.replaceWith(wrapper);
        restores.push(() => wrapper.replaceWith(text));
      }
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        observer.unobserve(target);
        if (revealed.current.has(target)) continue;
        revealed.current.add(target);
        if (document.hidden || target.contains(document.activeElement)) continue;
        const kind = target.dataset.reveal;
        const delay = Math.min(240, Math.max(0, Number(target.dataset.delay || 0)));
        if (target === surface.current) {
          play(target, [{ transform: 'translateY(64px)', borderTopLeftRadius: '64px', borderTopRightRadius: '64px' },
            { transform: 'translateY(0)', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }], 800);
        } else if (kind === 'heading') {
          const heading = target.querySelector<HTMLElement>('h2, h3') || target;
          const lines = headingLines.get(heading) || [heading];
          const initial = mobile && id === 'contato' ? 'translateX(-48px)' : `translateY(${mobile && id === 'pacote' ? 48 : 64}px)`;
          lines.forEach((line, index) => play(line, [{ transform: initial, clipPath: 'inset(0 0 85% 0)' },
            { transform: 'translate(0, 0)', clipPath: 'inset(-8% 0 -8% 0)' }], 850, mobile ? index * 90 : 0));
          if (mobile) {
            const eyebrow = target.querySelector<HTMLElement>('.eyebrow');
            const copy = target.querySelector<HTMLElement>('p:last-child:not(.eyebrow)');
            if (eyebrow) play(eyebrow, [{ transform: 'translateX(-32px)', opacity: .55 }, { transform: 'translateX(0)', opacity: 1 }], 600);
            if (copy) play(copy, [{ transform: 'translateY(32px)', opacity: .55 }, { transform: 'translateY(0)', opacity: 1 }], 700, 120);
          }
        } else if (kind === 'word' && letters.length) {
          letters.forEach((letter, index) => play(letter, [
            { transform: `translateY(${index % 2 ? '110%' : '-95%'}) rotate(${index % 2 ? 5 : -5}deg)`, clipPath: 'inset(0 0 100% 0)' },
            { transform: 'translateY(0) rotate(0)', clipPath: 'inset(-10% 0 -10% 0)' },
          ], 850, index * (300 / Math.max(1, letters.length - 1))));
          const arrow = word?.querySelector<HTMLElement>(':scope > span:not(.footer-letters)');
          if (arrow) play(arrow, [{ transform: 'translate(20px, 28px) rotate(-35deg)', opacity: .4 }, { transform: 'translate(0, 0) rotate(0)', opacity: 1 }], 700, 180);
        } else if (kind === 'word') {
          play(target, [{ transform: 'translateY(45%)', clipPath: 'inset(0 0 100% 0)' },
            { transform: 'translateY(0)', clipPath: 'inset(0 0 -5% 0)' }], 1000);
        } else if (kind === 'price') {
          // The complete price is one typographic unit; no number counter.
          play(target, [{ transform: 'translateX(-48px)', opacity: .55 }, { transform: 'translateX(0)', opacity: 1 }], 750);
        } else if (kind === 'inclusion') {
          play(target, [{ transform: 'translateX(36px)', opacity: .6 }, { transform: 'translateX(0)', opacity: 1 }], 650, delay);
        } else if (kind !== 'process' || !mobile) {
          play(target, [{ transform: `translateY(${mobile ? 48 : 42}px)`, opacity: .45 },
            { transform: 'translateY(0)', opacity: 1 }], mobile ? 700 : 850, delay);
        }
      }
    }, { threshold: .05, rootMargin: '0px 0px -3% 0px' });
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(target => {
      // A visible link never waits for its parent to finish arriving.
      if (!target.matches(control) && !target.querySelector(control) && !(mobile && target.dataset.reveal === 'process')) observer.observe(target);
    });
    if (mobile && surface.current) observer.observe(surface.current);

    // A local filete and numbers follow the same scroll position in either
    // direction. Text stays readable even before the step is reached.
    const process = mobile ? root.querySelector<HTMLOListElement>('.process ol') : null;
    const steps = process ? Array.from(process.querySelectorAll<HTMLElement>(':scope > li')) : [];
    let processVisible = false;
    const updateProcess = () => {
      if (!process || !processVisible || document.hidden) return;
      const bounds = process.getBoundingClientRect();
      const readingLine = window.innerHeight * .72;
      process.style.setProperty('--process-progress', String(clamp((readingLine - bounds.top) / Math.max(1, bounds.height))));
      for (const step of steps) {
        const stepBounds = step.getBoundingClientRect();
        const progress = clamp((readingLine - stepBounds.top) / Math.max(80, stepBounds.height * .8));
        step.style.setProperty('--step-progress', String(progress));
      }
    };
    const processObserver = process ? new IntersectionObserver(entries => {
      processVisible = entries[0].isIntersecting;
      process.dataset.processMotion = 'true';
      updateProcess();
    }, { rootMargin: '20% 0px' }) : null;
    if (process) processObserver?.observe(process);
    const stopScroll = process ? scrollY.on('change', updateProcess) : () => {};
    const cancel = () => { animations.forEach((_, animation) => animation.cancel()); animations.clear(); };
    const visibility = () => { if (document.hidden) cancel(); else updateProcess(); };
    const stabilize = () => cancel();
    document.addEventListener('visibilitychange', visibility);
    root.addEventListener('focusin', stabilize);
    root.addEventListener('pointerdown', stabilize, { passive: true });
    window.addEventListener('resize', updateProcess, { passive: true });
    return () => {
      observer.disconnect(); processObserver?.disconnect(); stopScroll(); cancel();
      document.removeEventListener('visibilitychange', visibility);
      root.removeEventListener('focusin', stabilize);
      root.removeEventListener('pointerdown', stabilize);
      window.removeEventListener('resize', updateProcess);
      process?.removeAttribute('data-process-motion');
      process?.style.removeProperty('--process-progress');
      steps.forEach(step => step.style.removeProperty('--step-progress'));
      restores.forEach(restore => restore());
    };
  }, [id, mode, scrollY]);

  return <motion.section ref={section} id={id} aria-labelledby={labelledBy}
    className={`${className} motion-chapter`} data-motion={mode !== 'static'} data-motion-mode={mode}
    style={mode === 'static' ? undefined : { borderTopLeftRadius: radius, borderTopRightRadius: radius }}>
    <div className="chapter-surface-clip" aria-hidden="true"><div ref={surface} className="chapter-surface" /></div>
    {children}
  </motion.section>;
}
