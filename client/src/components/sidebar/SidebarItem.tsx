import React from "react";
import YoutubeIcon from "../Icons/YoutubeIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import LinkIcon from "../Icons/LinkIcon";

const Icon = {
    youtube: <YoutubeIcon color="text-gray-700" />,
    twitter: <TwitterIcon color="text-gray-700" />,
    linkedin: <LinkedinIcon color="text-gray-700" />,
    instagram: <InstagramIcon color="text-gray-700" />,
    link: <LinkIcon color="text-gray-700" />,
}

type SidebarItemProps = {
    icon: keyof typeof Icon;
    text: string;
    handler: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, handler }) => {
    return (
        <div onClick={handler} className="flex items-center gap-3">
            {Icon[icon as keyof typeof Icon]}
            <p>{text}</p>
        </div>
    )
}

export default SidebarItem;