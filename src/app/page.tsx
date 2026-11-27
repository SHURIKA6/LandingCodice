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
  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Codice',
    alternateName: 'Codice Web Design',
    url: siteUrl,
    description: landing.description,
    slogan: 'Programadores em Mato Grosso: sites, sistemas e suporte.',
    logo: `${siteUrl}/brand-people.svg`,
    image: `${siteUrl}/media/codice-share-v1.png`,
    priceRange: '$$',
    telephone: '+55-66-99935-6646',
    sameAs: ['https://github.com/SHURIKA6', 'https://github.com/Edu4rdo-Gobatto', 'https://github.com/vict0r-rafael', 'https://github.com/JoseVitor-net'],
    founder: landing.founders.map(person => ({ '@type': 'Person', name: person.name, sameAs: person.githubHref })),
    member: teamMembers.map(person => ({ '@type': 'Person', name: person.name })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-66-99935-6646',
      contactType: 'customer service',
      availableLanguage: ['Portuguese'],
      areaServed: 'BR-MT',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sinop',
      addressRegion: 'Mato Grosso',
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'State',
      name: 'Mato Grosso',
      containedInPlace: { '@type': 'Country', name: 'Brasil' },
    },
    knowsAbout: ['Programação', 'Desenvolvimento de sites', 'Desenvolvimento de sistemas', 'Web design', 'Manutenção de computadores', 'Manutenção de notebooks', 'Manutenção de redes', 'Consultoria em tecnologia'],
  };
  const faq = [
    {
      question: 'Vocês são programadores? O que a Codice faz?',
      answer: 'Sim. A Codice é um estúdio de programação e web design em Sinop, com devs e programadores que atendem todo o Mato Grosso: sites e sistemas sob medida, consultoria e manutenção de PCs, notebooks e redes. O pacote de entrada é um site de uma página com até seis seções; software personalizado, consultoria e assistência têm orçamento separado.',
    },
    {
      question: 'Vocês atendem onde?',
      answer: 'Somos de Sinop, Mato Grosso, e atendemos todo o estado, com atendimento remoto pelo WhatsApp. O escopo, o prazo e os valores são combinados na proposta, antes de começar.',
    },
    {
      question: 'O que vai com o meu site?',
      answer: 'Uma página com até seis seções, adaptada ao celular e ao computador, com textos organizados a partir de um briefing, fotos e informações reais do seu negócio, WhatsApp, localização e metadados básicos, uma rodada consolidada de alterações, além da configuração e publicação do site.',
    },
    {
      question: 'Quanto custa e qual é o prazo?',
      answer: 'Escopo e valores são combinados na proposta, de acordo com o que o seu negócio precisa. Domínio e eventual hospedagem são pagos à parte, nas suas próprias contas. O prazo é combinado na proposta, conforme os materiais e a agenda.',
    },
    {
      question: 'Vocês consertam computador, notebook e rede?',
      answer: 'Sim. Fazemos manutenção e conserto de PCs, notebooks e equipamentos de rede, com orçamento separado do site. Chame no WhatsApp, conte o defeito e combinamos o atendimento.',
    },
    {
      question: 'Como começo?',
      answer: 'Chame no WhatsApp e conte o que o seu negócio precisa. A conversa é assim: escopo e proposta, entrada e materiais, criação e revisão, aprovação e publicação do site nas suas contas de domínio e hospedagem.',
    },
  ] as const;
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Da primeira conversa ao site no ar',
    description: 'Como a Codice combina escopo, cria e publica o site.',
    step: landing.process.map(step => ({ '@type': 'HowToStep', name: step.title, text: step.text })),
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo).replace(/</g, '\\u003c') }} />
    <Header contactHref={landing.contactHref} />
    <main id="conteudo" tabIndex={-1}>
      <Opening />
      <Hero />
      <MotionChapter className="services-section" id="servico" labelledBy="servico-title"><div className="section-shell">
        <div className="section-heading" data-reveal="heading"><p className="eyebrow">O que a gente faz</p><h2 id="servico-title">Quatro soluções<br />para o seu <em>negócio.</em></h2><p>Tudo combinado por escrito antes de começar.</p></div>
        <ServicePanels />
      </div></MotionChapter>
      <MotionChapter className="work-section" id="trabalho" labelledBy="work-title"><div className="section-shell">
        <div className="section-heading" data-reveal="heading"><p className="eyebrow">Projetos selecionados</p><h2 id="work-title">Sites e sistemas<br />que já <em>construímos.</em></h2><p>Sistema imobiliário com catálogo e área de gestão, e um site de demonstração para um negócio local.</p></div>
        {/* Owner, 06/11/2026: the words beside the capture in both cases, one on each side, with one label pattern:
            category, name, status, description, tags, links. The words come first in the DOM; CSS sets the sides.
            The links sit outside .case-copy-text because MotionChapter never animates a block that holds a control:
            the Corretor's entrance survives the return of its links, and Roger's words stay still, as they were. */}
        <article className="case corretor-case" aria-labelledby="corretor-title">
          <div className="case-copy"><div className="case-copy-text" data-reveal="copy"><p className="eyebrow">{corretor.category}</p><h3 id="corretor-title">{corretor.title}<span className="case-dot">.</span></h3><p className="case-tagline">Por fora, apresenta. Por dentro, organiza.</p><span className="project-status">Projeto desenvolvido</span><p className="case-description">{corretor.description}</p><ul className="feature-list">{corretor.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>{corretor.publicLinks && <div className="case-links"><a className="text-link" href={corretor.href} target="_blank" rel="noopener noreferrer">Ver demonstração <Arrow direction="external" /><span className="sr-only"> do Corretor (abre em outra aba)</span></a><a className="text-link" href={corretor.repositoryHref} target="_blank" rel="noopener noreferrer">Ver no GitHub <Arrow direction="external" /><span className="sr-only"> o código do Corretor (abre em outra aba)</span></a></div>}</div>
          <ProjectStage />
        </article>
        <article className="case roger-case" aria-labelledby="roger-title">
          <div className="case-copy"><div className="case-copy-text"><p className="eyebrow">{roger.category}</p><h3 id="roger-title">Roger<br />Estética<br /><em>Automotiva.</em></h3><span className="project-status">Projeto demonstrativo de portfólio</span><p className="case-description">{roger.description}</p><p className="case-scope">Criado para uma proposta que não foi contratada. Uma demonstração do nosso trabalho, sem alegações de resultados comerciais.</p><ul className="feature-list">{roger.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>{roger.publicLinks && <div className="case-links"><a className="text-link" href={roger.href} target="_blank" rel="noopener noreferrer">Ver demonstração <Arrow direction="external" /><span className="sr-only"> do Roger Estética Automotiva (abre em outra aba)</span></a><a className="text-link" href={roger.repositoryHref} target="_blank" rel="noopener noreferrer">Ver no GitHub <Arrow direction="external" /><span className="sr-only"> o código do Roger Estética Automotiva (abre em outra aba)</span></a></div>}</div>
          <ScrollFrame kind="roger"><figure className="roger-media"><div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>Roger</span></div><img src={roger.image.src} alt={roger.image.alt} width="1440" height="900" loading="lazy" /><figcaption>Captura da interface</figcaption></figure></ScrollFrame>
        </article>
      </div></MotionChapter>
      <MotionChapter className="package-section" id="pacote" labelledBy="package-title"><div className="section-shell">
        <div className="package-grid"><div className="package-summary"><div className="package-heading" data-reveal="heading"><p className="eyebrow">Site profissional</p><h2 id="package-title">Seu negócio tem<br />o que <em>mostrar.</em></h2><p>{offer.headline}</p></div><div className="package-gloss" data-reveal="copy"><p className="package-label"><span>Site de uma página /</span> <span>até seis seções</span></p><p className="payment">Escopo e valores combinados na proposta, de acordo com o que seu negócio precisa.</p></div><a className="button button-primary" href={offer.href} target="_blank" rel="noopener noreferrer">{offer.cta}<Arrow direction="external" /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a><div className="package-more"><p>Precisa de um sistema para organizar o trabalho? Orçamento separado, combinado na proposta.</p><a className="text-link" href={whatsappUrl(siteContent.founders[0].whatsappNumber, 'Olá! Quero conversar sobre um sistema sob medida com a Codice.')} target="_blank" rel="noopener noreferrer">Conversar sobre um sistema<Arrow direction="external" /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a></div></div>
          <div className="package-details"><h3 data-reveal="copy">O que vai com o seu site</h3><ul>{offer.inclusions.map((item, index) => <li key={item} data-reveal="inclusion" data-delay={index * 40}><span className="package-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
            {/* Owner, 06/11/2026: "Os combinados" is hidden for a test; the owner finds it unnecessary. Delete it, or restore it, once decided.
            <div className="package-conditions" data-reveal="copy"><h4>Os combinados</h4>{offer.conditions.map(condition => <p key={condition}>{condition}</p>)}</div> */}
          </div>
        </div>
        <div className="process"><p className="eyebrow">Como acontece</p><h3>Da primeira conversa<br />ao site no ar.</h3><ol>{landing.process.map((step, index) => <li key={step.title} data-reveal="process"><span className="process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h4>{step.title}</h4><p>{step.text}</p></li>)}</ol></div>
        <p className="authorial-note">A experiência visual da Codice é autoral. O pacote usa uma estrutura reaproveitável, com apresentação personalizada e escopo combinado na proposta.</p>
      </div></MotionChapter>
      <MotionChapter className="faq-section" id="faq" labelledBy="faq-title"><div className="section-shell">
        <div className="section-heading" data-reveal="heading"><p className="eyebrow">Perguntas frequentes</p><h2 id="faq-title">Dúvidas<br />respondidas <em>direto.</em></h2><p>Respostas curtas sobre escopo, valores, prazo, atendimento em MT e conserto.</p></div>
        <div className="faq-list">
          {faq.map(item => <details className="faq-item" key={item.question} name="faq"><summary>{item.question}<Arrow direction="down" /><span className="sr-only"> (expandir resposta)</span></summary><p>{item.answer}</p></details>)}
        </div>
      </div></MotionChapter>
      <MotionChapter className="contact-section" id="contato" labelledBy="contact-title"><div className="section-shell">
        <div className="contact-heading" data-reveal="heading"><p className="eyebrow">Pessoas. Ideias. Trabalho.</p><h2 id="contact-title">Vamos fazer<br /><em>acontecer?</em></h2><p>Somos Fernando, Eduardo, Victor e Jose Vitor, da Codice, em Sinop.<br />Conte o que o seu negócio precisa.</p></div>
        <div className="founders">{landing.founders.map(founder => <article className="founder" key={founder.id}><h3>{founder.name}</h3><a className="founder-contact" href={whatsappUrl(founder.whatsappNumber, landing.contactMessage)} target="_blank" rel="noopener noreferrer"><span>Falar com {founder.name.split(' ')[0]}<small>{founder.phoneLabel}</small></span><Arrow direction="external" /><span className="sr-only"> pelo WhatsApp (abre em outra aba)</span></a>{founder.githubHref && <a className="text-link founder-github" href={founder.githubHref} target="_blank" rel="noopener noreferrer">Trabalhos no GitHub <Arrow direction="external" /><span className="sr-only"> (abre em outra aba)</span></a>}</article>)}</div>
        <div className="footer-word" data-reveal="word" aria-hidden="true" translate="no">codice</div>
        <footer className="colophon"><a href="#inicio">De volta ao início <Arrow direction="up" /></a><a href="#faq">Perguntas frequentes <Arrow /></a><a href="/docs">Documentação e API <Arrow /></a><p>Sinop, Mato Grosso — atendemos todo o MT</p><small>© {new Date().getFullYear()} Codice</small></footer>
      </div></MotionChapter>
    </main>
  </>;
}
