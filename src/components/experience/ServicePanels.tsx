'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useMotionMode } from './useMotionMode';
import { useLargeText } from './useLargeText';
import { scrollPageTo } from './scrollEngine';
import { getMobileStoryFrame, mobileStoryStops } from './mobilePortraitMotion';
import { Arrow } from './Arrow';
import { teamMembers } from '../../data/team';
import { services, servicesClosing } from '../../data/services';
import type { ServicePanel } from '../../data/services';
import './service-panels.css';

/** flow: the reading list (server HTML, reduced motion, enlarged text, landscape); desktop: the 500vh
 *  fade-through; story: phones in portrait, where the services change with the scroll the way the
 *  portraits of #a-gente do (owner, 06/11/2026). */
type Stage = 'flow' | 'desktop' | 'story';

const STOP_COUNT = services.length + 1; // desktop: panels + closing stop
const CLOSING = services.length;
/** The phone stage replays the portraits' own transition (mobilePortraitMotion.ts): one hold per service. */
const STORY_SHARED = services.length === teamMembers.length;

/** The stop whose layer is the visible one at this stage progress (panels fade through, never overlap). */
const stopAt = (progress: number) => Math.min(CLOSING, Math.max(0, Math.floor(progress * STOP_COUNT)));
/** Where each stop rests fully visible: the middle of a panel's window, the closing's final hold. */
const restingProgress = (stop: number) => stop === CLOSING ? .95 : (stop + .5) / STOP_COUNT;

function memberById(id: ServicePanel['memberId']) {
  return teamMembers.find(member => member.id === id)!;
}

function ServicePanelItem({ service, index, progress, storyProgress, stage, active }: {
  service: ServicePanel;
  index: number;
  progress: MotionValue<number>;
  storyProgress: MotionValue<number>;
  stage: Stage;
  active: boolean;
}) {
  const member = memberById(service.memberId);
  const repository = service.repository;
  const total = STOP_COUNT;
  const start = index / total;
  const end = (index + 1) / total;
  const enterEnd = start + (end - start) * 0.26;
  const exitStart = start + (end - start) * 0.74;
  const dir = service.side === 'left' ? -1 : 1;

  const first = index === 0;
  const opacityIn = first ? 1 : 0;
  const xIn = first ? 0 : dir * 48;

  const opacity = useTransform(progress, [start, enterEnd, exitStart, end], [opacityIn, 1, 1, 0]);
  const mediaX = useTransform(progress, [start, enterEnd, exitStart, end], [xIn, 0, 0, dir * 48]);
  const textX = useTransform(progress, [start, enterEnd, exitStart, end], [-xIn * 0.6, 0, 0, -dir * 28]);
  const textOpacity = useTransform(progress, [start, enterEnd, exitStart, end], [opacityIn, 1, 1, 0]);

  // Phones: the capture travels like a portrait, the words like a name inside its mask.
  const pose = useTransform(storyProgress, value => getMobileStoryFrame(value).panels[index]);
  const storyX = useTransform(pose, value => `${value.xPercent}%`);
  const storyY = useTransform(pose, value => `${value.yPercent}%`);
  const storyScale = useTransform(pose, value => value.scale);
  const storyRotate = useTransform(pose, value => value.rotation);
  const storyOpacity = useTransform(pose, value => value.opacity);
  const copyY = useTransform(pose, value => `${value.nameYPercent}%`);
  const copyOpacity = useTransform(pose, value => value.nameOpacity);
  const zIndex = useTransform(pose, value => value.zIndex);

  const desktop = stage === 'desktop';
  const story = stage === 'story';
  return (
    <motion.article className="service-panel" data-side={service.side} data-stop={index} data-active={active}
      aria-labelledby={`service-${service.id}`} style={desktop ? { opacity, x: 0 } : story ? { zIndex } : undefined}>
      <motion.div className="service-panel-media"
        style={desktop ? { x: mediaX } : story ? { x: storyX, y: storyY, scale: storyScale, rotate: storyRotate, opacity: storyOpacity } : undefined}>
        <img src={repository.print.src} alt={repository.print.alt} width={repository.print.width} height={repository.print.height} loading="lazy" decoding="async" draggable={false} />
      </motion.div>
      <div className="service-panel-copy-mask">
        <motion.div className="service-panel-body" style={desktop ? { x: textX, opacity: textOpacity } : story ? { y: copyY, opacity: copyOpacity } : undefined}>
          <h3 id={`service-${service.id}`} className="service-panel-kicker">{service.kicker}</h3>
          <p className="service-panel-phrase">{service.phrase}</p>
          <p className="service-panel-signature">{member.name}</p>
          {service.scope && <p className="service-panel-scope">{service.scope.text}{service.scope.link && <>
            {' '}<a className="text-link service-panel-scope-link" href={service.scope.link.href}>{service.scope.link.label}<Arrow /></a>
          </>}</p>}
          <a className="text-link service-panel-repo" href={repository.url} target="_blank" rel="noopener noreferrer">
            Ver no GitHub<Arrow direction="external" /><span className="sr-only"> o repositório {repository.repo} (abre em outra aba)</span>
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ServiceClosing({ progress, enhanced, active }: { progress: MotionValue<number>; enhanced: boolean; active: boolean }) {
  const start = services.length / STOP_COUNT;
  const opacity = useTransform(progress, [start, start + 0.1, 1], [0, 1, 1]);
  return (
    <motion.div className="service-panels-closing" data-stop={CLOSING} data-active={active} style={enhanced ? { opacity } : undefined}>
      <p className="service-panels-closing-phrase">{servicesClosing}</p>
      <a className="text-link service-panels-closing-link" href="#trabalho">Ver projetos<Arrow /></a>
    </motion.div>
  );
}

/** The portraits' stepper, drawn for the services: one stop per service, filled by the scroll. */
function ServiceProgress({ progress, active }: { progress: MotionValue<number>; active: number }) {
  return <div className="service-progress" aria-hidden="true">
    <div className="service-progress-track"><motion.span style={{ scaleX: progress }} /></div>
    <div className="service-progress-stops">{services.map((service, index) => <span key={service.id} data-reached={active >= index} />)}</div>
  </div>;
}

export function ServicePanels() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const mode = useMotionMode();
  const largeText = useLargeText();
  const [header, setHeader] = useState(72);
  const [storyFits, setStoryFits] = useState(true);
  // Enlarged text needs the reading flow: a pinned stage would clip it.
  const stage: Stage = largeText ? 'flow'
    : mode === 'desktop' ? 'desktop'
      : mode === 'mobile-story' && STORY_SHARED && storyFits ? 'story' : 'flow';
  const enhanced = stage === 'desktop';
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // Like the portraits: the phone stage starts when its track reaches the bottom of the header.
  const { scrollYProgress: storyProgress } = useScroll({ target: track, offset: [header >= 80 ? 'start 80px' : 'start 72px', 'end end'] });
  const [active, setActive] = useState(0);
  const stageRef = useRef<Stage>(stage);
  useEffect(() => { stageRef.current = stage; }, [stage]);

  // When the visitor scrolls a focused control's stop away, its layer fades out: release the focus,
  // as the browser does for a control that becomes hidden. Tab resumes from the same place.
  const release = useCallback((stop: number) => {
    const root = section.current;
    const focused = document.activeElement;
    if (!root || !(focused instanceof HTMLElement) || !root.contains(focused)) return;
    const layer = focused.closest<HTMLElement>('.service-panels-viewport [data-stop]');
    if (layer && Number(layer.dataset.stop) !== stop) focused.blur();
  }, []);
  const syncDesktop = useCallback((value: number) => {
    if (stageRef.current !== 'desktop') return;
    const stop = stopAt(value);
    setActive(stop); release(stop);
  }, [release]);
  const syncStory = useCallback((value: number) => {
    if (stageRef.current !== 'story') return;
    const stop = getMobileStoryFrame(value).activeIndex;
    setActive(stop); release(stop);
  }, [release]);
  useMotionValueEvent(scrollYProgress, 'change', syncDesktop);
  useMotionValueEvent(storyProgress, 'change', syncStory);
  useEffect(() => {
    if (stage === 'desktop') syncDesktop(scrollYProgress.get());
    else if (stage === 'story') syncStory(storyProgress.get());
  }, [stage, scrollYProgress, storyProgress, syncDesktop, syncStory]);

  useEffect(() => {
    const bar = document.querySelector('.site-header');
    if (!bar) return;
    const measure = () => setHeader(Math.round(bar.getBoundingClientRect().height) || 72);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  // A capture and words that outgrow the phone composition fall back to the reading flow, as the
  // portraits do. Layout boxes only (offsetHeight ignores the travel transforms).
  useLayoutEffect(() => {
    const root = section.current;
    if (stage !== 'story' || !root) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const overflowing = [...root.querySelectorAll<HTMLElement>('.service-panels-viewport > .service-panel')].some(panel => {
        const media = panel.querySelector<HTMLElement>('.service-panel-media');
        const mask = panel.querySelector<HTMLElement>('.service-panel-copy-mask');
        if (!media || !mask) return false;
        const gap = parseFloat(getComputedStyle(panel).rowGap) || 0;
        return media.offsetHeight + gap + mask.offsetHeight > panel.clientHeight + 1;
      });
      if (overflowing) setStoryFits(false);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    const observer = new ResizeObserver(schedule);
    root.querySelectorAll('.service-panels-viewport > .service-panel, .service-panel-body').forEach(node => observer.observe(node));
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [stage]);
  // A new width is a new composition: the phone stage gets another try.
  useEffect(() => {
    let width = innerWidth;
    const resize = () => { if (innerWidth !== width) { width = innerWidth; setStoryFits(true); } };
    addEventListener('resize', resize, { passive: true });
    return () => removeEventListener('resize', resize);
  }, []);

  // Every layer stays in the tab order. A control reached from the keyboard brings its own stop
  // forward at once, through the page's scroll engine, so the focused control is never invisible and
  // two stops never show together. A pointer press also focuses a link, but it is already on the
  // visible stop: moving the page under it would drop the click, so only keyboard focus moves it.
  useEffect(() => {
    const root = section.current;
    if (!root || (stage !== 'desktop' && stage !== 'story')) return;
    const reveal = (event: FocusEvent) => {
      const control = event.target as Element | null;
      if (!control || !control.matches(':focus-visible')) return;
      const layer = control.closest<HTMLElement>('.service-panels-viewport [data-stop]');
      if (!layer || !root.contains(layer)) return;
      const stop = Number(layer.dataset.stop);
      let target: number;
      if (stage === 'story') {
        const node = track.current;
        if (!node || stop >= services.length) return;
        const top = node.getBoundingClientRect().top + scrollY - header;
        target = top + Math.max(0, node.offsetHeight - (innerHeight - header)) * mobileStoryStops()[stop];
      } else {
        const top = root.getBoundingClientRect().top + scrollY;
        target = top + Math.max(0, root.offsetHeight - innerHeight) * restingProgress(stop);
      }
      setActive(stop);
      if (Math.abs(scrollY - target) > 1) scrollPageTo(target, { immediate: true });
    };
    root.addEventListener('focusin', reveal);
    return () => root.removeEventListener('focusin', reveal);
  }, [stage, header]);

  const story = stage === 'story';
  return (
    <div ref={section} className="service-panels" data-enhanced={enhanced} data-stage={stage}>
      <div ref={track} className="service-panels-track">
        <div className="service-panels-viewport">
          {services.map((service, index) => (
            <ServicePanelItem key={service.id} service={service} index={index} progress={scrollYProgress} storyProgress={storyProgress} stage={stage} active={active === index} />
          ))}
          {!story && <ServiceClosing progress={scrollYProgress} enhanced={enhanced} active={active === CLOSING} />}
          {story && <ServiceProgress progress={storyProgress} active={active} />}
        </div>
      </div>
      {/* On phones the closing follows the stage in the reading flow. */}
      {story && <ServiceClosing progress={scrollYProgress} enhanced={false} active />}
    </div>
  );
}
