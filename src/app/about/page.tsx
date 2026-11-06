import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a Codice — web design e tecnologia em Sinop',
  description: 'Sobre a Codice, estúdio de web design e tecnologia em Sinop, Mato Grosso: quem faz parte do time, o pacote de entrada e o que tem orçamento separado.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main id="conteudo" className="section-shell">
      <p><a className="text-link" href="/">Voltar para o início</a></p>
      <h1>Sobre a Codice</h1>
      <p>
        A Codice é um estúdio de web design e tecnologia sediado em Sinop, Mato Grosso. Fazemos sites e sistemas
        sob medida, consultoria e assistência técnica para negócios da região que precisam apresentar seus
        serviços, organizar o trabalho e facilitar o contato com clientes. O time é formado por Fernando Riad,
        Eduardo Gobatto, Victor Rafael e Jose Vitor.
      </p>
      <p>
        Trabalhamos com escopo combinado na proposta, prazo definido e entrega publicada nas contas de domínio e
        hospedagem do cliente. Cada projeto é tratado de forma individual, com textos organizados e apresentação
        personalizada, sem depender de templates genéricos.
      </p>
      <p>
        O pacote de entrada é um site profissional de uma página, com até seis seções. Software personalizado,
        consultoria e assistência técnica para computadores e equipamentos de rede têm orçamento separado.
      </p>
    </main>
  );
}