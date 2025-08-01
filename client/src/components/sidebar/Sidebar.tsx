import React from "react";
import SidebarItem from "./SidebarItem";

type SidebarProps = {
    setSelectedLinkType: Function;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedLinkType }) => {
    return (
        <div className="w-3/12 min-h-screen p-4 bg-white">
            <div className="m-2 flex flex-col gap-4 text-gray-600 text-md">
                <SidebarItem icon="link" text="All" handler={() => setSelectedLinkType("all")} />
                <SidebarItem icon="youtube" text="Youtube" handler={() => setSelectedLinkType("youtube")} />
                <SidebarItem icon="twitter" text="Twitter" handler={() => setSelectedLinkType("twitter")} />
                <SidebarItem icon="linkedin" text="Linkedin" handler={() => setSelectedLinkType("linkedin")} />
                <SidebarItem icon="instagram" text="Instagram" handler={() => setSelectedLinkType("instagram")} />
                <SidebarItem icon="link" text="Link" handler={() => setSelectedLinkType("link")} />
            </div>
        </div>
    );
}

export default Sidebar;