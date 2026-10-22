import { landing } from '../data/landing';
import { siteOffer as offer } from '../data/offer';
import { siteContent, whatsappUrl } from '../data/site';
import { teamMembers } from '../data/team';
import { Header } from '../components/experience/Header';
import { Hero } from '../components/experience/Hero';
import { Opening } from '../components/experience/Opening';
import { ProjectStage } from '../components/experience/ProjectStage';
import { Arrow } from '../components/experience/Arrow';
import { MotionChapter } from '../components/experience/MotionChapter';
import { ScrollFrame } from '../components/experience/ScrollFrame';

export default function Home() {
  const roger = siteContent.projects.find(project => project.id === 'roger')!;
  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Codice', description: landing.description,
    ...(process.env.SITE_URL ? { url: process.env.SITE_URL } : {}),
    founder: landing.founders.map(person => ({ '@type': 'Person', name: person.name, sameAs: person.githubHref })),
    member: teamMembers.map(person => ({ '@type': 'Person', name: person.name })),
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
    <Header contactHref={offer.href} />
    <main id="conteudo" tabIndex={-1}>
      <Opening />
      <Hero href={offer.href} cta={offer.cta} />
      <MotionChapter className="work-section" id="trabalho" labelledBy="work-title"><div className="section-shell">
        <div className="section-heading" data-reveal="heading"><p className="eyebrow">Projetos selecionados <Arrow diagonal /></p><h2 id="work-title">Ideias que saíram<br />da <em>conversa.</em></h2><p>Cada negócio tem seu jeito.<br />O trabalho é fazer isso aparecer.</p></div>
        <article className="corretor-case" aria-labelledby="corretor-title">
          <div className="case-heading" data-reveal="copy"><h3 id="corretor-title">Corretor<span>.</span></h3><div><p>Site e sistema imobiliário</p><span className="project-status">Projeto desenvolvido</span></div></div>
          <ProjectStage repositoryHref={landing.project.repositoryHref} demoHref={landing.project.href} />
          <div className="case-details" data-reveal="copy"><h4>Por fora, apresenta.<br />Por dentro, organiza.</h4><div><p>Um catálogo de imóveis com filtros de busca e uma área de gestão para organizar o trabalho imobiliário.</p><ul className="feature-list"><li>Catálogo de imóveis</li><li>Filtros de busca</li><li>Área de gestão</li></ul><p className="case-scope">O sistema tem escopo próprio. O pacote de R$ 1.500 é para um site de apresentação de uma página.</p></div></div>
        </article>
        <article className="roger-case" aria-labelledby="roger-title">
          <div className="roger-copy" data-reveal="copy"><p className="eyebrow">Presença digital / negócio local</p><h3 id="roger-title">Roger<br />Estética<br /><em>Automotiva.</em></h3><span className="project-status">Projeto demonstrativo de portfólio</span><p>Serviços, informações de atendimento e contato reunidos em uma presença própria para o negócio.</p><p className="case-scope">Criado para uma proposta que não foi contratada. Uma demonstração do nosso trabalho, sem alegações de resultados comerciais.</p><ul className="feature-list"><li>Serviços e galeria</li><li>Contato e localização</li></ul><div className="case-links"><a className="text-link" href={roger.href} target="_blank" rel="noopener noreferrer">Visitar demonstração <Arrow diagonal /><span className="sr-only"> (abre em outra aba)</span></a><a className="text-link" href={roger.repositoryHref} target="_blank" rel="noopener noreferrer">Explorar o código <Arrow diagonal /><span className="sr-only"> no GitHub (abre em outra aba)</span></a></div></div>
          <ScrollFrame kind="roger"><figure className="roger-media"><div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>Roger / projeto demonstrativo</span><Arrow diagonal /></div><img src={roger.image.src} alt={roger.image.alt} width="1440" height="1100" loading="lazy" /><figcaption>Captura da interface · projeto demonstrativo</figcaption></figure></ScrollFrame>
        </article>
      </div></MotionChapter>
      <MotionChapter className="package-section" id="pacote" labelledBy="package-title"><div className="section-shell">
        <div className="section-heading package-heading" data-reveal="heading"><p className="eyebrow">Seu próximo passo</p><h2 id="package-title">Seu negócio tem<br />o que <em>mostrar.</em></h2><p>Um site profissional para apresentar seus serviços e facilitar o contato com seus clientes.</p></div>
        <div className="package-grid"><div className="package-summary"><p className="package-label">Site de uma página / até seis seções</p><p className="package-price" data-reveal="price">{offer.price}<span>pelo seu site</span></p><a className="button button-primary" href={offer.href} target="_blank" rel="noopener noreferrer">{offer.cta}<Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a><p className="payment">R$ 750 para iniciar, após acordo de escopo por escrito.<br />R$ 750 após aprovação, antes da publicação.</p></div>
          <div className="package-details"><h3 data-reveal="copy">O que vai com o seu site</h3><ul>{offer.inclusions.map((item, index) => <li key={item} data-reveal="inclusion" data-delay={Math.floor(index / 3) * 120}><span aria-hidden="true">↗</span>{item}</li>)}</ul><details className="package-conditions" open><summary>Os combinados <span aria-hidden="true">+</span></summary><div>{offer.conditions.map(condition => <p key={condition}>{condition}</p>)}</div></details></div>
        </div>
        <div className="process"><p className="eyebrow">Como acontece</p><h3>Da primeira conversa<br />ao site no ar.</h3><ol>{landing.process.map((step, index) => <li key={step.title} data-reveal="process"><span className="process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h4>{step.title}</h4><p>{step.text}</p></li>)}</ol></div>
        <p className="authorial-note">A experiência visual da Codice é autoral. O pacote de R$ 1.500 usa uma estrutura reaproveitável, com apresentação personalizada e escopo combinado na proposta.</p>
      </div></MotionChapter>
      <MotionChapter className="contact-section" id="contato" labelledBy="contact-title"><div className="section-shell">
        <div className="contact-heading" data-reveal="heading"><p className="eyebrow">A próxima conversa pode ser a sua</p><h2 id="contact-title">Vamos fazer<br /><em>acontecer?</em><Arrow diagonal /></h2><p>Somos Fernando, Eduardo e Victor, da Codice, em Sinop.<br />Conte o que o seu negócio precisa.</p></div>
        <div className="founders">{landing.founders.map(founder => <article className="founder" key={founder.id}><p className="eyebrow">Contato direto</p><h3>{founder.name}</h3><a className="founder-contact" href={whatsappUrl(founder.whatsappNumber, 'Olá! Quero conversar sobre o site de uma página da Codice, por R$ 1.500.')} target="_blank" rel="noopener noreferrer"><span>Falar com {founder.name.split(' ')[0]}<small>{founder.phoneLabel}</small></span><Arrow diagonal /><span className="sr-only"> pelo WhatsApp (abre em outra aba)</span></a><a className="text-link founder-github" href={founder.githubHref} target="_blank" rel="noopener noreferrer">Trabalhos no GitHub <Arrow diagonal /><span className="sr-only"> (abre em outra aba)</span></a></article>)}</div>
        <p className="other-work">Precisa de um sistema ou de uma automação? A gente também pode conversar, com orçamento separado.</p>
        <div className="footer-word" data-reveal="word" aria-hidden="true">codice<span>↗</span></div>
        <footer className="colophon"><a href="#inicio">De volta ao início <Arrow /></a><p>Sinop, Mato Grosso</p><small>© {new Date().getFullYear()} Codice</small></footer>
      </div></MotionChapter>
    </main>
  </>;
}
