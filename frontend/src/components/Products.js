import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectItems,
  selectTypes,
  initializeTypes,
  deleteProduct,
} from "../features/productsSlice";
import {
  Typography,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Chip,
  Button,
  Rating,
  Snackbar,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledTableHeadCell from "../components/StyledTableHeadCell";
import AddProductModal from "../components/AddProductModal";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectItems);
  const productsTypes = useSelector(selectTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [currentPage, setCurrentPage] = useState(0); // Commence à la première page
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(initializeTypes());
  }, [dispatch]);

  useEffect(() => {
    console.log("Product Types:", productsTypes);
  }, [productsTypes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProductOpen = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProductOpen = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddProductClose = () => {
    setModalOpen(false);
  };

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product._id));
    setSnackbarMessage("Product deleted successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage + productsPerPage;
  const indexOfFirstProduct = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "15px",
            marginTop: "15px",
            marginBottom: "15px",
            borderBottom: "1px solid #eceff3",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Products
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search product"
            variant="outlined"
            size="small"
            sx={{ width: "200px", marginRight: "10px" }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleAddProductOpen}
          >
            Add Product
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="tableHead">
              <TableRow>
                <StyledTableHeadCell>Product</StyledTableHeadCell>
                <StyledTableHeadCell>Price</StyledTableHeadCell>
                <StyledTableHeadCell>Rating</StyledTableHeadCell>
                <StyledTableHeadCell>Warranty (Years)</StyledTableHeadCell>
                <StyledTableHeadCell>Available</StyledTableHeadCell>
                <StyledTableHeadCell>Actions</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell sx={{ display: "block" }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#888e9d",
                        fontWeight: "bolder",
                      }}
                    >
                      {product.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {product.price} EUR
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={product.rating}>
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                        precision={0.5}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {product.warranty_years}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {product.available ? (
                      <Chip
                        size="small"
                        label="Available"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        size="small"
                        label="Not available"
                        color="error"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditProductOpen(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredProducts.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={productsPerPage}
          rowsPerPageOptions={[productsPerPage]}
        />
      </Container>
      <AddProductModal
        open={modalOpen}
        handleClose={handleAddProductClose}
        product={selectedProduct}
        productTypes={productsTypes}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Products;
