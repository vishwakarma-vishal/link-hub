import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Content from "../components/content/Content";
import axios from "axios";

interface LinkType {
    id: string;
    title: string;
    link: string;
    category: string;
}

const Dashboard: React.FC = () => {
    // get all content
    const [links, setLinks] = useState<LinkType[]>([]);
    const [filteredLinks, setFilteredLinks] = useState<LinkType[]>([]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLinkType, setSelectedLinkType] = useState("all");

    const getAllContent = async () => {
        try {
            const response = await axios({
                method: "get",
                url: "http://localhost:3001/content/get",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                setLinks(response.data.content);
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllContent();
    }, []);

    useEffect(() => {
        console.log("Selected Link Type:", selectedLinkType);
        console.log("Links:", links);

        if (selectedLinkType === "all") {
            setFilteredLinks(links);
        } else if (selectedLinkType) {
            setFilteredLinks(links.filter(link => link.category === selectedLinkType));
        } else {
            setFilteredLinks(links);
        }
    }, [links, selectedLinkType]);


    return (
        <div className="w-full h-full bg-gray-100 flex">
            <Sidebar setSelectedLinkType={setSelectedLinkType} />
            <Content links={filteredLinks} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedLinkType={selectedLinkType} />
        </div>
    );
}

export default Dashboard;