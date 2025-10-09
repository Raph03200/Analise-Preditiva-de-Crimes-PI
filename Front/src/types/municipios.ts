interface Municipio {
    id: number;
    nome: string;
}

interface MunicipiosSelectProps {
    onSelect: (municipio: Municipio) => void;
}