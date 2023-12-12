import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Playlist from "./components/pages/Playlist";
import Search1 from "./components/pages/Search1";
import Fav from "./components/pages/Fav";


function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search1 />} />
          <Route path="/favourite" element={<Fav />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
