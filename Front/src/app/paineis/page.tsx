import RegiaoChart from "@/components/dashboard"
import { Header } from "@/components/Header"

const Page = () => {
    return(
        <div>
            <Header />

            <div 
                className="max-w-6xl mx-auto p-20"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Comparativo de Regiões por Porcentagem</h1>
                <RegiaoChart />
            </div>

        </div>
    )
}

export default Page