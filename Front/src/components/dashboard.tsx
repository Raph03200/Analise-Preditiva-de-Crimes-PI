'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Dado = {
  regiao: string;
  resposta_modelo: string;
};

export default function RegiaoChart() {
  const [dados, setDados] = useState<Dado[]>([]);

  useEffect(() => {
    fetch('/api/predicoes')
      .then(res => res.json())
      .then(data => setDados(data));
  }, []);

  // Agrupa por região e calcula a média de porcentagem
  const regioesMap = new Map<string, number[]>();

  dados.forEach(({ regiao, resposta_modelo }) => {
    const porcentagem = parseInt(resposta_modelo.replace('%', ''), 10);
    if (!regioesMap.has(regiao)) {
      regioesMap.set(regiao, []);
    }
    regioesMap.get(regiao)!.push(porcentagem);
  });

  const labels = Array.from(regioesMap.keys());
  const valores = Array.from(regioesMap.values()).map(arr => {
    const soma = arr.reduce((a, b) => a + b, 0);
    return soma / arr.length;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Média de Resposta por Região (%)',
        data: valores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
}
