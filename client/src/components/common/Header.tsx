import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../recoil/userAtom";

const Header: React.FC = () => {
    const { isAuthenticated } = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const navigate = useNavigate();

    const logOut = (e: React.FormEvent) => {
        e.preventDefault();

        setUser({isAuthenticated: false});
        localStorage.removeItem("token");
        navigate("/signup")
    }
   
    return (
        <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">LinkHub</Link>
            {isAuthenticated ?
                <nav>
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 mx-3">
                        Dashboard
                    </Link>
                    <Link to="/signup" onClick={logOut} className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
                        Log out
                    </Link>
                </nav> :
                <nav>
                    <Link to="/login" className="text-gray-700 hover:text-blue-600 mx-3">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                        Sign Up
                    </Link>
                </nav>
            }
        </header>
    );
}

export default Header;