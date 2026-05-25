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

// ======================================================
// 🔥 NORMAL CATEGORY DATA
// ======================================================

import engagementCeremonyData from "../../data/engagement-ceremony.json";
import eventsData from "../../data/events.json";
import concertsData from "../../data/concerts.json";
import streetData from "../../data/street.json";
import portraitsData from "../../data/potraits.json";
import foodData from "../../data/food.json";
import babyData from "../../data/baby.json";

// ======================================================
// 🔥 PRODUCT DATA
// ======================================================

import productsData from "../../data/products.json";
import jewelleryData from "../../data/jewellery.json";

// ======================================================
// 🔥 PRE-WEDDING DATA
// ======================================================

import apurv_DhanviData from "../../data/Prewedding/Apurv-and-Dhanvi.json";
import abhishek_HemangiData from "../../data/Prewedding/Abhishek-and-Hemangi.json";
import utkarsh_PriyanshiData from "../../data/Prewedding/Utkarsh-and-Priyanshi.json";

// ======================================================
// 🔥 WEDDING DATA
// ======================================================

import abhishekHemangiData from "../../data/Wedding/Abhishek-and-Hemangi.json";

import dhruvilPrachiData from "../../data/Wedding/Dhruvil-and-Prachi.json";

import manthanBhavyaData from "../../data/Wedding/Manthan-and-Bhavya.json";

import utkarshPriyanshiData from "../../data/Wedding/Utkarsh-and-Priyanshi.json";

// ======================================================
// 🔥 PRE-WEDDING CATEGORIES
// ======================================================

const preWeddingCategories = {
  "Apurv_Dhanvi": apurv_DhanviData,
  "Abhishek_Hemangi": abhishek_HemangiData,
  "Utkarsh_Priyanshi": utkarsh_PriyanshiData,
};


// ======================================================
// 🔥 WEDDING CATEGORIES
// ======================================================

const weddingCategories = {
  "Abhishek__Hemangi": abhishekHemangiData,
  
  "Dhruvil__Prachi": dhruvilPrachiData,
  
  "Manthan__Bhavya": manthanBhavyaData,
  
  "Utkarsh__Priyanshi": utkarshPriyanshiData,
};

// ======================================================
// 🔥 PRODUCT CATEGORIES
// ======================================================

const productCategories = {
  Jewellery: jewelleryData,
  Products: productsData,
};

// ======================================================
// 🔥 MAIN CATEGORY MAP
// ======================================================

const categoryData = {
  Events: eventsData,

  Concerts: concertsData,

  Wedding: weddingCategories,

  "Pre-Wedding": preWeddingCategories,

  Products: productCategories,

  "Engagement Ceremony": engagementCeremonyData,

  Portraits: portraitsData,

  Street: streetData,

  Food: foodData,

  Baby: babyData,
};

const categories = Object.keys(categoryData);

// ======================================================
// 🔥 BLUR IMAGE COMPONENT
// ======================================================

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

// ======================================================
// 🔥 IMAGE GRID COMPONENT
// ======================================================

const ImageGrid = () => {
  // ======================================================
  // 🔥 CATEGORY STATES
  // ======================================================

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedProductCategory, setSelectedProductCategory] = useState(null);

  const [selectedPreWeddingCategory, setSelectedPreWeddingCategory] =
    useState(null);

  const [selectedWeddingCategory, setSelectedWeddingCategory] = useState(null);

  // ======================================================
  // 🔥 IMAGE STATES
  // ======================================================

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentBatch, setCurrentBatch] = useState(12);

  // ======================================================
  // 🔥 RESPONSIVE
  // ======================================================

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ======================================================
  // 🔥 LOAD IMAGES
  // ======================================================

  useEffect(() => {
    setLoading(true);

    // ======================================================
    // 🔥 ALL
    // ======================================================

    if (selectedCategory === "All") {
      setImages([]);
    }

    // ======================================================
    // 🔥 PRODUCTS
    // ======================================================
    else if (selectedCategory === "Products") {
      if (selectedProductCategory) {
        setImages(productCategories[selectedProductCategory] || []);
      } else {
        setImages([]);
      }
    }

    // ======================================================
    // 🔥 PRE-WEDDING
    // ======================================================
    else if (selectedCategory === "Pre-Wedding") {
      if (selectedPreWeddingCategory) {
        setImages(preWeddingCategories[selectedPreWeddingCategory] || []);
      } else {
        setImages([]);
      }
    }

    // ======================================================
    // 🔥 WEDDING
    // ======================================================
    else if (selectedCategory === "Wedding") {
      if (selectedWeddingCategory) {
        setImages(weddingCategories[selectedWeddingCategory] || []);
      } else {
        setImages([]);
      }
    }

    // ======================================================
    // 🔥 NORMAL CATEGORY
    // ======================================================
    else {
      setImages(categoryData[selectedCategory] || []);
    }

    setCurrentBatch(12);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [
    selectedCategory,

    selectedProductCategory,

    selectedPreWeddingCategory,

    selectedWeddingCategory,
  ]);

  const displayedImages = images.slice(0, currentBatch);

  // ======================================================
  // 🔥 RENDER
  // ======================================================

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      {/* ====================================================== */}
      {/* 🔥 LOGO */}
      {/* ====================================================== */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "center",

          backgroundColor: "#121212",

          px: 2,

          pt: 2,

          pb: 1,
        }}
      >
        <img src="/Logo_white.png" width="15%" alt="Logo" />
      </Box>

      <Box sx={{ padding: "20px" }}>
        {/* ====================================================== */}
        {/* 🔥 CATEGORY CHIPS */}
        {/* ====================================================== */}

        <Box
          sx={{
            display: "flex",

            overflowX: "auto",

            mb: 3,
          }}
        >
          <Chip
            label="All"
            onClick={() => {
              setSelectedCategory("All");

              setSelectedProductCategory(null);

              setSelectedPreWeddingCategory(null);

              setSelectedWeddingCategory(null);
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

                setSelectedPreWeddingCategory(null);

                setSelectedWeddingCategory(null);
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

        {/* ====================================================== */}
        {/* 🔥 ALL CATEGORY CARDS */}
        {/* ====================================================== */}

        {selectedCategory === "All" ? (
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

              // ======================================================
              // 🔥 PRODUCTS COVER
              // ======================================================

              if (category === "Products") {
                cover = productCategories.Products?.[0]?.url;
              }

              // ======================================================
              // 🔥 PRE-WEDDING COVER
              // ======================================================
              else if (category === "Pre-Wedding") {
                cover = preWeddingCategories["Abhishek_Hemangi"]?.[0]?.url;
              }

              // ======================================================
              // 🔥 WEDDING COVER
              // ======================================================
              else if (category === "Wedding") {
                cover = weddingCategories["Abhishek__Hemangi"]?.[0]?.url;
              }

              // ======================================================
              // 🔥 NORMAL COVER
              // ======================================================
              else {
                cover = categoryData[category]?.[0]?.url;
              }

              return (
                <Paper
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);

                    setSelectedProductCategory(null);

                    setSelectedPreWeddingCategory(null);

                    setSelectedWeddingCategory(null);
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
          // ======================================================
          // 🔥 PRODUCT SUB CATEGORY CARDS
          // ======================================================

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
        ) : selectedCategory === "Pre-Wedding" &&
          !selectedPreWeddingCategory ? (
          // ======================================================
          // 🔥 PRE-WEDDING COUPLES
          // ======================================================

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
            {Object.keys(preWeddingCategories).map((couple) => {
              const cover = preWeddingCategories[couple]?.[0]?.url;

              return (
                <Paper
                  key={couple}
                  onClick={() => setSelectedPreWeddingCategory(couple)}
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
                  <BlurImage src={cover} alt={couple} />

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
                      {couple}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : selectedCategory === "Wedding" && !selectedWeddingCategory ? (
          // ======================================================
          // 🔥 WEDDING COUPLES
          // ======================================================

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
            {Object.keys(weddingCategories).map((couple) => {
              const cover = weddingCategories[couple]?.[0]?.url;

              return (
                <Paper
                  key={couple}
                  onClick={() => setSelectedWeddingCategory(couple)}
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
                  <BlurImage src={cover} alt={couple} />

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
                      {couple}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : (
          // ======================================================
          // 🔥 IMAGE GRID
          // ======================================================

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
                displayedImages.map(({ id, url, name }, index) => (
                  <Paper
                    key={`${id}-${index}`}
                    sx={{
                      borderRadius: "16px",

                      overflow: "hidden",
                    }}
                  >
                    <BlurImage src={url} alt={name} />
                  </Paper>
                ))
              ) : (
                <Typography sx={{ color: "#fff" }}>
                  No images available
                </Typography>
              )}
            </Masonry>

            {/* ====================================================== */}
            {/* 🔥 LOAD MORE */}
            {/* ====================================================== */}

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
