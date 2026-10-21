'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { ComponentType } from 'react';
import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { teamMembers } from '../../data/team';
import type { TeamMember } from '../../data/team';
import { Arrow } from './Arrow';
import { useReducedPreference } from './useReducedPreference';
import type { PortraitSceneProps } from './PortraitScene';

const desktopQuery = '(min-width: 1024px)';
const subscribeDesktop = (listener: () => void) => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
};
const desktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const serverDesktop = () => false;
const portraits = teamMembers.map(member => member.portrait.src);

function PersonCard({ member, index, active }: { member: TeamMember; index: number; active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.12 });
  return <article ref={ref} className="person-card" data-active={active} data-entered={entered} aria-labelledby={`person-${member.id}`}>
    <div className="person-copy"><p className="person-kicker">Prazer, <span aria-hidden="true">{String(index + 1).padStart(2, '0')} / 03</span></p><h2 className="person-name" id={`person-${member.id}`} aria-label={member.name}><span><span>{member.firstName}</span></span>{' '}<span><span>{member.lastName}<i aria-hidden="true">.</i></span></span></h2><p className="person-signature">Gente que faz a Codice.</p></div>
    <figure className="person-portrait"><img src={member.portrait.src} alt={member.portrait.alt} width={member.portrait.width} height={member.portrait.height} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false" /><figcaption>Codice / {member.firstName}</figcaption></figure>
  </article>;
}

function PortraitProgress({ progress, active }: { progress: MotionValue<number>; active: number }) {
  return <div className="portrait-progress" aria-hidden="true">
    <div className="portrait-progress-track"><motion.span style={{ scaleX: progress }} /></div>
    <div className="portrait-progress-names">{teamMembers.map((member, index) => <span key={member.id} data-active={active === index}>{member.firstName}</span>)}</div>
  </div>;
}

export function Hero({ href, cta }: { href: string; cta: string }) {
  const story = useRef<HTMLElement>(null);
  const desktop = useSyncExternalStore(subscribeDesktop, desktopSnapshot, serverDesktop);
  const reduce = useReducedPreference();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [Scene, setScene] = useState<ComponentType<PortraitSceneProps> | null>(null);
  const [introduced, setIntroduced] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 24, restDelta: .05 });
  const y = useSpring(pointerY, { stiffness: 90, damping: 24, restDelta: .05 });
  const inView = useInView(story);
  const enhanced = desktop && !reduce && !failed;
  useEffect(() => { setIntroduced(true); }, []);
  useEffect(() => {
    const reset = () => { pointerX.set(0); pointerY.set(0); x.jump(0); y.jump(0); };
    if (!enhanced || !inView) reset();
    const visibility = () => { if (document.hidden) reset(); };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', reset);
    return () => { document.removeEventListener('visibilitychange', visibility); window.removeEventListener('blur', reset); reset(); };
  }, [enhanced, inView, pointerX, pointerY, x, y]);
  useEffect(() => { if (!enhanced) setReady(false); }, [enhanced]);
  const { scrollYProgress } = useScroll({ target: story, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', value => {
    setActive(Math.round(Math.max(0, Math.min(1, value)) * (teamMembers.length - 1)));
  });
  const sceneReady = useCallback(() => setReady(true), []);
  const sceneError = useCallback(() => { setReady(false); setFailed(true); }, []);
  useEffect(() => {
    if (!enhanced) return;
    let current = true;
    // Import after hydration so an optional chunk cannot block the HTML page.
    import('./PortraitScene').then(module => {
      if (current) setScene(() => module.default);
    }).catch(() => { if (current) sceneError(); });
    return () => { current = false; };
  }, [enhanced, sceneError]);

  return <section ref={story} className="people-hero" id="inicio" aria-labelledby="hero-title"
    data-mode={enhanced ? 'scroll' : 'static'} data-renderer={enhanced && ready ? 'three' : 'html'} data-mobile-motion={!desktop && !reduce} data-introduced={introduced && !reduce}>
    <div className="hero-sticky section-shell" onPointerMove={event => {
      if (!enhanced || event.pointerType !== 'mouse') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 22);
      pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 14);
    }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <div className="hero-intro">
        <div><p className="eyebrow"><span className="status-dot" /> De Sinop. Perto da sua ideia.</p><h1 id="hero-title"><span className="title-line"><span>Tecnologia feita</span></span><span className="title-line"><span>por <em>gente.</em></span></span></h1></div>
        <div className="hero-description"><p>Somos Fernando, Eduardo e Victor.<br />Criamos sites para colocar o seu<br className="desktop-break" /> negócio em evidência.</p><a className="hero-skip" href="#trabalho">Ver projetos <Arrow diagonal /></a></div>
      </div>
      <div className="people-viewport">
        <div className="people-list">
          {teamMembers.map((member, index) => <PersonCard key={member.id} member={member} index={index} active={active === index} />)}
        </div>
        {enhanced && Scene && <div className="scene-container"><motion.div className="scene-parallax" style={{ x, y }}><Scene portraits={portraits} progress={scrollYProgress} onReady={sceneReady} onError={sceneError} /></motion.div></div>}
      </div>
      {enhanced && <PortraitProgress progress={scrollYProgress} active={active} />}
      <div className="hero-bottom"><a className="hero-project-link" href="#trabalho">Conheça o que fazemos <Arrow /></a><div className="hero-actions"><span className="hero-scroll-note">Role para conhecer a gente <span aria-hidden="true">↓</span></span><a className="button button-primary" href={href} target="_blank" rel="noopener noreferrer">{cta}<Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a></div></div>
    </div>
  </section>;
}
