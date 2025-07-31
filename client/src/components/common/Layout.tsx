import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-full min-h-screen items-between">
      <Header />
      <main className="flex-1 flex justify-center items-center bg-gray-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
