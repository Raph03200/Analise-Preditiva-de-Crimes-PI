'use client'

import GetDate from "@/components/GetDate"
import { Header } from "@/components/Header"
import dynamic from "next/dynamic"
import { useState } from "react"

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

const Page = () => {
    const now = new Date()
    const [month, setMonth] = useState(now.getMonth())
    const [year, setYear] = useState(now.getFullYear())

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Mapa de Calor - Pernambuco
                    </h1>
                    <p className="text-lg text-gray-600">
                        Visualização geográfica de ocorrências por município
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <div className="mb-6">
                        <GetDate 
                            selectedMonth={month}
                            selectedYear={year}
                            onChange={(newMonth, newYear) => {
                                setMonth(newMonth)
                                setYear(newYear)
                            }}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Período selecionado:</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {monthNames[month]} de {year}
                                </p>
                            </div>
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                    <span className="text-gray-700">Sem ocorrências</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                                    <span className="text-gray-700">1-5</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-400 rounded"></div>
                                    <span className="text-gray-700">5-15</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-700 rounded"></div>
                                    <span className="text-gray-700">15+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[600px] w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner">
                        <DynamicMap year={year} month={month}/>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">💡 Dica:</span> Clique em um município no mapa para ver detalhes das ocorrências.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page