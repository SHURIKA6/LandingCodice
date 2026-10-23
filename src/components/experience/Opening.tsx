import { preconnect, preload } from 'react-dom';
import { HERO_MEDIA_ORIGIN, HERO_PLATE_URL, heroPlate, openingContent as content } from '../../data/opening';
import { Arrow } from './Arrow';
import { GitHubIcon, PinIcon, WhatsAppIcon } from './Icons';
import { OpeningAnchor } from './OpeningAnchor';
import { OpeningCircle, OpeningDots, OpeningPeopleProvider, OpeningStoryAvatars } from './OpeningPeople';
import { OpeningMediaProvider, OpeningPauseButton, OpeningVideo } from './OpeningMedia';
import { OpeningSculpture } from './OpeningSculpture';
import { OpeningBackdrop } from './OpeningBackdrop';
import './opening.css';

/**
 * First screen. The HTML is complete on its own: the plate, the headline, the four tiles, the
 * story and every contact. JavaScript only adds the looping video and the founder selector.
 * DOM order is the reading and tabbing order on every breakpoint, so nothing is reordered with CSS.
 */
export function Opening() {
  // The plate is the largest paint of the page and lives on another origin.
  preconnect(HERO_MEDIA_ORIGIN);
  preload(HERO_PLATE_URL, { as: 'image', fetchPriority: 'high' });

  return <section id="inicio" className="opening" aria-labelledby="hero-title">
    <OpeningAnchor />
    <OpeningMediaProvider>
      <div className="opening-media" aria-hidden="true">
        <OpeningBackdrop>
        <img className="opening-plate" src={HERO_PLATE_URL} width={heroPlate.width} height={heroPlate.height}
          alt="" decoding="async" fetchPriority="high" />
        <OpeningVideo />
        </OpeningBackdrop>
        <div className="opening-scrim" />
      </div>
      <OpeningPeopleProvider>
        <div className="opening-stage">
          <p className="opening-status"><PinIcon />{content.status}</p>

          <div className="opening-lede">
            <OpeningDots />
            <p className="eyebrow opening-eyebrow"><span className="status-dot" />{content.eyebrow}</p>
            <h1 id="hero-title" className="opening-title">
              {content.headline.map((line, index) => <span key={line}>
                <span className="opening-line" data-outline={index === content.headline.length - 1}><span>{line}</span></span>{' '}
              </span>)}
            </h1>
          </div>

          <div className="opening-cta">
            <span className="opening-rule" aria-hidden="true" />
            <a className="button button-primary opening-button" href={content.cta.href} target="_blank" rel="noopener noreferrer">
              {content.cta.label}<Arrow diagonal /><span className="sr-only"> (abre em outra aba)</span>
            </a>
          </div>

          <div className="opening-cluster">
            <div className="tile tile-system">
              <p className="tile-eyebrow">{content.system.eyebrow}</p>
              <div>
                <p className="tile-title"><span>{content.system.title[0]}</span> <span>{content.system.title[1]}</span></p>
                <p className="tile-text">{content.system.text}</p>
              </div>
            </div>
            <div className="tile tile-edition">
              <p className="tile-eyebrow">{content.edition.note}</p>
              <p className="tile-title"><span>{content.edition.title[0]}</span> <span>{content.edition.title[1]}</span></p>
              <div className="tile-sculpture"><OpeningSculpture /></div>
            </div>
            <OpeningCircle />
            <div className="tile tile-project">
              <img src={content.project.image.src} alt={content.project.image.alt} width={content.project.image.width}
                height={content.project.image.height} loading="lazy" decoding="async" />
              <div className="tile-project-copy">
                <p className="tile-eyebrow">{content.project.label}</p>
                <a className="tile-project-link" href={content.project.href}>{content.project.link}<Arrow diagonal /></a>
              </div>
            </div>
          </div>

          <div className="opening-story">
            <div className="story-head"><OpeningStoryAvatars /><p className="story-title">{content.story.title}</p></div>
            <p className="story-text">{content.story.text}</p>
            <a className="text-link story-link" href={content.story.href}>{content.story.link}<Arrow /></a>
          </div>

          <div className="opening-aside">
            <OpeningPauseButton />
            <div className="opening-contacts">
              <p className="opening-contacts-label">{content.contactLabel}</p>
              <ul>
                {content.contacts.map(contact => <li key={contact.id}>
                  <a className="contact-icon" href={contact.href} target="_blank" rel="noopener noreferrer" data-first={contact.id === 'whatsapp-fernando'}>
                    {contact.kind === 'github' ? <GitHubIcon /> : <WhatsAppIcon />}
                    <span className="sr-only">{contact.name} (abre em outra aba)</span>
                  </a>
                </li>)}
              </ul>
            </div>
          </div>
        </div>
      </OpeningPeopleProvider>
    </OpeningMediaProvider>
  </section>;
}
