import { preload } from 'react-dom';
import { openingContent as content, openingPhoto } from '../../data/opening';
import { Arrow } from './Arrow';
import { OpeningAnchor } from './OpeningAnchor';
import { OpeningBackdrop } from './OpeningBackdrop';
import { OpeningSculpture } from './OpeningSculpture';
import { openingVisual } from './openingState';
import './opening.css';

/**
 * First screen (#inicio), rebuilt on 05/11/2026 as one composed block: the eyebrow, the headline, one
 * sentence naming what Codice does and where, one WhatsApp button and one text link, beside a single
 * visual. The visual is the owner's team photo once `openingPhoto` is set, and the blue sculpture until
 * then. The HTML is complete without script; the motion is the headline's finite rise, the sculpture's
 * arrival, scroll arc and pointer layers, and the photo's travel inside its stable frame.
 * The visual comes first in the DOM (it sits above the words on phones); every control follows in
 * reading order.
 */
export function Opening() {
  const photo = openingVisual(openingPhoto);
  // Same-origin only: openingVisual refuses any other source.
  if (photo) preload(photo.src, { as: 'image', fetchPriority: 'high' });

  return <section id="inicio" className="opening" aria-labelledby="hero-title" data-visual={photo ? 'photo' : 'sculpture'}>
    <OpeningAnchor />
    <div className="opening-stage section-shell">
      <div className="opening-visual">
        {photo
          ? <div className="opening-photo-frame">
            <OpeningBackdrop>
              <img className="opening-photo" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
                style={{ objectPosition: photo.objectPosition }} decoding="async" fetchPriority="high" />
            </OpeningBackdrop>
          </div>
          : <div className="opening-sculpture"><OpeningSculpture priority /></div>}
      </div>

      <div className="opening-copy">
        {photo && <div className="opening-mark"><OpeningSculpture /></div>}
        <p className="eyebrow opening-eyebrow">{content.eyebrow}</p>
        <h1 id="hero-title" className="opening-title">
          {content.headline.map((line, index) => <span key={line}>
            <span className="opening-line" data-accent={index === content.headline.length - 1}><span>{line}</span></span>{' '}
          </span>)}
        </h1>
        <p className="opening-lede">{content.lede}</p>
        <div className="opening-actions">
          <a className="button button-primary opening-button" href={content.cta.href} target="_blank" rel="noopener noreferrer">
            {content.cta.label}<Arrow direction="external" /><span className="sr-only"> (abre em outra aba)</span>
          </a>
          <a className="text-link opening-link" href={content.secondary.href}>{content.secondary.label}<Arrow /></a>
        </div>
      </div>
    </div>
  </section>;
}
