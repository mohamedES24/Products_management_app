import { Link } from "react-router-dom";

function Home() {
    return(
        <div className="h-screen flex flex-col justify-center items-center space-y-4">
            <img
                src="https://webimages.mongodb.com/_com_assets/cms/lvp611gcqbn2dkxgi-blob-1.svg?auto=format%252Ccompress"
                alt="Background"
                className="absolute inset-0 object-cover w-full h-full z-negative "
            />
        <Link 
            to="/products" 
            className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-green-700 hover:rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
            Show All Product List
        </Link>
        </div>  
    ) 
  }
  
export default Home;
  