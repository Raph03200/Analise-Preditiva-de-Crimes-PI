from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

app = FastAPI()

modelo = joblib.load('modelo_crimes.pkl')

COLUNAS_MODELO = ['teve_jogo', 'final_semana', 'qtd_jogos', 'mes', 'ano', 'TOTAL_DE_VITIMAS']  # ajuste aqui

class DadosEntrada(BaseModel):
    teve_jogo: int
    final_semana: int
    qtd_jogos: int
    mes: int
    ano: int
    TOTAL_DE_VITIMAS: float
@app.post("/prever")
def prever_crimes(dados: DadosEntrada):
    try:
        dados_dict = dados.dict()
        print("Dados recebidos:", dados_dict)

        entrada_df = pd.DataFrame([dados_dict])
        entrada_df = entrada_df[COLUNAS_MODELO]

        pred = modelo.predict(entrada_df)[0]
        print("Predição:", pred)

        max_esperado = 50
        valor_normalizado = pred / max_esperado
        probabilidade = 1 / (1 + np.exp(-valor_normalizado * 10))

        print(f"Probabilidade calculada: {probabilidade * 100:.2f}%")

        return {
            "predicao": pred,
            "probabilidade_vitimas": probabilidade * 100
        }

    except Exception as e:
        return {"error": str(e)}
