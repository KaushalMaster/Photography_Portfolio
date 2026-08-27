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
import foodData from "../../data/food.json";
import babyData from "../../data/baby.json";

// ======================================================
// 🔥 PRODUCT DATA
// ======================================================

import productsData from "../../data/products.json";
import jewelleryData from "../../data/jewellery.json";

// ======================================================
// 🔥 FASHION DATA
// ======================================================

import jimmyNeelamData from "../../data/Fashion/Jimmy_Neelam.json";
import tyaaniByKaranJoharRakshaBandhanEditionData from "../../data/Fashion/Tyaani_By_Karan_Johar.json";
import maitriFashionCoData from "../../data/Fashion/Maitri.co.json";
 
// ======================================================
// 🔥 PORTRAITS DATA
// ======================================================

import nainaSawlaniData from "../../data/Potraits/Naina_Sawlani.json";
import rohanShahData from "../../data/Potraits/Rohan_Shah.json";
import tammyBatariaData from "../../data/Potraits/Tammy_Bataria.json";
import aanchalData from "../../data/Potraits/Aanchal_Shah.json";
import deepaTrivediData from "../../data/Potraits/Deepa_Trivedi.json";
import himanshiSoniData from "../../data/Potraits/Himanshi_Soni.json";
import molicaData from "../../data/Potraits/Molica.json";
import parikshitData from "../../data/Potraits/Parikshit.json";
import celebData from "../../data/Potraits/Celeb.json";
import meeraChopraData from "../../data/Potraits/Meera_Chopra.json";
import nagaChaitanyaData from "../../data/Potraits/Naga_Chaitanya.json";
import nagarjunaData from "../../data/Potraits/Nagarjuna.json";
import sobhitaData from "../../data/Potraits/Sobhita.json";
import taahaShahData from "../../data/Potraits/Taaha_Shah.json";

// ======================================================
// 🔥 PRE-WEDDING DATA
// ======================================================

import abhishek_HemangiData from "../../data/Prewedding/Abhishek-and-Hemangi.json";
import apurv_DhanviData from "../../data/Prewedding/Apurv-and-Dhanvi.json";
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
  "Apurv | Dhanvi": apurv_DhanviData,
  "Abhishek | Hemangi": abhishek_HemangiData,
  "Utkarsh | Priyanshi": utkarsh_PriyanshiData,
};

// ======================================================
// 🔥 WEDDING CATEGORIES
// ======================================================

const weddingCategories = {
  "Abhishek | Hemangi": abhishekHemangiData,
  "Dhruvil | Prachi": dhruvilPrachiData,
  "Manthan | Bhavya": manthanBhavyaData,
  "Utkarsh | Priyanshi": utkarshPriyanshiData,
};

// ======================================================
// 🔥 PRODUCT CATEGORIES
// ======================================================

const productCategories = {
  Jewellery: jewelleryData,
  Products: productsData,
};

// ======================================================
// 🔥 PORTRAITS CATEGORIES
// ======================================================

const portraitsCategories = {
  Naina_Sawlani: nainaSawlaniData,
  Rohan_Shah: rohanShahData,
  Tammy_Bataria: tammyBatariaData,
  Aanchal_Shah: aanchalData,
  Deepa_Trivedi: deepaTrivediData,
  Himanshi_Soni: himanshiSoniData,
  Molica: molicaData,
  Parikshit: parikshitData,
  Celeb: celebData,
  Meera_Chopra: meeraChopraData,
  Naga_Chaitanya: nagaChaitanyaData,
  Nagarjuna: nagarjunaData,
  Sobhita: sobhitaData,
  Taaha_Shah: taahaShahData,
};

// ======================================================
// 🔥 FASHION CATEGORIES
// ======================================================

const fashionCategories = {
  Jimmy_Neelam: jimmyNeelamData,
  Tyaani_by_Karan_Johar_RakshaBandhanEdition:
    tyaaniByKaranJoharRakshaBandhanEditionData,
  Maitri_co: maitriFashionCoData,
};

// ======================================================
// 🔥 MAIN CATEGORY MAP
// ======================================================

const categoryData = {
  Events: eventsData,

  Concerts: concertsData,

  Wedding: weddingCategories,

  "Pre-Wedding": preWeddingCategories,

  Fashion: fashionCategories,

  Products: productCategories,

  "Engagement Ceremony": engagementCeremonyData,

  Portraits: portraitsCategories,

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

  const [selectedPortraitCategory, setSelectedPortraitCategory] =
    useState(null);

  const [selectedFashionCategory, setSelectedFashionCategory] = useState(null);

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

    if (selectedCategory === "All") {
      setImages([]);
    } else if (selectedCategory === "Products") {
      if (selectedProductCategory) {
        setImages(productCategories[selectedProductCategory] || []);
      } else {
        setImages([]);
      }
    } else if (selectedCategory === "Pre-Wedding") {
      if (selectedPreWeddingCategory) {
        setImages(preWeddingCategories[selectedPreWeddingCategory] || []);
      } else {
        setImages([]);
      }
    } else if (selectedCategory === "Wedding") {
      if (selectedWeddingCategory) {
        setImages(weddingCategories[selectedWeddingCategory] || []);
      } else {
        setImages([]);
      }
    } else if (selectedCategory === "Portraits") {
      if (selectedPortraitCategory) {
        setImages(portraitsCategories[selectedPortraitCategory] || []);
      } else {
        setImages([]);
      }
    } else if (selectedCategory === "Fashion") {
      if (selectedFashionCategory) {
        setImages(fashionCategories[selectedFashionCategory] || []);
      } else {
        setImages([]);
      }
    } else {
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
    selectedPortraitCategory,
    selectedFashionCategory,
  ]);

  const displayedImages = images.slice(0, currentBatch);

  const handleGoBack = () => {
    if (selectedProductCategory) {
      setSelectedProductCategory(null);
    } else if (selectedPreWeddingCategory) {
      setSelectedPreWeddingCategory(null);
    } else if (selectedWeddingCategory) {
      setSelectedWeddingCategory(null);
    } else if (selectedPortraitCategory) {
      setSelectedPortraitCategory(null);
    } else if (selectedFashionCategory) {
      setSelectedFashionCategory(null);
    } else if (selectedCategory !== "All") {
      setSelectedCategory("All");
    }
  };

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

              setSelectedPortraitCategory(null);

              setSelectedFashionCategory(null);
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

                setSelectedPortraitCategory(null);
                setSelectedFashionCategory(null);
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

        {(selectedCategory !== "All" ||
          selectedProductCategory ||
          selectedPreWeddingCategory ||
          selectedWeddingCategory ||
          selectedPortraitCategory) && (
          <Box
            sx={{
              position: "sticky",
              top: 70,
              zIndex: 1000,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "5%",
              mb: 2,
            }}
          >
            <Typography
              onClick={handleGoBack}
              sx={{
                backgroundColor: "#121212",

                color: "#fff",
                cursor: "pointer",
                border: "1px solid white",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                mt: 1,
                px: 3,
                py: 1,

                borderRadius: "50px",

                fontSize: "14px",

                transition: "0.3s",

                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#000",
                },
              }}
            >
              ←
            </Typography>
          </Box>
        )}

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

              if (category === "Products") {
                cover = productCategories.Products?.[0]?.url;
              } else if (category === "Pre-Wedding") {
                cover = preWeddingCategories["Apurv | Dhanvi"]?.[0]?.url;
              } else if (category === "Wedding") {
                cover = weddingCategories["Abhishek | Hemangi"]?.[0]?.url;
              } else if (category === "Portraits") {
                cover = portraitsCategories["Naina_Sawlani"]?.[0]?.url;
              } else if (category === "Fashion") {
                cover = fashionCategories["Jimmy_Neelam"]?.[0]?.url;
              } else {
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

                    setSelectedPortraitCategory(null);
                    setSelectedFashionCategory(null);
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
                    height: "100%",

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
                        fontFamily: "Kugile",
                        fontSize: "1.7rem",
                        letterSpacing: "2px",
                        fontWeight: 200,
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
                    height: "100%",

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
                        fontFamily: "Kugile",
                        fontSize: "1.7rem",
                        letterSpacing: "5px",
                        fontWeight: 400,
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
                    height: "100%",

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
                        fontFamily: "Kugile",
                        fontSize: "1.7rem",
                        letterSpacing: "2px",
                        fontWeight: 200,
                      }}
                    >
                      {couple}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : selectedCategory === "Portraits" && !selectedPortraitCategory ? (
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
            {Object.keys(portraitsCategories).map((person) => {
              const cover = portraitsCategories[person]?.[0]?.url;

              return (
                <Paper
                  key={person}
                  onClick={() => setSelectedPortraitCategory(person)}
                  sx={{
                    height: "100%",

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
                  <BlurImage src={cover} alt={person} />

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
                        fontFamily: "Kugile",
                        fontSize: "1.9rem",
                        letterSpacing: "2px",
                        fontWeight: 200,
                      }}
                    >
                      {person.replaceAll("_", " ")}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : selectedCategory === "Fashion" && !selectedFashionCategory ? (
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
            {Object.keys(fashionCategories).map((fashion) => {
              const cover = fashionCategories[fashion]?.[0]?.url;

              return (
                <Paper
                  key={fashion}
                  onClick={() => setSelectedFashionCategory(fashion)}
                  sx={{
                    height: "100%",
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
                  <BlurImage src={cover} alt={fashion} />

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
                        fontFamily: "Kugile",
                        fontSize: "1.9rem",
                        letterSpacing: "2px",
                        fontWeight: 200,
                      }}
                    >
                      {fashion.replaceAll("_", " ")}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : (
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
