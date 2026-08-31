import React from "react";
import Navbar from "./components/Navbar/Navbar";

import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import AssessmentDetails from "./pages/AssessmentDetails.JSx";
import Auth from "./pages/Auth";
import AdminSidebar from "./components/AdminSidebar";



function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth/>} />
        <Route path="/assessment/:id" element={<AssessmentDetails/>}></Route>
        <Route path="/AdminSidebar" element={<AdminSidebar/>}></Route>
        


        
      </Routes>
    </div>
  );
}

export default App;