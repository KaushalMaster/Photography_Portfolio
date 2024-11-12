import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, imgDB } from "../../firebase";
import { useForm } from "react-hook-form";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const categories = [
  "Wedding",
  "Pre-Wedding",
  "Events",
  "Street",
  "Portraits",
  "Food",
];

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [images, setImages] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      category: "",
      image: null,
    },
  });

  useEffect(() => {
    const fetchImages = async () => {
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
      }
    };

    fetchImages();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  const saveImageDataToFirestore = async (imageUrl, category) => {
    try {
      const docRef = doc(db, "Images", Date.now().toString());
      await setDoc(docRef, {
        imageUrl,
        category,
        createdAt: new Date(),
      });
      return true;
    } catch (error) {
      console.error("Error adding document: ", error);
      return false;
    }
  };

  const deleteImageFromFirestore = async (id, imageUrl) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "Images", id));
      const storageRef = ref(imgDB, imageUrl);
      await deleteObject(storageRef);
      setImages(images.filter((image) => image.id !== id));
      setSnackbarMessage("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting document: ", error);
      setSnackbarMessage("Failed to delete image.");
    } finally {
      setDeleting(false);
      setSnackbarOpen(true);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedImage || !data.category) return;

    const storageRef = ref(
      imgDB,
      `${data.category}/${Date.now()}_${selectedImage.name}`
    );

    setLoading(true);

    try {
      const snapshot = await uploadBytes(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      const isSaved = await saveImageDataToFirestore(
        downloadURL,
        data.category
      );

      if (isSaved) {
        setSnackbarMessage(`Upload successful! URL: ${downloadURL}`);
      } else {
        setSnackbarMessage(
          "Upload successful, but failed to save data to Firestore."
        );
      }

      reset();
      setSelectedImage(null);
      const imagesCollection = collection(db, "Images");
      const snapshotImages = await getDocs(imagesCollection);
      const imageData = snapshotImages.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imageData);
    } catch (error) {
      console.error("Upload failed:", error);
      setSnackbarMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        maxWidth: "100%",
        margin: "auto",
        fontFamily: "Roboto, sans-serif",
        height: "100vh", // Make the container full height
      }}
    >
      {/* Left Container: Image Upload Form */}
      <Box
        sx={{
          flex: "0 0 400px", // Fixed width for left container
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
          color: "#FFFFFF",
          padding: 4,
          overflow: "hidden",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Upload Your Image
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: 200,
              border: "2px dashed #ccc",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              backgroundColor: "#2A2A2A",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : selectedImage ? (
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={clearSelectedImage}
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    zIndex: 1,
                  }}
                >
                  Clear Image
                </Button>
              </Box>
            ) : (
              <label htmlFor="upload-button" style={{ cursor: "pointer" }}>
                <input
                  accept="image/*"
                  id="upload-button"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleImageChange(e);
                    register("image").onChange(e);
                  }}
                />
                <CloudUpload fontSize="large" color="action" />
                <Typography variant="body2" color="textSecondary">
                  Drag and drop or click to upload
                </Typography>
              </label>
            )}
          </Box>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel
              id="category-label"
              sx={{ color: "white", fontFamily: "Roboto, sans-serif" }}
            >
              Select Category
            </InputLabel>
            <Select
              labelId="category-label"
              {...register("category", { required: "Category is required." })}
              error={!!errors.category}
              value={watch("category") || ""}
              sx={{
                backgroundColor: "#2A2A2A",
                color: "white",
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#2A2A2A",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                <em style={{ color: "#aaa" }}>Select a category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography variant="caption" color="error">
                {errors.category.message}
              </Typography>
            )}
          </FormControl>

          <Button
            variant="primary"
            fullWidth
            type="submit"
            disabled={loading || !selectedImage}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "black",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Image"
            )}
          </Button>
        </Box>
      </Box>

      {/* Right Container: Uploaded Images */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#1e1e1e",
          color: "#FFFFFF",
          padding: 2,
          overflowY: "auto", // Make this container scrollable
        }}
      >
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Uploaded Images
        </Typography>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#2A2A2A",
                }}
              >
                <img
                  src={image.imageUrl}
                  alt={image.category}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={() =>
                    deleteImageFromFirestore(image.id, image.imageUrl)
                  }
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "red",
                  }}
                >
                  {deleting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Delete />
                  )}
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ImageUpload;
