import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { addProduct, updateProduct } from "../features/productsSlice";

const AddProductModal = ({ open, handleClose, product, productTypes }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [warrantyYears, setWarrantyYears] = useState("");
  const [available, setAvailable] = useState(true);

  const [errors, setErrors] = useState({
    name: false,
    type: false,
    price: false,
    rating: false,
    warrantyYears: false,
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setType(product.type);
      setPrice(product.price);
      setRating(product.rating);
      setWarrantyYears(product.warranty_years);
      setAvailable(product.available);
    } else {
      setName("");
      setType("");
      setPrice("");
      setRating("");
      setWarrantyYears("");
      setAvailable(true);
    }
  }, [product]);

  const validateFields = () => {
    const newErrors = {
      name: name === "",
      type: type === "",
      price: price === "",
      rating: rating === "" || rating > 5,
      warrantyYears: warrantyYears === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const newProduct = {
      _id: product ? product._id : Date.now(),
      name: capitalizeFirstLetter(name),
      type: capitalizeFirstLetter(type),
      price: parseFloat(price),
      rating: Math.min(parseFloat(rating), 5),
      warranty_years: parseInt(warrantyYears, 10),
      available,
    };

    if (product) {
      dispatch(updateProduct(newProduct));
    } else {
      dispatch(addProduct(newProduct));
    }
    setName("");
    setType("");
    setPrice("");
    setRating("");
    setWarrantyYears("");
    setAvailable(true);

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          helperText={errors.name ? "Name is required" : ""}
        />
        <Autocomplete
          options={productTypes}
          getOptionLabel={(option) => option}
          freeSolo
          value={type}
          onChange={(event, newValue) => {
            setType(newValue);
            setErrors({ ...errors, type: newValue === "" });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type"
              margin="dense"
              fullWidth
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setErrors({ ...errors, type: e.target.value === "" });
              }}
              error={errors.type}
              helperText={errors.type ? "Type is required" : ""}
            />
          )}
        />
        <TextField
          margin="dense"
          label="Price"
          fullWidth
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setErrors({ ...errors, price: e.target.value === "" });
          }}
          error={errors.price}
          helperText={errors.price ? "Price is required" : ""}
        />
        <TextField
          margin="dense"
          label="Rating"
          fullWidth
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setErrors({
              ...errors,
              rating: e.target.value === "" || e.target.value > 5,
            });
          }}
          error={errors.rating}
          helperText={
            errors.rating ? "Rating is required and should not exceed 5" : ""
          }
        />
        <TextField
          margin="dense"
          label="Warranty Years"
          fullWidth
          value={warrantyYears}
          onChange={(e) => {
            setWarrantyYears(e.target.value);
            setErrors({ ...errors, warrantyYears: e.target.value === "" });
          }}
          error={errors.warrantyYears}
          helperText={errors.warrantyYears ? "Warranty years is required" : ""}
        />
        <FormControlLabel
          control={
            <Switch
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          }
          label="Available"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
