import React, { useState } from "react";
import axios from "axios";

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

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
        <div className="flex h-screen w-screen justify-center items-center bg-gray-200">
            <div className="w-4/12 bg-white rounded-xl p-6">
                <h1 className="font-medium text-lg mb-4 text-center">Create an account</h1>
                <form onSubmit={submitHandler} className="flex flex-col gap-2">
                    <div>
                        <label htmlFor="name">Name</label><br />
                        <input
                            id="name"
                            name="name"
                            onChange={changeHandler}
                            value={formData.name}
                            type="text"
                            placeholder="your name"
                            className="inline-block mt-1 border border-gray-400 outline-none py-1 px-4 rounded-full w-full" />
                    </div>
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup;