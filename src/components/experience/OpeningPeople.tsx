'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { openingContent, openingPeople } from '../../data/opening';
import { Arrow } from './Arrow';
import { counterLabel, cycleIndex, personLabel, ringOffset } from './openingState';

type PeopleState = {
  active: number;
  /** False on the server and before hydration: the selector is then visible but inert. */
  hydrated: boolean;
  select: (index: number) => void;
  next: () => void;
};

const PeopleContext = createContext<PeopleState | null>(null);
const count = openingPeople.length;

function usePeople() {
  const state = useContext(PeopleContext);
  if (!state) throw new Error('Opening people parts must render inside OpeningPeopleProvider.');
  return state;
}

const noSubscription = () => () => {};
const useHydrated = () => useSyncExternalStore(noSubscription, () => true, () => false);

/**
 * One selection shared by the dots, the glass circle and the story avatars. The selection
 * advances on its own after a short interval, but yields to reduced motion and stops being
 * announced as a manual control until hydration.
 */
export function OpeningPeopleProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const hydrated = useHydrated();
  const select = useCallback((index: number) => setActive(cycleIndex(index, 0, count)), []);
  const next = useCallback(() => setActive(current => cycleIndex(current, 1, count)), []);
  useEffect(() => {
    if (!hydrated) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    const intervalId = window.setInterval(() => {
      setActive(current => cycleIndex(current, 1, count));
    }, 4500);
    return () => window.clearInterval(intervalId);
  }, [hydrated]);
  const value = useMemo<PeopleState>(() => ({ active, hydrated, select, next }), [active, hydrated, select, next]);
  return <PeopleContext value={value}>{children}</PeopleContext>;
}

export function OpeningDots() {
  const { active, hydrated, select } = usePeople();
  // Hidden (not disabled) until hydration: the space stays reserved, nothing is focusable or announced.
  return <div className="opening-dots" data-live={hydrated} role="group" aria-label={openingContent.people.label}>
    {openingPeople.map((person, index) => <button key={person.id} type="button" className="opening-dot"
      data-active={index === active} aria-pressed={index === active} aria-label={person.name}
      tabIndex={hydrated ? undefined : -1} onClick={() => select(index)}><span aria-hidden="true" /></button>)}
  </div>;
}

/** The face, the count and the ring all belong to the selected person. */
export function OpeningCircle() {
  const { active, hydrated, next } = usePeople();
  const person = openingPeople[active];
  const inner = <>
    <svg className="circle-ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle className="ring-track" cx="50" cy="50" r="47" pathLength={1} />
      <circle className="ring-arc" cx="50" cy="50" r="47" pathLength={1} />
    </svg>
    <span className="circle-faces" aria-hidden="true">
      {openingPeople.map((item, index) => <img key={item.id} src={item.portrait.src} alt="" width={item.portrait.width}
        height={item.portrait.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" draggable={false}
        data-active={index === active} />)}
    </span>
    <span className="circle-count" aria-hidden="true">{counterLabel(active, count)}</span>
    <span className="circle-arrow" aria-hidden="true"><Arrow /></span>
  </>;
  const style = { '--ring-offset': ringOffset(active, count) } as CSSProperties;
  // Without script the circle is a plain element: a button that cannot act would be a dead control.
  return <div className="tile tile-circle">
    {hydrated
      ? <button type="button" className="opening-circle" onClick={next} aria-label={`${counterLabel(active, count)} · Mostrar o próximo sócio`} style={style}>{inner}</button>
      : <div className="opening-circle" style={style}>{inner}</div>}
    <p className="opening-founder" aria-hidden="true"><strong>{person.name}</strong><span>{person.role}</span></p>
    <p className="sr-only" aria-live="polite">{personLabel(person, active, count)}</p>
  </div>;
}

export function OpeningStoryAvatars() {
  const { active } = usePeople();
  return <span className="story-avatars" aria-hidden="true">
    {openingPeople.map((person, index) => <img key={person.id} src={person.portrait.src} alt="" width={person.portrait.width}
      height={person.portrait.height} loading="lazy" decoding="async" draggable={false} data-active={index === active} />)}
  </span>;
}
