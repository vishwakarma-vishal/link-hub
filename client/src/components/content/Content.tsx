import React, { useState } from "react";
import Button from "../common/Button";
import PlusIcon from "../Icons/AddIcon";
import ShareIcon from "../Icons/ShareIcon";
import Card from "./Card";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";

interface Link {
    id: string;
    title: string;
    link: string;
    category: string;
}

interface ContentProps {
    links: Link[];
    isModalOpen: boolean;
    setIsModalOpen: Function;
    selectedLinkType: string;
}

const Content: React.FC<ContentProps> = ({ links, isModalOpen, setIsModalOpen, selectedLinkType }) => {
    const [formdata, setFormdata] = useState({
        title: "",
        link: "",
        category: "link" // default type
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    // add content(link)
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/content/create",
                data: formdata,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                setIsModalOpen(false);
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    // first letter capital for category name
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    return (
        <main className="relative p-8 w-full h-screen">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">{capitalizeFirstLetter(selectedLinkType)}</h2>
                <div className="flex gap-4">
                    <Button type="secondary" icon={<ShareIcon color="text-black" />} text="Share Brain" />
                    <Button handler={() => setIsModalOpen(true)} type="primary" icon={<PlusIcon color="text-white" />} text="Add Content" />
                </div>
            </div>

            {links.length === 0 ?
                <div className="flex justify-center items-center h-[90%] text-gray-400">
                    No links available for the selected category, select different category or add some links.
                </div> :
                <div className="columns-1 lg:columns-2 xl:columns-3 gap-4 my-6">
                    {links.map((link) => (
                        <div key={link.id} className="break-inside-avoid mb-4">
                            <Card title={link.title} url={link.link} category={link.category} />
                        </div>
                    ))}
                </div>
            }

            {
                isModalOpen &&
                <div className="absolute flex justify-center items-center top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.5)]">
                    <div className="relative min-w-[350px] bg-white rounded-xl p-6">
                        <div className="flex items-start justify-between">
                            <h1 className="font-medium text-lg mb-4 text-center">Add Content</h1>
                            <RxCrossCircled
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-xl text-gray-800 cursor-pointer" />
                        </div>
                        <form onSubmit={submitHandler} className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="title">Title</label><br />
                                <input
                                    id="title"
                                    name="title"
                                    onChange={changeHandler}
                                    value={formdata.title}
                                    type="text"
                                    placeholder="enter your title"
                                    className="inline-block mt-1 border border-gray-400 outline-none py-1 px-4 rounded-full w-full" />
                            </div>
                            <div>
                                <label htmlFor="link">Link</label><br />
                                <input
                                    id="link"
                                    name="link"
                                    onChange={changeHandler}
                                    value={formdata.link}
                                    type="text"
                                    placeholder="link goes here..."
                                    className="inline-block mt-1 border border-gray-400 outline-none py-1 px-4 rounded-full w-full" />
                            </div>
                            <div>
                                <label htmlFor="category">Category</label><br />
                                <select
                                    id="category"
                                    name="category"
                                    onChange={changeHandler}
                                    value={formdata.category}
                                    className="inline-block mt-1 border border-gray-400 outline-none py-1 px-4 rounded-full w-full"
                                >
                                    <option value="youtube">YouTube</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="link">Link</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-1 rounded-full mt-2 cursor-pointer">
                                Add Link
                            </button>
                        </form>
                    </div>
                </div>
            }
        </main>
    );
}

export default Content;