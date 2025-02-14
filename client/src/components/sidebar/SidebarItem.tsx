import React from "react";
import YoutubeIcon from "../../../public/YoutubeIcon";
import TwitterIcon from "../../../public/TwitterIcon";
import LinkedinIcon from "../../../public/LinkedinIcon";
import InstagramIcon from "../../../public/InstagramIcon";
import LinkIcon from "../../../public/LinkIcon";

type SidebarItemProps = {
    icon: string;
    text: string;
}

const Icon = {
    youtube: <YoutubeIcon color="text-gray-700"/>,
    twitter: <TwitterIcon color="text-gray-700"/>,
    linkedin: <LinkedinIcon color="text-gray-700"/>,
    instagram: <InstagramIcon color="text-gray-700"/>,
    link: <LinkIcon color="text-gray-700"/>,
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text }) => {
    return (
        <div className="flex items-center gap-3">
            {Icon[icon]}
            <p>{text}</p>
        </div>
    )
}

export default SidebarItem;