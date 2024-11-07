import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Grid, Paper, Typography, Chip, Skeleton, Box } from "@mui/material";
import { db } from "../../firebase";

// Import Google Fonts
import "@fontsource/roboto"; // You can use other font families

const categories = ["Pre-Wedding", "Events", "Street", "Portraits"];

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imagesCollection = collection(db, "Images");
        const snapshot = await getDocs(imagesCollection);
        const imageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imageData);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setLoadingImages(true);
    setTimeout(() => setLoadingImages(false), 500); // Simulate loading delay
  };

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((image) => image.category === selectedCategory);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Box>
        <img src="/Email_Signatuer_Logo.png" width="100" />
      </Box>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          color: "#ffffff",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          marginBottom: "30px",
        }}
      >
        Image Gallery
      </Typography>

      {/* Chips Container with Padding */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          flexWrap: "nowrap", // Prevent wrapping
          padding: { xs: "0 10px", md: "0" }, // Responsive padding
        }}
      >
        <Chip
          label="All"
          onClick={() => handleCategoryClick("All")}
          sx={{
            margin: "0 10px",
            cursor: "pointer",
            color: selectedCategory === "All" ? "black" : "white",
            bgcolor: selectedCategory === "All" ? "white" : "transparent",
            border: selectedCategory === "All" ? "none" : "1px solid white",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 600,
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor:
                selectedCategory === "All"
                  ? "#e0e0e0"
                  : "rgba(255, 255, 255, 0.1)",
            },
          }}
        />
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            sx={{
              margin: "0 10px",
              cursor: "pointer",
              color: selectedCategory === category ? "black" : "white",
              bgcolor: selectedCategory === category ? "white" : "transparent",
              border:
                selectedCategory === category ? "none" : "1px solid white",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category
                    ? "#e0e0e0"
                    : "rgba(255, 255, 255, 0.1)",
              },
            }}
          />
        ))}
      </Box>

      <Grid container spacing={2}>
        {loading || loadingImages ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Paper
                elevation={3}
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Paper>
            </Grid>
          ))
        ) : filteredImages.length > 0 ? (
          filteredImages.map(({ id, imageUrl }) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={id}>
              <Paper
                elevation={6}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#000",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <div style={{ width: "100%", height: 500, overflow: "hidden" }}>
                  <img
                    src={imageUrl}
                    alt={`Image`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Changed to contain for better fitting
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              style={{ color: "#ffffff" }}
            >
              No images available for this category.
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ImageGrid;
