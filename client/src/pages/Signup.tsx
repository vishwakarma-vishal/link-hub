import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/auth/signup",
                data: formData
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg mx-4">
            <h1 className="font-medium text-2xl mb-6 text-center">Create an account</h1>
            <form onSubmit={submitHandler} className="flex flex-col">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        name="name"
                        onChange={changeHandler}
                        value={formData.name}
                        type="text"
                        placeholder="Your name"
                        className="mt-1 border border-gray-300 outline-none py-2 px-4 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">Email</label>
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
                 <p className="text-sm text-gray-500 mt-4 text-center">Already have an account <span className="text-blue-500 underline cursor-pointer" onClick={() => navigate("/login")}>login here</span></p>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-full mt-2 hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Signup;