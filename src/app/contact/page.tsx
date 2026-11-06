import { landing } from '../../data/landing';
import { siteContent, whatsappUrl } from '../../data/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato — Codice',
  description: 'Fale com a Codice pelo WhatsApp. Contatos diretos de Fernando, Eduardo, Victor e Jose Vitor.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main id="conteudo" className="section-shell">
      <p><a className="text-link" href="/">Voltar para o início</a></p>
      <h1>Contato</h1>
      <p>
        A próxima conversa pode ser a sua. Somos Fernando, Eduardo, Victor e Jose Vitor, da Codice, em Sinop.
        Conte o que o seu negócio precisa e combinamos escopo, prazo e valores na proposta.
      </p>
      <ul>
        {siteContent.founders.map(founder => (
          <li key={founder.id}>
            <strong>{founder.name}</strong> —{' '}
            <a href={whatsappUrl(founder.whatsappNumber, landing.contactMessage)} target="_blank" rel="noopener noreferrer">
              {founder.phoneLabel}<span className="sr-only"> pelo WhatsApp (abre em outra aba)</span>
            </a>
            {founder.githubHref && (
              <>
                {' '}
                <a href={founder.githubHref} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> de {founder.name} (abre em outra aba)</span></a>
              </>
            )}
          </li>
        ))}
      </ul>
      <p>Sinop, Mato Grosso, Brasil.</p>
    </main>
  );
}