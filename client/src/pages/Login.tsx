import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/auth/signin",
                data: formData
            });

            localStorage.setItem("token", response.data.token);

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-gray-200">
            <div className="w-4/12 bg-white rounded-xl p-6">
                <h1 className="font-medium text-lg mb-4 text-center">Login</h1>
                <form onSubmit={submitHandler} className="flex flex-col gap-2">
                    <div>
                        <label htmlFor="email">Email</label><br />
                        <input
                            id="email"
                            name="email"
                            onChange={changeHandler}
                            value={formData.email}
                            type="text"
                            placeholder="abc@gmail.com"
                            className="inline-block mt-1 border border-gray-400 outline-none py-1 px-4 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input
                            id="password"
                            name="password"
                            onChange={changeHandler}
                            value={formData.password}
                            type="password"
                            placeholder="enter your password"
                            className="inline-block mt-1 border border-gray-400 outline-none py-1 px-4 rounded-full w-full" />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white  py-1 rounded-full mt-2 cursor-pointer">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;