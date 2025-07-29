import React, { useState } from "react";
import Button from "../common/Button";
import PlusIcon from "../Icons/AddIcon";
import ShareIcon from "../Icons/ShareIcon";
import Card from "./Card";
import AddContentModal from "./AddContentModal";
import SharePopup from "./SharePopup";
import axios from "axios";

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
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [hash, setHash] = useState("");

    // first letter capital for category name
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const shareLink = `https://yourapp.com/share/${hash}`;

    // share link handler
    const shareHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/sharing/toggle",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                setHash(response.data.token);
                setIsShareOpen(true);
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="relative p-8 w-full h-screen">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">{capitalizeFirstLetter(selectedLinkType)}</h2>
                <div className="flex gap-4">
                    <Button handler={shareHandler} type="secondary" icon={<ShareIcon color="text-black" />} text="Share Brain" />
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

            {/* content share modal  */}
            <SharePopup
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                shareLink={shareLink}
            />

            {/* content add modal */}
            {
                isModalOpen &&
                <AddContentModal setIsModalOpen={setIsModalOpen} />
            }
        </main>
    );
}

export default Content;