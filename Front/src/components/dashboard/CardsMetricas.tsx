'use client';

type CardsMetricasProps = {
  total: number;
  anoInicio: string;
  anoFim: string;
  totalMunicipios: number;
  totalRegioes: number;
};

export default function CardsMetricas({
  total,
  anoInicio,
  anoFim,
  totalMunicipios,
  totalRegioes,
}: CardsMetricasProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Total de Registros</p>
        <p className="text-3xl font-bold text-blue-600">
          {total.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Período</p>
        <p className="text-3xl font-bold text-green-600">
          {anoInicio}-{anoFim}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Municípios</p>
        <p className="text-3xl font-bold text-purple-600">{totalMunicipios}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Regiões</p>
        <p className="text-3xl font-bold text-orange-600">{totalRegioes}</p>
      </div>
    </div>
  );
}
