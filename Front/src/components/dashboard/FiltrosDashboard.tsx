'use client';

type FiltrosDashboardProps = {
  anoInicio: string;
  anoFim: string;
  regiaoFiltro: string;
  generoFiltro: string;
  regioes: string[];
  generos: string[];
  onAnoInicioChange: (valor: string) => void;
  onAnoFimChange: (valor: string) => void;
  onRegiaoChange: (valor: string) => void;
  onGeneroChange: (valor: string) => void;
  onAplicarFiltros: () => void;
};

export default function FiltrosDashboard({
  anoInicio,
  anoFim,
  regiaoFiltro,
  generoFiltro,
  regioes,
  generos,
  onAnoInicioChange,
  onAnoFimChange,
  onRegiaoChange,
  onGeneroChange,
  onAplicarFiltros,
}: FiltrosDashboardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ano Início
          </label>
          <input
            type="number"
            min="2004"
            max="2025"
            value={anoInicio}
            onChange={(e) => onAnoInicioChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ano Fim
          </label>
          <input
            type="number"
            min="2004"
            max="2025"
            value={anoFim}
            onChange={(e) => onAnoFimChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Região
          </label>
          <select
            value={regiaoFiltro}
            onChange={(e) => onRegiaoChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="TODAS">Todas</option>
            {regioes.map((r: string) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gênero
          </label>
          <select
            value={generoFiltro}
            onChange={(e) => onGeneroChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="TODOS">Todos</option>
            {generos.map((g: string) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onAplicarFiltros}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}
