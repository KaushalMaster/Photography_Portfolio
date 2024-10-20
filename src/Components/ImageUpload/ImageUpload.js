import React, { useState } from "react";
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
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, imgDB } from "../../firebase"; // Make sure this is your Firebase storage
import { useForm } from "react-hook-form";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore imports

const categories = ["Pre-Wedding", "Portraits", "Street", "Events"];

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const saveImageDataToFirestore = async (imageUrl, category) => {
    try {
      const docRef = doc(db, "Images", Date.now().toString());
      await setDoc(docRef, {
        imageUrl,
        category,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (error) {
      console.error("Error adding document: ", error);
      return false;
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

      // Save image URL and category to Firestore
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
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
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
          backgroundColor: "#f9f9f9",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : selectedImage ? (
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
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          {...register("category", { required: "Category is required." })}
          error={!!errors.category}
          value={watch("category") || ""}
        >
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
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        disabled={loading || !selectedImage}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Upload Image"
        )}
      </Button>

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
