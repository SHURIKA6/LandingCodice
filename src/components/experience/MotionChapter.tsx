'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionMode } from './useMotionMode';
import './mobile-chapters.css';
import './chapter-choreography.css';

const ease = 'cubic-bezier(.16,1,.3,1)';
const control = 'a, button, summary, input, select, textarea, [tabindex]';
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** The section stays in document flow; only its lettering and painted field move. */
export function MotionChapter({ children, className, id, labelledBy }: {
  children: ReactNode;
  className: string;
  id: string;
  labelledBy: string;
}) {
  const section = useRef<HTMLElement>(null);
  const revealed = useRef(new WeakSet<HTMLElement>());
  const mode = useMotionMode();
  const { scrollYProgress, scrollY } = useScroll({ target: section, offset: ['start end', 'start 20%'] });
  const radius = useTransform(scrollYProgress, [0, 1], [64, 0]);

  useEffect(() => {
    const root = section.current;
    if (!root || mode === 'static' || !('IntersectionObserver' in window)) return;
    const mobile = mode !== 'desktop';
    const animations = new Map<Animation, HTMLElement>();
    const restores: (() => void)[] = [];
    const written = new Map<HTMLElement, Map<string, string>>();
    const largeText = () => document.documentElement.hasAttribute('data-large-text');
    const write = (target: HTMLElement, property: string, value: number) => {
      const next = String(Math.round(value * 1000) / 1000);
      let properties = written.get(target);
      if (!properties) { properties = new Map(); written.set(target, properties); }
      if (properties.get(property) === next) return;
      properties.set(property, next); target.style.setProperty(property, next);
    };
    const cancel = () => { animations.forEach((_, animation) => animation.cancel()); animations.clear(); };
    const play = (target: HTMLElement, frames: Keyframe[], duration: number, delay = 0) => {
      if (!Element.prototype.animate || document.hidden || largeText() || root.contains(document.activeElement)
        || target.matches(control) || target.querySelector(control)) return;
      const previous = target.style.willChange;
      target.style.willChange = 'transform, opacity';
      const animation = target.animate(frames, { duration, easing: ease, delay, fill: 'backwards' });
      animations.set(animation, target);
      const finish = () => { target.style.willChange = previous; animations.delete(animation); };
      animation.addEventListener('finish', finish, { once: true });
      animation.addEventListener('cancel', finish, { once: true });
    };

    // Preserve the original nodes, authored line breaks and inline emphasis.
    root.querySelectorAll<HTMLElement>('[data-reveal="heading"] h2').forEach(heading => {
      const original = Array.from(heading.childNodes);
      if (!original.some(node => node instanceof HTMLBRElement)) return;
      const fragment = document.createDocumentFragment();
      let line: HTMLSpanElement;
      const nextLine = () => {
        const mask = document.createElement('span'); mask.className = 'chapter-title-line';
        line = document.createElement('span'); mask.append(line); fragment.append(mask);
      };
      nextLine();
      original.forEach(node => {
        if (node instanceof HTMLBRElement) nextLine();
        else if (!(node instanceof SVGElement)) line!.append(node);
      });
      original.filter(node => node instanceof SVGElement).forEach(node => fragment.append(node));
      heading.replaceChildren(fragment);
      restores.push(() => heading.replaceChildren(...original));
    });

    const word = root.querySelector<HTMLElement>('.footer-word[aria-hidden="true"]');
    let letters: HTMLElement[] = [];
    if (word) {
      const text = Array.from(word.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
      if (text) {
        const wrapper = document.createElement('span'); wrapper.className = 'footer-letters';
        letters = Array.from(text.textContent || '').map(letter => {
          const span = document.createElement('span'); span.className = 'footer-letter'; span.textContent = letter;
          wrapper.append(span); return span;
        });
        text.replaceWith(wrapper); restores.push(() => wrapper.replaceWith(text));
      }
    }

    const offer = root.querySelector<HTMLElement>('.package-grid');
    const inclusions = root.querySelector<HTMLElement>('.package-details > ul');
    const inclusionItems = inclusions ? Array.from(inclusions.querySelectorAll<HTMLElement>(':scope > li')) : [];
    const process = root.querySelector<HTMLOListElement>('.process ol');
    const steps = process ? Array.from(process.querySelectorAll<HTMLElement>(':scope > li')) : [];
    process?.setAttribute('data-process-motion', 'true');
    process?.setAttribute('data-process-axis', mobile ? 'vertical' : 'horizontal');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement; observer.unobserve(target);
        if (revealed.current.has(target)) return;
        revealed.current.add(target);
        const kind = target.dataset.reveal;
        if (kind === 'heading') {
          const eyebrow = target.querySelector<HTMLElement>('.eyebrow');
          const copy = target.querySelector<HTMLElement>('p:last-child:not(.eyebrow)');
          if (eyebrow) play(eyebrow, [{ transform: 'translateX(-24px)', opacity: .6 }, { transform: 'translateX(0)', opacity: 1 }], 600);
          if (copy) play(copy, [{ transform: 'translateY(28px)', opacity: .6 }, { transform: 'translateY(0)', opacity: 1 }], 700, 100);
        } else if (kind === 'inclusion') {
          const delay = Math.min(240, Math.max(0, Number(target.dataset.delay || 0)));
          play(target, [{ transform: 'translateX(28px)', opacity: .65 }, { transform: 'translateX(0)', opacity: 1 }], 650, delay);
        } else if (kind !== 'process' && kind !== 'word') {
          play(target, [{ transform: `translateY(${mobile ? 40 : 32}px)`, opacity: .6 }, { transform: 'translateY(0)', opacity: 1 }], 750);
        }
      });
    }, { threshold: .05, rootMargin: '0px 0px -3% 0px' });
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(target => {
      if (!target.matches(control) && !target.querySelector(control)) observer.observe(target);
    });

    const visible = new Set<HTMLElement>();
    const targets = [offer, inclusions, process, word].filter((node): node is HTMLElement => !!node);
    const updateEntry = () => {
      if (!document.hidden && !largeText()) write(root, '--chapter-entry', clamp(scrollYProgress.get()));
    };
    const update = () => {
      if (document.hidden || largeText()) return;
      const viewport = window.innerHeight;
      // Read every relevant rect before performing any style write.
      const bounds = new Map(Array.from(visible, target => [target, target.getBoundingClientRect()] as const));
      const stepBounds = process && visible.has(process) ? steps.map(step => step.getBoundingClientRect()) : [];
      const inclusionTops = inclusions && visible.has(inclusions) ? inclusionItems.map(item => item.offsetTop) : [];
      if (offer && bounds.has(offer)) write(offer, '--offer-progress', clamp((viewport * .92 - bounds.get(offer)!.top) / (viewport * .4)));
      if (inclusions && bounds.has(inclusions)) inclusionItems.forEach((item, index) => {
        write(item, '--inclusion-progress', clamp((viewport * .88 - bounds.get(inclusions)!.top - inclusionTops[index]) / (viewport * .3)));
      });
      if (process && bounds.has(process)) {
        const rect = bounds.get(process)!;
        const progress = clamp((viewport * .72 - rect.top) / Math.max(1, mobile ? rect.height : Math.max(rect.height, viewport * .4)));
        write(process, '--process-progress', progress);
        steps.forEach((step, index) => write(step, '--step-progress', mobile
          ? clamp((viewport * .72 - stepBounds[index].top) / Math.max(80, stepBounds[index].height * .8))
          : clamp(progress * steps.length - index)));
      }
      if (word && bounds.has(word)) {
        const rect = bounds.get(word)!;
        const progress = clamp((viewport * .95 - rect.top) / Math.max(80, Math.min(viewport * .4, rect.height * .75)));
        letters.forEach((letter, index) => write(letter, '--letter-progress', clamp((progress - index * .045) / (1 - index * .045))));
        write(word, '--word-progress', progress);
      }
    };
    const localObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target as HTMLElement); else visible.delete(entry.target as HTMLElement);
      }); update();
    }, { rootMargin: '120px 0px' });
    targets.forEach(target => localObserver.observe(target));
    const resizeObserver = new ResizeObserver(() => { updateEntry(); update(); });
    targets.forEach(target => resizeObserver.observe(target));
    const stopEntry = scrollYProgress.on('change', updateEntry);
    const stopScroll = scrollY.on('change', update);
    const visibility = () => { if (document.hidden) cancel(); else { updateEntry(); update(); } };
    const textObserver = new MutationObserver(() => {
      root.dataset.choreography = String(!largeText());
      if (largeText()) cancel(); else { updateEntry(); update(); }
    });
    textObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-large-text'] });
    root.dataset.choreography = String(!largeText()); updateEntry();
    document.addEventListener('visibilitychange', visibility);
    root.addEventListener('focusin', cancel); root.addEventListener('pointerdown', cancel, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      observer.disconnect(); localObserver.disconnect(); resizeObserver.disconnect(); textObserver.disconnect();
      stopEntry(); stopScroll(); cancel();
      document.removeEventListener('visibilitychange', visibility);
      root.removeEventListener('focusin', cancel); root.removeEventListener('pointerdown', cancel);
      window.removeEventListener('resize', update); delete root.dataset.choreography;
      process?.removeAttribute('data-process-motion'); process?.removeAttribute('data-process-axis');
      written.forEach((properties, target) => properties.forEach((_, property) => target.style.removeProperty(property)));
      restores.reverse().forEach(restore => restore());
    };
  }, [mode, scrollY, scrollYProgress]);

  return <motion.section ref={section} id={id} aria-labelledby={labelledBy}
    className={`${className} motion-chapter`} data-motion={mode !== 'static'} data-motion-mode={mode}
    style={mode === 'static' ? undefined : { borderTopLeftRadius: radius, borderTopRightRadius: radius }}>
    <div className="chapter-surface-clip" aria-hidden="true"><div className="chapter-surface" /></div>
    {children}
  </motion.section>;
}
