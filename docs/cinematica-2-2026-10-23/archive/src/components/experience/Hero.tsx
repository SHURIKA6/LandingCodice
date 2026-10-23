'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { teamMembers } from '../../data/team';
import { Arrow } from './Arrow';
import { PersonCard } from './PersonCard';
import { mobileStoryStops, getMobileStoryFrame } from './mobilePortraitMotion';
import { useMotionMode } from './useMotionMode';
import type { MotionMode } from './useMotionMode';
import type { PortraitSceneProps } from './PortraitScene';
import './mobile-hero.css';

const portraits = teamMembers.map(member => member.portrait.src);

function PortraitProgress({ progress, active }: { progress: MotionValue<number>; active: number }) {
  return <div className="portrait-progress" aria-hidden="true">
    <div className="portrait-progress-track"><motion.span style={{ scaleX: progress }} /></div>
    <div className="portrait-progress-names">{teamMembers.map((member, index) => <span key={member.id} data-active={active === index}>{member.firstName}</span>)}</div>
  </div>;
}

export function Hero({ href, cta }: { href: string; cta: string }) {
  const hero = useRef<HTMLElement>(null);
  const story = useRef<HTMLDivElement>(null);
  const anchor = useRef({ inside: false, index: 0 });
  const previousMode = useRef<MotionMode>('static');
  const hasEnhanced = useRef(false);
  const activeRef = useRef(0);
  const [failed, setFailed] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set());
  const [storyFits, setStoryFits] = useState(true);
  const baseMode = useMotionMode({ sceneFailed: failed });
  const mode = baseMode === 'mobile-story' && (loaded.size < teamMembers.length || photoFailed || !storyFits) ? 'mobile-flow' : baseMode;
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [Scene, setScene] = useState<ComponentType<PortraitSceneProps> | null>(null);
  const [introduced, setIntroduced] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(72);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 24, restDelta: .05 });
  const y = useSpring(pointerY, { stiffness: 90, damping: 24, restDelta: .05 });
  const inView = useInView(hero);
  const enhanced = mode === 'desktop';
  const { scrollYProgress: desktopProgress } = useScroll({ target: hero, offset: ['start start', 'end end'] });
  const { scrollYProgress: mobileProgress } = useScroll({ target: story, offset: [headerHeight === 80 ? 'start 80px' : 'start 72px', 'end end'] });
  const progress = mode === 'mobile-story' ? mobileProgress : desktopProgress;
  const updateActive = useCallback((index: number) => {
    // Motion samples scroll on the next frame, after the native scroll listener.
    // Keep the reading anchor in sync with the person that actually settled.
    anchor.current = { ...anchor.current, index };
    if (activeRef.current !== index) { activeRef.current = index; setActive(index); }
  }, []);
  const rememberAnchor = useCallback(() => {
    const root = previousMode.current === 'desktop' ? hero.current : story.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const inside = rect.top <= headerHeight + 1 && rect.bottom > headerHeight;
    let index = activeRef.current;
    if (previousMode.current === 'static' || previousMode.current === 'mobile-flow') {
      const cards = [...root.querySelectorAll<HTMLElement>('.person-card')];
      const distances = cards.map(node => Math.abs(node.getBoundingClientRect().top + node.offsetHeight / 2 - innerHeight / 2));
      index = distances.indexOf(Math.min(...distances));
    }
    anchor.current = { inside, index: Math.max(0, index) };
  }, [headerHeight]);
  const portraitReady = useCallback((index: number) => {
    rememberAnchor();
    setLoaded(current => current.has(index) ? current : new Set([...current, index]));
  }, [rememberAnchor]);
  const portraitError = useCallback(() => { rememberAnchor(); setPhotoFailed(true); }, [rememberAnchor]);
  useMotionValueEvent(desktopProgress, 'change', value => {
    if (mode === 'desktop') updateActive(Math.round(Math.max(0, Math.min(1, value)) * (teamMembers.length - 1)));
  });
  useMotionValueEvent(mobileProgress, 'change', value => {
    if (mode === 'mobile-story') updateActive(getMobileStoryFrame(value).activeIndex);
  });

  useEffect(() => { setIntroduced(true); }, []);
  useLayoutEffect(() => {
    const root = hero.current;
    if (!root) return;
    const measure = () => {
      const kicker = root.querySelector<HTMLElement>('.person-kicker');
      if (!kicker) return;
      const style = getComputedStyle(kicker);
      const authoredSize = parseFloat(style.getPropertyValue('--person-kicker-size'));
      const largeText = parseFloat(style.fontSize) > authoredSize * 1.25;
      document.documentElement.toggleAttribute('data-large-text', largeText);
      setStoryFits(!largeText && root.clientWidth > 0 && innerHeight >= 560);
    };
    // Text enlargement changes the observed name layout when flow is enabled.
    // Measure outside observer delivery so WebKit can finish the current layout
    // without reporting a resize loop. This schedules work only on resize.
    let measureFrame = 0;
    const scheduleMeasure = () => {
      if (measureFrame) return;
      measureFrame = requestAnimationFrame(() => { measureFrame = 0; measure(); });
    };
    const observer = new ResizeObserver(scheduleMeasure);
    root.querySelectorAll('.person-kicker, .person-name').forEach(node => observer.observe(node));
    window.addEventListener('resize', scheduleMeasure, { passive: true });
    measure();
    return () => {
      observer.disconnect(); cancelAnimationFrame(measureFrame);
      window.removeEventListener('resize', scheduleMeasure);
      document.documentElement.removeAttribute('data-large-text');
    };
  }, [mode]);
  useEffect(() => {
    const header = document.querySelector('.site-header');
    const resize = () => {
      rememberAnchor();
      const height = header?.getBoundingClientRect().height ?? 72;
      setHeaderHeight(height);
      document.documentElement.style.setProperty('--site-header-height', `${height}px`);
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (header) observer.observe(header);
    window.addEventListener('scroll', rememberAnchor, { passive: true });
    window.addEventListener('resize', rememberAnchor, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', rememberAnchor); window.removeEventListener('resize', rememberAnchor); };
  }, [rememberAnchor]);

  useLayoutEffect(() => {
    const prior = previousMode.current;
    const firstEnhancement = mode !== 'static' && !hasEnhanced.current;
    if (mode !== 'static') hasEnhanced.current = true;
    previousMode.current = mode;
    // On initial hydration the browser owns reload/back-forward restoration.
    // A temporary SSR flow must not reinterpret that offset as another person.
    const syncActive = () => {
      const root = mode === 'desktop' ? hero.current : story.current;
      if (!root || (mode !== 'desktop' && mode !== 'mobile-story')) return;
      const inset = mode === 'mobile-story' ? headerHeight : 0;
      const start = root.getBoundingClientRect().top + scrollY - inset;
      const range = root.offsetHeight - (innerHeight - inset);
      const value = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, range)));
      updateActive(mode === 'desktop' ? Math.round(value * (teamMembers.length - 1)) : getMobileStoryFrame(value).activeIndex);
    };
    if (firstEnhancement || prior === mode || !anchor.current.inside || !story.current) {
      const frame = requestAnimationFrame(syncActive);
      return () => cancelAnimationFrame(frame);
    }
    const saved = anchor.current;
    const frame = requestAnimationFrame(() => {
      const root = mode === 'desktop' ? hero.current : story.current;
      if (!root) return;
      const start = root.getBoundingClientRect().top + scrollY - (mode === 'mobile-story' ? headerHeight : 0);
      const range = root.offsetHeight - (innerHeight - (mode === 'mobile-story' ? headerHeight : 0));
      const card = root.querySelectorAll<HTMLElement>('.person-card')[saved.index];
      const top = mode === 'mobile-story' || mode === 'desktop'
        ? start + range * (mode === 'desktop' ? saved.index / (teamMembers.length - 1) : mobileStoryStops()[saved.index])
        : card ? card.getBoundingClientRect().top + scrollY - headerHeight - 20 : scrollY;
      if (Number.isFinite(top)) scrollTo({ top, behavior: 'instant' });
      syncActive();
    });
    return () => cancelAnimationFrame(frame);
  }, [mode, headerHeight, updateActive]);

  useEffect(() => {
    const reset = () => { pointerX.set(0); pointerY.set(0); x.jump(0); y.jump(0); };
    if (!enhanced || !inView) reset();
    const visibility = () => { if (document.hidden) reset(); };
    document.addEventListener('visibilitychange', visibility); window.addEventListener('blur', reset);
    return () => { document.removeEventListener('visibilitychange', visibility); window.removeEventListener('blur', reset); reset(); };
  }, [enhanced, inView, pointerX, pointerY, x, y]);
  useEffect(() => { if (!enhanced) setReady(false); }, [enhanced]);
  const sceneReady = useCallback(() => setReady(true), []);
  const sceneError = useCallback(() => { setReady(false); setFailed(true); }, []);
  useEffect(() => {
    if (!enhanced) return;
    let current = true;
    import('./PortraitScene').then(module => { if (current) setScene(() => module.default); }).catch(() => { if (current) sceneError(); });
    return () => { current = false; };
  }, [enhanced, sceneError]);

  return <section ref={hero} className="people-hero" id="a-gente" aria-label="A gente"
    data-mode={enhanced ? 'scroll' : mode} data-motion-mode={mode} data-renderer={enhanced && ready ? 'three' : 'html'} data-introduced={introduced && mode !== 'static'}>
    <div className="hero-sticky section-shell" onPointerMove={event => {
      if (!enhanced || event.pointerType !== 'mouse') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 22); pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 14);
    }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <div ref={story} className="people-story"><div className="people-stage">
        <div className="people-viewport"><div className="people-list">
          {teamMembers.map((member, index) => <PersonCard key={member.id} member={member} index={index} active={active === index} mode={mode} progress={mobileProgress} onReady={portraitReady} onError={portraitError} />)}
        </div>
          {enhanced && Scene && <div className="scene-container"><motion.div className="scene-parallax" style={{ x, y }}><Scene portraits={portraits} progress={desktopProgress} onReady={sceneReady} onError={sceneError} /></motion.div></div>}
        </div>
        {(enhanced || mode === 'mobile-story') && <PortraitProgress progress={progress} active={active} />}
        <div className="hero-bottom"><a className="hero-project-link" href="#trabalho">Conheça o que fazemos <Arrow /></a><div className="hero-actions"><span className="hero-scroll-note">Role para conhecer a gente <span aria-hidden="true">↓</span></span><a className="button button-primary" href={href} target="_blank" rel="noopener noreferrer">{cta}<Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a></div></div>
      </div></div>
    </div>
  </section>;
}
