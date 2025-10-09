'use client'

import MunicipiosSelect from "@/components/municipioSelect";
import { useState } from "react";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

const Page = () => {

    const handleMunicipioSelect = (municipio: { id: number; nome: string }) => {
        console.log('Selecionado:', municipio);
    };

    const [gender, setGender] = useState<"male" | "female" | null>(null)
    const [game, setGame] = useState<boolean | null>(null)
    const [resultado, setResultado] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGame(e.target.value == 'sim' ? true : false);
    };

    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // setLoading(true)

        // setTimeout(() => {
        //     setResultado(Math.floor(Math.random() * 100))
        //     setLoading(false)
        // }, 1500)
        
        const response = await fetch('http://localhost:8000/prever', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teve_jogo: game ? 1 : 0,
                qtd_jogos: 1,
                final_semana: 1,
                mes: 10,
                ano: 2021,
                TOTAL_DE_VITIMAS: 0.0
            })
        });

        const data = await response.json()
        console.log(data)
        setResultado(data.probabilidade_vitimas.toFixed(2))

        // await fetch('/api/ocorrencias', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         jogo: game ? 'T' : 'f',
        //         genero: gender === 'male' ? 'M' : 'F',
        //         resposta_modelo: `${resultado}%`,
        //         municipio: MunicipiosSelect,
        //     })
        // });
    }

    return(
        <div 
            className="bg-blue-400 h-screen w-screen flex justify-center items-center bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: 'url(https://carsughi.uol.com.br/wp-content/uploads/2022/12/lendario-rei-do-futebol-pele-morre-aos-82-anos.jpg)' }}
        >
            <div className="bg-white rounded-lg shadow-lg p-5 md:min-w-[350px]">
                <h1 className="mb-3 text-center text-xl font-bold">Eu irei jogar com o Pelé?</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
                    <input 
                        type="text" 
                        placeholder="Indique o mês"
                        className="bg-none outline-0 rounded-md border-2 border-black w-full p-1"
                    />

                    <MunicipiosSelect onSelect={handleMunicipioSelect}/>

                    <input 
                        type="text" 
                        placeholder="Indique o Ano"
                        className="bg-none outline-0 rounded-md border-2 border-black w-full p-1"
                    />

                    <div className="text-left w-full">
                        Seu gênero:
                        <div className="flex items-center gap-5 text-center w-full justify-center mt-4">
                            <BsGenderMale 
                                className={`text-2xl cursor-pointer font-bold ${gender === 'male' ? 'text-blue-400' : 'text-blue-200'}`}
                                onClick={() => setGender('male')}
                                
                            />
                            <BsGenderFemale 
                                className={`text-2xl cursor-pointer font-bold ${gender === 'female' ? 'text-pink-400' : 'text-pink-200'}`}
                                onClick={() => setGender('female')}
                            />
                        </div>
                    </div>

                    <div className="text-left w-full">
                        Tem jogo?
                        <div className="flex items-center gap-5 text-center w-full justify-center mt-4">
                            <label>
                                <input
                                    type="radio"
                                    name="simnao"
                                    value="sim"
                                    checked={game === true}
                                    onChange={handleChange}
                                />
                                    Sim
                            </label>

                            <label >
                                <input
                                    type="radio"
                                    name="simnao"
                                    value="nao"
                                    checked={game === false}
                                    onChange={handleChange}
                                />
                                    Não
                            </label>
                        </div>
                    </div>

                    <button className="bg-blue-600 text-white mt-4 px-2 py-1 rounded-md cursor-pointer">Enviar</button>
                </form>

                <div className="text-center text-2xl mt-3" >
                        
                    {resultado &&
                        resultado+ '% de chance de ver ele'
                    }
                    {loading &&
                        <p>Carregando...</p>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Page