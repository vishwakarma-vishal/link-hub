import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import user from '../recoil/userAtom'
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const setUser = useSetRecoilState(user);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/auth/signin",
                data: formData
            });

            localStorage.setItem("token", response.data.token);
            setUser({ isAuthenticated: true });
            navigate("/dashboard");

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg mx-4">
            <h1 className="font-medium text-2xl mb-6 text-center">Login</h1>
            <form onSubmit={submitHandler} className="flex flex-col">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        onChange={changeHandler}
                        value={formData.email}
                        type="email"
                        placeholder="abc@gmail.com"
                        className="mt-1 border border-gray-300 outline-none py-2 px-4 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="mt-4 block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        onChange={changeHandler}
                        value={formData.password}
                        type="password"
                        placeholder="Enter your password"
                        className="mt-1 border border-gray-300 outline-none py-2 px-4 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">Don't have an account <span className="text-blue-500 underline cursor-pointer" onClick={() => navigate("/signup")}>create one</span></p>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-full mt-2 hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;