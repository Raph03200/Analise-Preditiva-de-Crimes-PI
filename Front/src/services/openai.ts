type MensagemChat = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function enviarMensagemParaIA(mensagem: string, contexto: string) {
  try {
    const resposta = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensagem,
        contexto
      })
    });

    if (!resposta.ok) {
      throw new Error('Erro ao enviar mensagem');
    }

    const dados = await resposta.json();
    return dados.resposta;
  } catch (erro) {
    console.error('Erro ao comunicar com IA:', erro);
    throw erro;
  }
}
