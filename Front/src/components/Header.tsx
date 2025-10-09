import Link from "next/link"

export const Header = () => {
    return(
        <header className="w-full bg-gray-200">
            <div className="container flex justify-between items-center mx-auto py-5">
                <img 
                    src="./policia-pe.png" 
                    alt="logo da policia civel" 
                    className="h-auto w-22"
                />

                <nav>
                    <ul className="text-xl flex items-center gap-8">
                        <li className="hover:text-yellow-500">
                            <Link href={'/mapa'}>Mapa</Link>
                        </li>

                        <li className="hover:text-yellow-500">
                            <Link href={'/paineis'}>Dashboards</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}