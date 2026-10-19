import { landing } from '../data/landing';
import { siteOffer as offer } from '../data/offer';
import { whatsappUrl } from '../data/site';
import { Header } from '../components/experience/Header';
import { Hero } from '../components/experience/Hero';
import { ProjectStage } from '../components/experience/ProjectStage';
import { Arrow } from '../components/experience/Arrow';

export default function Home() {
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Codice', description: landing.description, ...(process.env.SITE_URL ? { url: process.env.SITE_URL } : {}), founder: landing.founders.map(person => ({ '@type': 'Person', name: person.name, sameAs: person.githubHref })) };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
    <Header contactHref={offer.href} />
    <main id="conteudo" tabIndex={-1}>
      <Hero href={offer.href} price={offer.price} cta={offer.cta} />
      <section className="work-section" id="trabalho" aria-labelledby="work-title"><div className="section-shell">
        <div className="work-heading"><h2 id="work-title">É sobre<br /><span>fazer acontecer.</span></h2><div><p>Um projeto de verdade, feito por nós.</p><p>Site e sistema imobiliário com catálogo, filtros de busca e área de gestão.</p></div></div>
        <ProjectStage repositoryHref={landing.project.repositoryHref} />
        <div className="work-bottom"><h3>Por fora, apresenta.<br />Por dentro, organiza.</h3><p>Além do site público, desenvolvemos a área de gestão imobiliária. Esse sistema tem escopo próprio; o pacote de R$ 1.500 é para um site de apresentação de uma página.</p></div>
      </div></section>
      <section className="package-section" id="pacote" aria-labelledby="package-title"><div className="section-shell">
        <div className="package-top"><h2 id="package-title">Sua próxima<br /><span>boa presença.</span></h2><p>Uma estrutura reaproveitável, com apresentação personalizada para o seu negócio. Sem complicar o que precisa ser simples.</p></div>
        <div className="package-grid"><div className="package-summary"><p className="package-price">{offer.price}</p><p>Um site de uma página.<br />Até seis seções, conforme sua necessidade.</p><p className="section-examples">Apresentação, serviços, trabalhos, sobre, localização e contato.</p><a className="button button-lime" href={offer.href} target="_blank" rel="noopener noreferrer">{offer.cta}<Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a><p className="payment">R$ 750 para iniciar, após acordo de escopo por escrito.<br />R$ 750 após aprovação, antes da publicação.</p></div>
          <div className="package-details"><h3>O que vai com o seu site</h3><ul>{offer.inclusions.slice(1).map(item => <li key={item}><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" /></svg>{item}</li>)}</ul><details className="package-conditions" open><summary>Os combinados, sem letra miúda <span aria-hidden="true">+</span></summary><div>{offer.conditions.map(condition => <p key={condition}>{condition}</p>)}</div></details></div>
        </div>
        <div className="process"><h3>Da conversa ao site no ar.</h3><ol>{landing.process.map((step, index) => <li key={step.title}><span className="process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></li>)}</ol></div>
        <p className="authorial-note">A experiência visual da própria Codice é autoral. O pacote de R$ 1.500 usa uma estrutura reaproveitável, com apresentação personalizada e escopo combinado na proposta.</p>
      </div></section>
      <section className="contact-section" id="contato" aria-labelledby="contact-title"><div className="section-shell">
        <div className="contact-heading"><h2 id="contact-title">Gente que faz.<br /><span>Gente que fala.</span></h2><div><p>Somos Fernando e Eduardo, estudantes de Sistemas de Informação em Sinop.</p><p>Da primeira conversa ao site no ar, você fala diretamente com quem desenvolve. Conte para a gente o que o seu negócio precisa.</p><a className="button button-ink" href={offer.href} target="_blank" rel="noopener noreferrer">{offer.cta}<Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a></div></div>
        <div className="founders">{landing.founders.map(founder => <article className="founder" key={founder.id}><h3>{founder.name}</h3><a className="founder-contact" href={whatsappUrl(founder.whatsappNumber, 'Olá! Quero conversar sobre o site de uma página da Codice, por R$ 1.500.')} target="_blank" rel="noopener noreferrer"><span><strong>Falar com {founder.name.split(' ')[0]}</strong><span>{founder.phoneLabel}</span></span><Arrow diagonal /><span className="sr-only"> pelo WhatsApp (abre em outra aba)</span></a><a className="text-link founder-github" href={founder.githubHref} target="_blank" rel="noopener noreferrer">Trabalhos no GitHub <Arrow diagonal /><span className="sr-only"> (abre em outra aba)</span></a></article>)}</div>
        <p className="other-work">Precisa de um sistema ou de uma automação? A gente também pode conversar, com orçamento separado.</p>
        <div className="footer-word" aria-hidden="true">codice<Arrow diagonal /></div>
        <footer className="colophon"><a href="#inicio">Voltar ao início <Arrow /></a><p>Sinop, Mato Grosso</p><small>© {new Date().getFullYear()} Codice</small></footer>
      </div></section>
    </main>
  </>;
}
