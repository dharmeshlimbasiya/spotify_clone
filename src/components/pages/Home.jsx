import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import MainLayout from "../mainLayout/MainLayout";

// const CLIENT_ID = "your id spotify";
// const CLIENT_SECRET = "key";

function Home() {
  const [musicData, setMusicData] = useState([]);
  const [accessToken, setAccessToken] = useState("ACCESS_TOKEN");
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [browseData, setBrowseData] = useState([]);

  //authentication
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

  //week
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/new-releases?limit=10",
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
        setMusicData(data.albums.items);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  //feture playlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured playlists
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists?limit=10",
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
        setFeaturedPlaylists(data.playlists.items);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  //browers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/categories?limit=10", 
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
        setBrowseData(data.categories.items);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <MainLayout>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* week */}
        <Grid container spacing={2}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Relased This Week
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {musicData.map((item) => (
              <Grid item xs={10} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    marginBottom: "18px",
                    borderRadius: "8px", 
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      height: "auto",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                     
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "16px",
                      flexGrow: 1,
                    }}
                  >
                    
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <Tooltip
                      title={item.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          margin: "0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
        </Grid>

        {/* feture playlist */}
        <Grid>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Featured Playlists
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Grid container spacing={2}>
              {featuredPlaylists.map((playlist) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
                  <Card
                    sx={{
                      marginBottom: "18px", 
                      borderRadius: "8px", 
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.2s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        height: "auto",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "16px",
                        flexGrow: 1,
                      }}
                    >
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        style={{ width: "100%", height: "auto" }}
                      />
                      <Tooltip title={playlist.description}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            margin: "0",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {playlist.name}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* browers data */}
        <Grid>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Browse Categories
          </Typography>
          <Grid container spacing={2}>
            {browseData.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                <Card
                    sx={{
                        marginBottom: "18px",
                      borderRadius: "8px", 
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", 
                      transition: "transform 0.2s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        height: "auto",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      
                      }}
                    />
                  <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "16px",
                        flexGrow: 1,
                      }}
                  >
                     <img
                      src={category.icons[0].url}
                      alt={category.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            margin: "0",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                      {category.name}
                    </Typography>
                   
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default Home;
