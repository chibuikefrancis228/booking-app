import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React from "react";
import './App.css';
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import List from "./pages/List";
import Login from "./pages/Login"





function App (){
    return(
       <BrowserRouter>

       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hotels" element={<List/>} />
        <Route path="/hotels/:id" element={<Hotels/>} />
        <Route path="/login" element={<Login/>} />
       </Routes>
       
       </BrowserRouter>
    );
};


export default App;