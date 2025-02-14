import { JSX } from "react";
import SidebarItem from "./SidebarItem";

function Sidebar(): JSX.Element {
    return (
        <div className="w-3/12 min-h-screen p-4 bg-white">
            <h1 className="text-2xl font-semibold mb-8">Link Hub</h1>
            <div className="m-2 flex flex-col gap-4 text-gray-600 text-md">
                <SidebarItem icon="youtube" text="Youtube" />
                <SidebarItem icon="twitter" text="Twitter" />
                <SidebarItem icon="linkedin" text="Linkedin" />
                <SidebarItem icon="instagram" text="Instagram" />
                <SidebarItem icon="link" text="Link" />
            </div>
        </div>
    );
}

export default Sidebar;