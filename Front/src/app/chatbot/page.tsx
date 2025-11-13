import ChatInterface from "@/components/ChatInterface"
import { Header } from "@/components/Header"

const Page = () => {
    return(
        <div>
            <Header />

            <div className="py-10">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Assistente de Análise de Dados
                </h1>
                <p className="text-center text-gray-700 mb-8">
                    Converse com a IA para obter insights sobre as ocorrências
                </p>
                
                <ChatInterface />
            </div>
        </div>
    )
}

export default Page
