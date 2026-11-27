import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a Codice — programadores e web design em Mato Grosso',
  description: 'Sobre a Codice, estúdio de programação e web design em Sinop, MT, atendendo todo o Mato Grosso: quem faz parte do time, o pacote de entrada e o que tem orçamento separado.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main id="conteudo" className="section-shell">
      <p><a className="text-link" href="/">Voltar para o início</a></p>
      <h1>Sobre a Codice</h1>
      <p>
        A Codice é um estúdio de programação e web design sediado em Sinop, Mato Grosso, atendendo todo o estado. Fazemos sites e sistemas
        sob medida com nossos devs e programadores, consultoria e manutenção de PCs, notebooks e redes para negócios que precisam apresentar seus
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