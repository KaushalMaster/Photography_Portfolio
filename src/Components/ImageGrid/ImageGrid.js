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

// JSON imports
import weddingData from "../../data/wedding.json";
import preWeddingData from "../../data/pre-wedding.json";
import engagementCeremonyData from "../../data/engagement-ceremony.json";
import eventsData from "../../data/events.json";
import concertsData from "../../data/concerts.json";
import streetData from "../../data/street.json";
import portraitsData from "../../data/potraits.json";
import productsData from "../../data/products.json";
import jewelleryData from "../../data/jewellery.json"; // NEW
import foodData from "../../data/food.json";
import babyData from "../../data/baby.json";

// 🔥 Product Sub Categories
const productCategories = {
  Jewellery: jewelleryData,
  Products: productsData,
};

// Main Categories
const categoryData = {
  Events: eventsData,
  Concerts: concertsData,
  Wedding: weddingData,
  "Pre-Wedding": preWeddingData,
  "Engagement Ceremony": engagementCeremonyData,
  Portraits: portraitsData,
  Street: streetData,
  Food: foodData,
  Baby: babyData,
  Products: productCategories, // 🔥 Nested Categories
};

const categories = Object.keys(categoryData);

// 🔥 Blur Image Component
const BlurImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: loaded ? "blur(0px)" : "blur(20px)",
          transform: loaded ? "scale(1)" : "scale(1.1)",
          transition: "all 0.6s ease",
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
};

const ImageGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔥 For Product Sub Categories
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBatch, setCurrentBatch] = useState(12);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);

    // 🔥 ALL PAGE
    if (selectedCategory === "All") {
      setImages([]);
    }

    // 🔥 PRODUCTS PAGE
    else if (selectedCategory === "Products") {
      // If sub category selected
      if (selectedProductCategory) {
        setImages(productCategories[selectedProductCategory] || []);
      } else {
        setImages([]);
      }
    }

    // 🔥 NORMAL CATEGORY
    else {
      setImages(categoryData[selectedCategory] || []);
    }

    setCurrentBatch(12);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [selectedCategory, selectedProductCategory]);

  const displayedImages = images.slice(0, currentBatch);

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      {/* 🔥 Sticky Logo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#121212",
          px: 2,
          pt: 2,
          pb: 1,
        }}
      >
        <img src="/Logo_white.png" width="15%" alt="Logo" />
      </Box>

      <Box sx={{ padding: "20px" }}>
        {/* 🔥 CATEGORY CHIPS */}
        <Box sx={{ display: "flex", overflowX: "auto", mb: 3 }}>
          <Chip
            label="All"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedProductCategory(null);
            }}
            sx={{
              mr: 1,
              bgcolor: selectedCategory === "All" ? "#fff" : "transparent",
              color: selectedCategory === "All" ? "#000" : "#fff",
            }}
          />

          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedProductCategory(null);
              }}
              sx={{
                mr: 1,
                bgcolor: selectedCategory === cat ? "#fff" : "transparent",
                color: selectedCategory === cat ? "#000" : "#fff",
                border: "1px solid white",
              }}
            />
          ))}
        </Box>

        {/* 🔥 MAIN VIEW */}
        {selectedCategory === "All" ? (
          // 🔹 CATEGORY CARDS
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {categories.map((category) => {
              let cover;

              // 🔥 Products Cover
              if (category === "Products") {
                cover = productCategories.Products?.[0]?.url;
              } else {
                cover = categoryData[category]?.[0]?.url;
              }

              return (
                <Paper
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedProductCategory(null);
                  }}
                  sx={{
                    height: 300,
                    borderRadius: "20px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "0.4s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <BlurImage src={cover} alt={category} />

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      p: 2,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {category}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : selectedCategory === "Products" && !selectedProductCategory ? (
          // 🔥 PRODUCT SUB CATEGORY CARDS
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            {Object.keys(productCategories).map((productType) => {
              const cover = productCategories[productType]?.[0]?.url;

              return (
                <Paper
                  key={productType}
                  onClick={() => setSelectedProductCategory(productType)}
                  sx={{
                    height: 300,
                    borderRadius: "20px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "0.4s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <BlurImage src={cover} alt={productType} />

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      p: 2,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {productType}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : (
          // 🔥 IMAGE GRID
          <Box
            sx={{
              animation: "fadeIn 0.5s ease",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Masonry columns={isMobile ? 2 : 4} spacing={2}>
              {loading ? (
                Array.from(new Array(6)).map((_, index) => (
                  <Paper key={index}>
                    <Skeleton variant="rectangular" height={200} />
                  </Paper>
                ))
              ) : displayedImages.length > 0 ? (
                displayedImages.map(({ id, url }, index) => (
                  <Paper
                    key={`${id}-${index}`}
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <BlurImage src={url} alt="" />
                  </Paper>
                ))
              ) : (
                <Typography sx={{ color: "#fff" }}>
                  No images available
                </Typography>
              )}
            </Masonry>

            {/* 🔥 LOAD MORE */}
            {displayedImages.length < images.length && (
              <Box textAlign="center" mt={3}>
                <Typography
                  onClick={() => setCurrentBatch((prev) => prev + 12)}
                  sx={{
                    color: "#fff",
                    cursor: "pointer",
                    border: "1px solid white",
                    display: "inline-block",
                    px: 3,
                    py: 1,
                    borderRadius: "20px",
                  }}
                >
                  Load More
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ImageGrid;
