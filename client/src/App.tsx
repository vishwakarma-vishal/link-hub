import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sharing from "./pages/Sharing";
import Layout from "./components/common/Layout";

const App: React.FC = function () {
  return (
    <Routes>
      {/* Apply Layout as a parent route */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="sharing/:hash" element={<Sharing />} />
      </Route>
    </Routes>
  );
};

export default App;
