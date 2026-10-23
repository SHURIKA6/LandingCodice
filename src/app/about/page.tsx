import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a Codice — estúdio de sites em Sinop',
  description: 'Codice é um estúdio em Sinop, Mato Grosso, que cria sites profissionais de uma página para negócios locais.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main id="conteudo" className="section-shell">
      <h1>Sobre a Codice</h1>
      <p>
        A Codice é um estúdio de desenvolvimento web sediado em Sinop, Mato Grosso. Criamos sites profissionais
        de uma página para negócios locais que precisam apresentar seus serviços, mostrar seu trabalho e facilitar
        o contato com clientes. O time é formado por Fernando Riad, Eduardo Gobatto, Victor Rafael e Jose Vitor.
      </p>
      <p>
        Trabalhamos com escopo combinado na proposta, prazo definido e entrega publicada nas contas de domínio e
        hospedagem do cliente. Cada projeto é tratado de forma individual, com textos organizados e apresentação
        personalizada, sem depender de templates genéricos.
      </p>
      <p>
        Além de sites de apresentação, também conversamos sobre sistemas e automações, com orçamento separado.
        O foco é ajudar negócios a aparecerem bem na internet e a transformarem visitas em conversas.
      </p>
    </main>
  );
}