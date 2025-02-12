import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Chip,
  Skeleton,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry"; // Import Masonry from Material-UI Lab
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
  const [currentBatch, setCurrentBatch] = useState(12); // Track how many images are displayed
  const [totalImages, setTotalImages] = useState(0); // Total number of images in the category

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchImages = async (category) => {
      setLoading(true);
      try {
        const response = await fetch(`/data/${category}.json`); // Fetch the JSON based on the selected category
        const data = await response.json();

        if (Array.isArray(data)) {
          setImages(data);
          setTotalImages(data.length); // Store the total number of images
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory === "All") {
      const allImages = [];
      let categoriesFetched = 0;

      categories.forEach((category) => {
        fetchImages(category).then((data) => {
          if (Array.isArray(data)) {
            allImages.push(...data); // Merge the data from each category if it's an array
          }

          categoriesFetched += 1;
          if (categoriesFetched === categories.length) {
            setImages(allImages); // Only set images after all categories are fetched
            setTotalImages(allImages.length); // Set total images for all categories
          }
        });
      });
    } else {
      fetchImages(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentBatch(12); // Reset the batch count when changing categories
    setLoadingImages(true);
    setTimeout(() => setLoadingImages(false), 500); // Simulate loading delay
  };

  const handleImageLoad = () => {
    setImagesLoaded(true); // Trigger image loaded state
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder-image.jpg"; // Placeholder image on error
  };

  const loadMore = () => {
    setCurrentBatch((prevBatch) => prevBatch + 12); // Load next 12 images
  };

  const displayedImages = images.slice(0, currentBatch); // Display only the images up to the current batch

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Box>
        <img src="/Email_Signatuer_logo.png" width="100" alt="Logo" />
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
        ) : displayedImages.length > 0 ? (
          displayedImages.map(({ id, url }, index) => (
            <Paper
              key={`${id}-${index}`} // Ensure unique key by combining id and index
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
                  src={url} // Updated to use 'url' from the JSON
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
                  onError={handleImageError} // Placeholder image on error
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

      {/* Load More Button */}
      {displayedImages.length < totalImages && (
        <Chip
          label="Load More"
          onClick={loadMore}
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "50px", // Chip-like rounded appearance
            marginTop: "10px",
            padding: "20px",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              border: "1px solid black", // Adds border to make it more chip-like on hover
            },
            cursor: "pointer", // Ensures the chip behaves like a clickable element
          }}
        />
      )}
    </div>
  );
};

export default ImageGrid;
