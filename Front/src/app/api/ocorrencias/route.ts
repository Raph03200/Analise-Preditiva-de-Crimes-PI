import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import pool from '@/services/db';

// Tipo auxiliar
type MapaMunicipios = Record<string, string>;

// Função para carregar o CSV de município -> região
async function carregarMapaMunicipios(): Promise<MapaMunicipios> {
  const mapa: MapaMunicipios = {};
  const filePath = path.join(process.cwd(), 'public', 'municipios_regioes.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        mapa[row.municipio.trim()] = row.regiao.trim();
      })
      .on('end', () => resolve(mapa))
      .on('error', reject);
  });
}

// POST: Insere uma ocorrência
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jogo, genero, resposta_modelo, municipio } = body;

    if (!jogo || !genero || !resposta_modelo || !municipio) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    // Carrega o mapa de municípios -> regiões
    const mapa = await carregarMapaMunicipios();
    const regiao = mapa[municipio.trim()];

    if (!regiao) {
      return NextResponse.json({ error: 'Município não encontrado no CSV de regiões' }, { status: 400 });
    }

    const dataAtual = new Date().toISOString();

    // Insere no banco
    await pool.query(`
      INSERT INTO ocorrencias (jogo, genero, resposta_modelo, municipio, regiao, data)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [jogo, genero, resposta_modelo, municipio, regiao, dataAtual]);

    return NextResponse.json({ message: 'Ocorrência registrada com sucesso!' });
  } catch (err) {
    console.error('Erro ao processar POST:', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
