import { useEffect, useState } from "react";
import { Typography, TextField, Button, Container, Box } from "@mui/material";

import MainLayout from "../mainLayout/MainLayout";

const CLIENT_ID = "ac7c85e6e55145efbdbd67e04bb67b37";
const CLIENT_SECRET = "d9c1a38b14014ceab6032761914fe821";

function Search1() {
  const [searchInput, setSearchInput] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("YOUR_ACCESS_TOKEN");

  useEffect(() => {
    var authParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameter)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setSearchResults(data.artists.items);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
          fontStyle="italic"
          mt={4}
        >
          <Typography variant="h3" gutterBottom>
            Spotify Artist Search
          </Typography>
          <div>
            <TextField
              type="text"
              placeholder="Search for an artist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
          </div>
          <div>
            <Typography variant="h4" gutterBottom>
              Search Results:
            </Typography>
            <ul>
              {searchResults.map((artist) => (
                <li key={artist.id}>{artist.name}</li>
              ))}
            </ul>
          </div>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Search1;
