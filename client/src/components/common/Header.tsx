import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
           <Link to="/"  className="text-2xl font-bold text-blue-600">LinkHub</Link>
            <nav>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 mx-3">
                    Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                    Sign Up
                </Link>
            </nav>
        </header>
    );
}

export default Header;