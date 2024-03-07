import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from 'react';
import "tailwindcss/tailwind.css";
import ListUser from './components/ListUser';
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Dashborad from "./components/Dashborad";
import Login from "./components/Login";
function App() {
 
  const serverName = "http://localhost/apimanga/";
 
  return (
    <div className="flex flex-col h-screen justify-between">
      <Nav />
      <Routes>
     
      <Route path="/" element={<ListUser serverName={serverName} />}></Route>
      <Route path="login" element={<Login />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="Dashborad" element={<Dashborad />}></Route>
      
      </Routes>
    
    </div>
    
  );
}

export default App;