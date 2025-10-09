'use client';

import React, { useEffect, useState } from 'react';

const MunicipiosSelect: React.FC<MunicipiosSelectProps> = ({ onSelect }) => {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/26/municipios');
        const data = await response.json();
        setMunicipios(data);
      } catch (error) {
        console.error('Erro ao buscar municípios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMunicipios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const selectedMunicipio = municipios.find(m => m.id === selectedId);
    if (selectedMunicipio) {
      onSelect(selectedMunicipio);
    }
  };

  if (loading) return <p>Carregando municípios...</p>;

  return (
    <select onChange={handleChange} defaultValue="" className='border-2 border-black rounded-md p-2 w-full'>
      <option value="" disabled>Selecione um município</option>
      {municipios.map((municipio) => (
        <option key={municipio.id} value={municipio.id}>
          {municipio.nome}
        </option>
      ))}
    </select>
  );
};

export default MunicipiosSelect;
