import { Link } from "react-router-dom"
export default function Error(){
    return(
        <>
        <h1 className="text-3xl font-extrabold text-center text-gray-800 my-10">Are you lost!!</h1>
        <h1 className="text-3xl font-extrabold text-center text-gray-800 my-10">Don't worry, I can show you the way</h1>
        <div className="text-center my-6">
            <Link 
                to="/" 
                className="text-green-500 font-bold text-3xl inline-flex items-center hover:underline"
            >
                Home <span className="ml-2">→</span>
            </Link>
        </div>
        <div className="w-full h-screen flex justify-center items-center">
            <iframe className="w-full h-full" src="https://giphy.com/embed/j6aoUHK5YiJEc" title="Lost GIF"></iframe>
        </div>
        </>
    )
}