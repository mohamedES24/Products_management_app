import { Link } from "react-router-dom";

export default function Navigation(){
    return(
        <header className="bg-gray-800 p-4">
    <nav>
        <ul className="flex space-x-4">
            <li>
                <Link 
                    to="/" 
                    className="text-white text-lg hover:text-gray-400 transition-colors duration-300"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link 
                    to="/products" 
                    className="text-white text-lg hover:text-gray-400 transition-colors duration-300"
                >
                    Products
                </Link>
            </li>
        </ul>
    </nav>
</header>

    )
}

