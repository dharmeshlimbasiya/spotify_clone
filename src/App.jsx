import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Playlist from "./components/pages/Playlist";
import Search1 from "./components/pages/Search1";
import Fav from "./components/pages/Fav";

// const CLIENT_ID = "ac7c85e6e55145efbdbd67e04bb67b37";
// const CLIENT_SECRET = "d9c1a38b14014ceab6032761914fe821";

function App() {
  // const [accessToken, setAccessToken] = useState("");
  // useEffect(() => {
  //   var authParameter = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body:
  //       "grant_type=client_credentials&client_id=" +
  //       CLIENT_ID +
  //       "&client_secret=" +
  //       CLIENT_SECRET,
  //   };
  //   fetch("https://accounts.spotify.com/api/token", authParameter)
  //     .then((result) => result.json())
  //     .then((data) => setAccessToken(data.access_token));
  // }, []);

  // //serch
  // async function search() {
  //   console.log("serch for:");

  //   var artistParameters = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer ",
  //       accessToken,
  //     },
  //   };

  //   var articsId = await fetch(
  //     "https://accounts.spotify.com/v1/search?q=" + "Taylor" + "@type=artist",
  //     artistParameters
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  //   articsId();
  // }

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
