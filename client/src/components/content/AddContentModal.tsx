import axios from "axios";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

interface AddContentModalProp {
    setIsModalOpen: Function;
}

const AddContentModal:React.FC<AddContentModalProp> = ({setIsModalOpen}) => {
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

    return (
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
    )
}

export default AddContentModal;