import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Content from "../components/content/Content";


const Dashboard: React.FC = () => {
    return (
        <div className="w-full h-full bg-gray-100 flex">
            <Sidebar />
            <Content />
        </div>
    );
}

export default Dashboard;