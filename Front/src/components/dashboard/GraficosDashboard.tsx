'use client';

import { Line, Bar, Pie } from 'react-chartjs-2';

type DadosGraficos = {
  porAno: Array<{ ano: number; total: number }>;
  topMunicipios: Array<{ municipio: string; total: number }>;
  porRegiao: Array<{ regiao: string; total: number }>;
  porGenero: Array<{ genero: string; total: number }>;
  comJogo: Array<{ tipo: string; total: number }>;
};

type GraficosDashboardProps = {
  dados: DadosGraficos;
};

export default function GraficosDashboard({ dados }: GraficosDashboardProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Evolução Temporal
          </h3>
          <Line
            data={{
              labels: dados.porAno.map((d) => d.ano),
              datasets: [
                {
                  label: 'Crimes por Ano',
                  data: dados.porAno.map((d) => d.total),
                  borderColor: '#3B82F6',
                  backgroundColor: '#3B82F61A',
                  tension: 0.4,
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Top 10 Municípios
          </h3>
          <Bar
            data={{
              labels: dados.topMunicipios.map((d) => d.municipio),
              datasets: [
                {
                  label: 'Total de Crimes',
                  data: dados.topMunicipios.map((d) => d.total),
                  backgroundColor: '#EF444499',
                  borderColor: '#EF4444',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              indexAxis: 'y',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Por Região</h3>
          <Pie
            data={{
              labels: dados.porRegiao.map((d) => d.regiao),
              datasets: [
                {
                  data: dados.porRegiao.map((d) => d.total),
                  backgroundColor: [
                    '#3B82F699',
                    '#10B98199',
                    '#F59E0B99',
                    '#EF444499',
                    '#8B5CF699',
                  ],
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Por Gênero</h3>
          <Pie
            data={{
              labels: dados.porGenero.map((d) => d.genero),
              datasets: [
                {
                  data: dados.porGenero.map((d) => d.total),
                  backgroundColor: [
                    '#3B82F699',
                    '#EC489999',
                    '#9CA3AF99',
                  ],
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Jogos do Brasileirão
          </h3>
          <Pie
            data={{
              labels: dados.comJogo.map((d) => d.tipo),
              datasets: [
                {
                  data: dados.comJogo.map((d) => d.total),
                  backgroundColor: [
                    '#10B98199',
                    '#EF444499',
                  ],
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
      </div>
    </>
  );
}
