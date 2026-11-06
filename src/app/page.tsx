import { landing } from '../data/landing';
import { siteOffer as offer } from '../data/offer';
import { siteContent, whatsappUrl } from '../data/site';
import { teamMembers } from '../data/team';
import { Header } from '../components/experience/Header';
import { Hero } from '../components/experience/Hero';
import { Opening } from '../components/experience/Opening';
import { ServicePanels } from '../components/experience/ServicePanels';
import { ProjectStage } from '../components/experience/ProjectStage';
import { Arrow } from '../components/experience/Arrow';
import { MotionChapter } from '../components/experience/MotionChapter';
import { ScrollFrame } from '../components/experience/ScrollFrame';

export default function Home() {
  const corretor = landing.project;
  const roger = siteContent.projects.find(project => project.id === 'roger')!;
  const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Codice',
    url: siteUrl,
    description: landing.description,
    logo: `${siteUrl}/brand-people.svg`,
    sameAs: ['https://github.com/SHURIKA6', 'https://github.com/Edu4rdo-Gobatto', 'https://github.com/vict0r-rafael', 'https://github.com/JoseVitor-net'],
    founder: landing.founders.map(person => ({ '@type': 'Person', name: person.name, sameAs: person.githubHref })),
    member: teamMembers.map(person => ({ '@type': 'Person', name: person.name })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-66-99935-6646',
      contactType: 'customer service',
      availableLanguage: ['Portuguese'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sinop',
      addressRegion: 'Mato Grosso',
      addressCountry: 'BR',
    },
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Codice',
    alternateName: 'Codice Web Design',
    url: siteUrl,
    description: landing.description,
    inLanguage: 'pt-BR',
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, '\\u003c') }} />
    <Header contactHref={landing.contactHref} />
    <main id="conteudo" tabIndex={-1}>
      <Opening />
      <Hero />
      <MotionChapter className="services-section" id="servico" labelledBy="servico-title"><div className="section-shell">
        <div className="section-heading" data-reveal="heading"><p className="eyebrow">O que a gente faz</p><h2 id="servico-title">Quatro soluções<br />para o seu <em>negócio.</em></h2><p>Tudo combinado por escrito antes de começar.</p></div>
        <ServicePanels />
      </div></MotionChapter>
      <MotionChapter className="work-section" id="trabalho" labelledBy="work-title"><div className="section-shell">
        <div className="section-heading" data-reveal="heading"><p className="eyebrow">Projetos selecionados</p><h2 id="work-title">Sites e sistemas<br />que já <em>construímos.</em></h2><p>Um site e sistema imobiliário com catálogo e área de gestão, e um site de demonstração para um negócio local.</p></div>
        <article className="corretor-case" aria-labelledby="corretor-title">
          <div className="case-heading" data-reveal="copy"><p className="case-label">{corretor.title}</p><h3 id="corretor-title">{corretor.category}</h3><p className="case-tagline">Por fora, apresenta. Por dentro, organiza.</p><span className="project-status">Projeto desenvolvido</span></div>
          <div className="case-details" data-reveal="copy"><p>{corretor.description}</p><ul className="feature-list">{corretor.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
          <ProjectStage links={corretor.publicLinks ? { demoHref: corretor.href, repositoryHref: corretor.repositoryHref } : undefined} />
        </article>
        <article className="roger-case" aria-labelledby="roger-title">
          <div className="roger-copy" data-reveal="copy"><p className="eyebrow">Presença digital / negócio local</p><h3 id="roger-title">Roger<br />Estética<br /><em>Automotiva.</em></h3><span className="project-status">Projeto demonstrativo de portfólio</span><p>{roger.description}</p><p className="case-scope">Criado para uma proposta que não foi contratada. Uma demonstração do nosso trabalho, sem alegações de resultados comerciais.</p><ul className="feature-list">{roger.features.map(feature => <li key={feature}>{feature}</li>)}</ul>{roger.publicLinks && <div className="case-links"><a className="text-link" href={roger.href} target="_blank" rel="noopener noreferrer">Ver demonstração <Arrow direction="external" /><span className="sr-only"> do Roger Estética Automotiva (abre em outra aba)</span></a><a className="text-link" href={roger.repositoryHref} target="_blank" rel="noopener noreferrer">Ver no GitHub <Arrow direction="external" /><span className="sr-only"> o código do Roger Estética Automotiva (abre em outra aba)</span></a></div>}</div>
          <ScrollFrame kind="roger"><figure className="roger-media"><div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>Roger</span></div><img src={roger.image.src} alt={roger.image.alt} width="1440" height="900" loading="lazy" /><figcaption>Captura da interface</figcaption></figure></ScrollFrame>
        </article>
      </div></MotionChapter>
      <MotionChapter className="package-section" id="pacote" labelledBy="package-title"><div className="section-shell">
        <div className="package-grid"><div className="package-summary"><div className="package-heading" data-reveal="heading"><p className="eyebrow">Site profissional</p><h2 id="package-title">Seu negócio tem<br />o que <em>mostrar.</em></h2><p>{offer.headline}</p></div><div className="package-gloss" data-reveal="copy"><p className="package-label"><span>Site de uma página /</span> <span>até seis seções</span></p><p className="payment">Escopo e valores combinados na proposta, de acordo com o que seu negócio precisa.</p></div><a className="button button-primary" href={offer.href} target="_blank" rel="noopener noreferrer">{offer.cta}<Arrow direction="external" /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a><div className="package-more"><p>Precisa de um sistema ou de uma automação? A gente também pode conversar, com orçamento separado.</p><a className="text-link" href="#servico">Ver soluções<Arrow /></a></div></div>
          <div className="package-details"><h3 data-reveal="copy">O que vai com o seu site</h3><ul>{offer.inclusions.map((item, index) => <li key={item} data-reveal="inclusion" data-delay={Math.floor(index / 2) * 90}><span className="package-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul><div className="package-conditions" data-reveal="copy"><h4>Os combinados</h4>{offer.conditions.map(condition => <p key={condition}>{condition}</p>)}</div></div>
        </div>
        <div className="process"><p className="eyebrow">Como acontece</p><h3>Da primeira conversa<br />ao site no ar.</h3><ol>{landing.process.map((step, index) => <li key={step.title} data-reveal="process"><span className="process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h4>{step.title}</h4><p>{step.text}</p></li>)}</ol></div>
        <p className="authorial-note">A experiência visual da Codice é autoral. O pacote usa uma estrutura reaproveitável, com apresentação personalizada e escopo combinado na proposta.</p>
      </div></MotionChapter>
      <MotionChapter className="contact-section" id="contato" labelledBy="contact-title"><div className="section-shell">
        <div className="contact-heading" data-reveal="heading"><p className="eyebrow">Pessoas. Ideias. Trabalho.</p><h2 id="contact-title">Vamos fazer<br /><em>acontecer?</em></h2><p>Somos Fernando, Eduardo, Victor e Jose Vitor, da Codice, em Sinop.<br />Conte o que o seu negócio precisa.</p></div>
        <div className="founders">{landing.founders.map(founder => <article className="founder" key={founder.id}><h3>{founder.name}</h3><a className="founder-contact" href={whatsappUrl(founder.whatsappNumber, landing.contactMessage)} target="_blank" rel="noopener noreferrer"><span>Falar com {founder.name.split(' ')[0]}<small>{founder.phoneLabel}</small></span><Arrow direction="external" /><span className="sr-only"> pelo WhatsApp (abre em outra aba)</span></a>{founder.githubHref && <a className="text-link founder-github" href={founder.githubHref} target="_blank" rel="noopener noreferrer">Trabalhos no GitHub <Arrow direction="external" /><span className="sr-only"> (abre em outra aba)</span></a>}</article>)}</div>
        <div className="footer-word" data-reveal="word" aria-hidden="true" translate="no">codice</div>
        <footer className="colophon"><a href="#inicio">De volta ao início <Arrow direction="up" /></a><a href="/docs">Documentação e API <Arrow /></a><p>Sinop, Mato Grosso</p><small>© {new Date().getFullYear()} Codice</small></footer>
      </div></MotionChapter>
    </main>
  </>;
}
