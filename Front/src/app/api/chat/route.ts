import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mensagem, contexto } = await req.json();

      const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Você é um assistente de análise de dados de ocorrências policiais.

REGRAS IMPORTANTES:
- Responda APENAS com base nos dados fornecidos abaixo
- NÃO invente informações ou estatísticas que não estão nos dados
- NÃO mencione tipos de crimes que não aparecem nos dados (roubos, furtos, tráfico, etc)
- Se não souber a resposta com base nos dados, diga que não tem essa informação
- Seja claro, objetivo e use linguagem simples
- Os dados são sobre ocorrências registradas com informações de: região, gênero, se teve jogo de futebol, e probabilidade do modelo

DADOS DISPONÍVEIS:
${contexto}

Responda apenas com base nesses dados reais.`
          },
          {
            role: 'user',
            content: mensagem
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!resposta.ok) {
      throw new Error('Erro na API da OpenAI');
    }

    const dados = await resposta.json();
    const respostaIA = dados.choices[0].message.content;

    return NextResponse.json({ resposta: respostaIA });

  } catch (erro) {
    console.error('Erro no chat:', erro);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}
