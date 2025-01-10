import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  Paper,
  Typography,
  Chip,
  Skeleton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry"; // Import Masonry from Material-UI Lab
import { db } from "../../firebase";

// Import Google Fonts
import "@fontsource/roboto"; // You can use other font families

const categories = [
  "Wedding",
  "Pre-Wedding",
  "Events",
  "Street",
  "Portraits",
  "Food",
];

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false); // Track if images are loaded

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleImageLoad = () => {
    setImagesLoaded(true); // Trigger image loaded state
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Box>
        <img src="/Email_Signatuer_Logo.png" width="100" alt="Logo" />
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

      {/* Horizontally Scrollable Chips Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "30px",
          overflowX: "auto", // Allow horizontal scroll
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

      {/* Masonry Layout for Images */}
      <Masonry columns={isMobile ? 2 : 4} spacing={2}>
        {loading || loadingImages ? (
          Array.from(new Array(6)).map((_, index) => (
            <Paper key={index} elevation={3} style={{ borderRadius: "10px" }}>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Paper>
          ))
        ) : filteredImages.length > 0 ? (
          filteredImages.map(({ id, imageUrl }) => (
            <Paper
              key={id}
              elevation={6}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#000",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <div
                style={{ width: "100%", height: "auto", overflow: "hidden" }}
              >
                <img
                  src={imageUrl}
                  alt={`Image`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Changed to contain for better fitting
                    borderRadius: "16px 16px 0 0",
                    opacity: imagesLoaded ? 1 : 0, // Fade-in effect
                    transition: "opacity 0.5s ease-in-out", // Smooth transition
                  }}
                  onLoad={handleImageLoad} // Set imagesLoaded to true once image is loaded
                  onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Placeholder image on error
                />
              </div>
            </Paper>
          ))
        ) : (
          <Typography
            variant="h6"
            align="center"
            style={{ color: "#ffffff", gridColumn: "span 4" }}
          >
            No images available for this category.
          </Typography>
        )}
      </Masonry>
    </div>
  );
};

export default ImageGrid;
