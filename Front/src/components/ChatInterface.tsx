'use client';

import { useState, useEffect, useRef } from 'react';
import { enviarMensagemParaIA } from '@/services/openai';

type Mensagem = {
  tipo: 'usuario' | 'assistente';
  texto: string;
};

export default function ChatInterface() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [inputMensagem, setInputMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [contexto, setContexto] = useState('');
  const chatFimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buscarEstatisticas();
  }, []);

  useEffect(() => {
    chatFimRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const buscarEstatisticas = async () => {
    try {
      const resposta = await fetch('/api/estatisticas');
      const dados = await resposta.json();
      
      const contextoFormatado = `
TOTAL DE OCORRÊNCIAS REGISTRADAS: ${dados.total}

DISTRIBUIÇÃO POR REGIÃO:
${dados.porRegiao.map((r: any) => `- ${r.regiao}: ${r.total} ocorrências`).join('\n')}

DISTRIBUIÇÃO POR GÊNERO DAS VÍTIMAS:
${dados.porGenero.map((g: any) => `- ${g.genero === 'M' ? 'Masculino' : 'Feminino'}: ${g.total} ocorrências`).join('\n')}

RELAÇÃO COM JOGOS DE FUTEBOL:
${dados.porJogo.map((j: any) => `- ${j.tipo}: ${j.total} ocorrências`).join('\n')}

MÉDIA DE PROBABILIDADE DO MODELO POR REGIÃO:
${dados.mediaPorRegiao.map((m: any) => `- ${m.regiao}: ${Number(m.media).toFixed(1)}%`).join('\n')}

OBSERVAÇÃO: Estes são dados de ocorrências de mortes violentas intencionais registradas no sistema.
      `;
      
      setContexto(contextoFormatado);
    } catch (erro) {
      console.error('Erro ao buscar estatísticas:', erro);
    }
  };

  const enviarMensagem = async () => {
    if (!inputMensagem.trim() || carregando) return;

    const novaMensagemUsuario: Mensagem = {
      tipo: 'usuario',
      texto: inputMensagem
    };

    setMensagens(prev => [...prev, novaMensagemUsuario]);
    setInputMensagem('');
    setCarregando(true);

    try {
      const respostaIA = await enviarMensagemParaIA(inputMensagem, contexto);
      
      const novaMensagemAssistente: Mensagem = {
        tipo: 'assistente',
        texto: respostaIA
      };

      setMensagens(prev => [...prev, novaMensagemAssistente]);
    } catch (erro) {
      console.error('Erro ao enviar mensagem:', erro);
      
      const mensagemErro: Mensagem = {
        tipo: 'assistente',
        texto: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.'
      };
      
      setMensagens(prev => [...prev, mensagemErro]);
    } finally {
      setCarregando(false);
    }
  };

  const usarPerguntaSugerida = (pergunta: string) => {
    setInputMensagem(pergunta);
  };

  const perguntasSugeridas = [
    'Qual região tem mais ocorrências?',
    'Tem mais crimes quando tem jogo?',
    'Qual o perfil das vítimas?',
    'Me dê um resumo geral dos dados'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Área de mensagens */}
        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          {mensagens.length === 0 && (
            <div className="text-center text-gray-700 mt-10">
              <p className="text-lg mb-4 font-semibold">Sou seu assistente de análise de dados.</p>
              <p className="text-gray-600">Pergunte-me sobre as ocorrências registradas!</p>
            </div>
          )}

          {mensagens.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.tipo === 'usuario'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.texto}</p>
              </div>
            </div>
          ))}

          {carregando && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 p-3 rounded-lg">
                <p className="text-gray-700">Pensando...</p>
              </div>
            </div>
          )}

          <div ref={chatFimRef} />
        </div>

        {/* Perguntas sugeridas */}
        {mensagens.length === 0 && (
          <div className="p-4 bg-white border-t">
            <p className="text-sm text-gray-700 font-semibold mb-2">Perguntas sugeridas:</p>
            <div className="flex flex-wrap gap-2">
              {perguntasSugeridas.map((pergunta, index) => (
                <button
                  key={index}
                  onClick={() => usarPerguntaSugerida(pergunta)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition text-gray-800"
                >
                  {pergunta}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input de mensagem */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMensagem}
              onChange={(e) => setInputMensagem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua pergunta..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
              disabled={carregando}
            />
            <button
              onClick={enviarMensagem}
              disabled={carregando || !inputMensagem.trim()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
