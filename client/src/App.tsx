import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

const App: React.FC = function () {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />
      } />
    </Routes>
  )
}

export default App
