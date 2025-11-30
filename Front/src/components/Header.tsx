'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export const Header = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return(
        <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <img 
                            src="./policia-pe.png" 
                            alt="Polícia Civil de Pernambuco" 
                            className="h-16 w-auto transition-transform group-hover:scale-105"
                        />
                        <div className="hidden md:block">
                            <h1 className="text-xl font-bold text-gray-900">Sistema de Análise Preditiva</h1>
                            <p className="text-sm text-gray-600">Polícia Civil de Pernambuco</p>
                        </div>
                    </Link>

                    <nav>
                        <ul className="flex items-center gap-1">
                            <li>
                                <Link 
                                    href="/"
                                    className={`px-4 py-2 font-medium transition ${
                                        isActive('/') 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Previsão
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    href="/mapa"
                                    className={`px-4 py-2 font-medium transition ${
                                        isActive('/mapa') 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Mapa
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    href="/paineis"
                                    className={`px-4 py-2 font-medium transition ${
                                        isActive('/paineis') 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Painéis
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    href="/chatbot"
                                    className={`px-4 py-2 font-medium transition ${
                                        isActive('/chatbot') 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Assistente
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}