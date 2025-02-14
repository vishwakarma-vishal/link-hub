import Button from "../common/Button";
import PlusIcon from "../../../public/AddIcon"
import ShareIcon from "../../../public/ShareIcon"
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";

const Content: React.FC = () => {
    // add content
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(isModalOpen);

    const [formdata, setFormdata] = useState({
        title: "",
        link: ""
    });

    const changeHandler = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    // add content
    const submitHandler = async (e) => {
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
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    // get all content
    const getAllContent = async () => {
        try {
            const response = await axios({
                method: "get",
                url: "http://localhost:3001/content/get",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(getAllContent, []);

    return (
        <main className="relative p-8 w-full">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">All Notes</h2>
                <div className="flex gap-4">
                    <Button type="secondary" icon={<ShareIcon color="text-black" />} text="Share Brain" />
                    <Button handler={() => setIsModalOpen(true)} type="primary" icon={<PlusIcon color="text-white" />} text="Add Content" />
                </div>
            </div>

            <div className="columns-1 lg:columns-2 xl:columns-3 gap-4 my-6">
                {[
                    { title: "My best YouTube video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
                    { title: "Twitter post of my DSA journey", url: "https://x.com/vishaldev29/status/1882011601429233893" },
                    { title: "This is the Insta post", url: "https://www.instagram.com/p/DGAYZlOtgWt/?utm_source=ig_web_copy_link" },
                    { title: "Basic LinkedIn post", url: "https://www.linkedin.com/posts/edelweiss-amc_2-days-to-go-dont-miss-out-on-the-opportunity-activity-7295665355354427392-BJY0?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEG-P6MBXoVNF7nsv7l8Ka-m7fTRHasfvJ0" },
                    { title: "New link", url: "https://github.com/vishwakarma-vishal?tab=stars" },
                    { title: "Tailwind Docs", url: "https://tailwindcss.com/docs/overflow" },
                ].map((item, index) => (
                    <div key={index} className="break-inside-avoid mb-4">
                        <Card title={item.title} url={item.url} />
                    </div>
                ))}
            </div>

            // add content
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
                            <button
                                type="submit"
                                className="bg-blue-600 text-white  py-1 rounded-full mt-2 cursor-pointer">
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