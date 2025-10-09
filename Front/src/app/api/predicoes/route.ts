import pool from '@/services/db';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const result = await pool.query(`
      SELECT regiao, resposta_modelo FROM ocorrencias
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}
