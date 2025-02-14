import ShareIcon from "../../../public/ShareIcon";
import DeleteIcon from "../../../public/DeleteIcon";
import Embed from "../embed/Embed";
import { useState } from "react";
import YoutubeIcon from "../../../public/YoutubeIcon";
import TwitterIcon from "../../../public/TwitterIcon";
import LinkedinIcon from "../../../public/LinkedinIcon";
import InstagramIcon from "../../../public/InstagramIcon";
import LinkIcon from "../../../public/LinkIcon";

type CardProps = {
    title: string;
    url: string;
}

const Icon = {
    youtube: <YoutubeIcon color="text-gray-400"/>,
    twitter: <TwitterIcon color="text-gray-400"/>,
    linkedin: <LinkedinIcon color="text-gray-400"/>,
    instagram: <InstagramIcon color="text-gray-400"/>,
    link: <LinkIcon color="text-gray-400"/>,
}

const Card: React.FC<CardProps> = ({ title, url }) => {
    const [linkType, setLinkType] = useState("");

    return (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg h-fit w-[300px]">
            <div className="flex items-start justify-between w-full gap-2">
                <div className="flex gap-2">
                    <span className="mt-1">{Icon[linkType]}</span>
                    <h3 className="">{title}</h3>
                </div>
                <div className="flex gap-2 mt-1">
                    <ShareIcon color="text-gray-400"/>
                    <DeleteIcon color="text-gray-400"/>
                </div>
            </div>
            <span className="text-gray-500 text-sm inline-block">Added on 12-jan-25</span>

            <Embed url={url} setLinkType={setLinkType} />

            <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 rounded-full px-3 py-1 text-xs text-blue-600">#learing</span>
                <span className="bg-blue-100 rounded-full px-3 py-1 text-xs text-blue-600">#learing</span>
                <span className="bg-blue-100 rounded-full px-3 py-1 text-xs text-blue-600">#learing</span>
            </div>
        </div>
    );
}

export default Card;