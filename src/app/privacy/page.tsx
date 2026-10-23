import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacidade — Codice',
  description: 'Política de privacidade da Codice: como tratamos dados de contato e informações enviadas pelos visitantes.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main id="conteudo" className="section-shell">
      <h1>Privacidade</h1>
      <p>
        A Codice respeita a privacidade dos visitantes deste site. Coletamos apenas as informações que você envia
        voluntariamente ao entrar em contato pelo WhatsApp ou por outros canais, como nome, telefone e detalhes do
        seu negócio, para responder à sua solicitação e elaborar uma proposta.
      </p>
      <p>
        Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing. Os dados podem
        ser armazenados em nossos canais de comunicação e usados somente para atendimento, proposta e execução do
        serviço contratado.
      </p>
      <p>
        Este site pode utilizar hospedagem e infraestrutura de terceiros, que podem registrar informações técnicas
        padrão, como endereço IP e tipo de navegador, para fins de segurança e funcionamento. Ao continuar
        navegando, você concorda com este tratamento. Para dúvidas sobre privacidade, entre em contato pelos
        canais listados na página de contato.
      </p>
    </main>
  );
}