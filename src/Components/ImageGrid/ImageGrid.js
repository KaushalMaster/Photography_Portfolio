import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Chip,
  Skeleton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import "@fontsource/roboto";

// Import JSON files statically
import weddingData from "../../data/wedding.json";
import preWeddingData from "../../data/pre-wedding.json";
import engagementCeremonyData from "../../data/engagement-ceremony.json";
import eventsData from "../../data/events.json";
import streetData from "../../data/street.json";
import portraitsData from "../../data/potraits.json";
import foodData from "../../data/food.json";
import babyData from "../../data/baby.json";

const categories = [
  "Events",
  "Wedding",
  "Pre-Wedding",
  "Engagement Ceremony",
  "Portraits",
  "Baby",
  "Street",
  "Food",
];

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentBatch, setCurrentBatch] = useState(12);
  const [totalImages, setTotalImages] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Function to load images based on category
  const loadCategoryImages = (category) => {
    setLoading(true);

    let data = [];
    switch (category) {
      case "Wedding":
        data = weddingData;
        break;
      case "Pre-Wedding":
        data = preWeddingData;
        break;
      case "Engagement Ceremony":
        data = engagementCeremonyData;
        break;
      case "Events":
        data = eventsData;
        break;
      case "Street":
        data = streetData;
        break;
      case "Portraits":
        data = portraitsData;
        break;
      case "Food":
        data = foodData;
        break;
      case "Baby":
        data = babyData;
        break;
      case "All":
        data = [
          ...weddingData,
          ...preWeddingData,
          ...engagementCeremonyData,
          ...eventsData,
          ...streetData,
          ...portraitsData,
          ...foodData,
          ...babyData,
        ];
        break;
      default:
        data = [];
    }

    setImages(data);
    setTotalImages(data.length);
    setLoading(false);
  };

  // Load images when a category is selected
  useEffect(() => {
    loadCategoryImages(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentBatch(12); // Reset batch count when changing categories
  };

  const loadMore = () => {
    setCurrentBatch((prevBatch) => prevBatch + 12);
  };

  const displayedImages = images.slice(0, currentBatch);

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

      {/* Category Chips */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "30px",
          overflowX: "auto",
          padding: { xs: "0 10px", md: "0" },
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

      <Masonry columns={isMobile ? 2 : 4} spacing={2}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Paper key={index} elevation={3} style={{ borderRadius: "10px" }}>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Paper>
          ))
        ) : displayedImages.length > 0 ? (
          displayedImages.map(({ id, url }, index) => (
            <Paper
              key={`${id}-${index}`}
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
                  src={url}
                  alt={`Image`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "16px 16px 0 0",
                  }}
                  // Prevent right-click (context menu) and dragging
                  onContextMenu={(e) => e.preventDefault()} // Disable right-click
                  onDragStart={(e) => e.preventDefault()} // Prevent drag
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

      {displayedImages.length < totalImages && (
        <Chip
          label="Load More"
          onClick={loadMore}
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "50px",
            marginTop: "10px",
            padding: "20px",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
            },
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );
};

export default ImageGrid;
