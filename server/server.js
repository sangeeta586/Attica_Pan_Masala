const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

// Middleware and Config
const errorHandler = require("../server/middleware/errorHandler");
const connectDb = require("./config/dbConnection");

// Import Route Handlers
const locationRoutes = require("./routes/locationRoute");
const administratorRoutes = require("./routes/managementRoutes");
const executiveRoutes = require("./routes/stockistRoutes");
const deliveryBoysRoutes = require("./routes/deliveryBoysRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRouter");
const itemRoutes = require("./routes/itemRouter");
const purchaseRoutes = require("./routes/purchaseRouter");
const supplierRoutes = require("./routes/supplierRouter");
const itemStocksRoutes = require("./routes/itemStocksRouter");
const productRoutes = require("./routes/productRouter");
const productStockRoutes = require("./routes/productStockRoutes");
const sellerRoutes = require("./routes/sellerRouter");
const suppliesRoutes = require("./routes/suppliesRouter");
const orderRoutes = require("./routes/orderRouter");
const countryStateCitiesRoutes = require("./routes/countryStateCitiesRouter");
const salesRoutes = require("./routes/salesRouter");
const adminSalesRoutes = require("./routes/adminSalesRouter");
const superStockistSignupRoutes = require("./routes/superStockistRoutes");

const superStockistProductDetailsRoutes = require("./routes/superStockistProductDetailsRoutes");
const stockistOrderRoutes = require("./routes/stockistRouters");
const panShopOrderRoutes = require("./routes/panShopRoutes");
const panShopLoginRoutes = require("./routes/panShopOwnerRoutes");
const sosRoutes = require("./routes/sosRoutes");
const sosAlertRoutes = require("./routes/SosAlertRouters");
const adminRoute = require("./routes/adminRoute");

const productEcomm = require("./routes/productEommRoutes")
const path = require('path')

// Initialize the Database
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use("/api/administrators", administratorRoutes);
app.use("/api/executives", executiveRoutes);
app.use("/api/qrGeneraterBoy", deliveryBoysRoutes);
app.use("/api/forgetPassword", authRoutes);
app.use("/api/resetPassword", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/itemStocks", itemStocksRoutes);
app.use("/api/product", productRoutes);
app.use("/api/productStock", productStockRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/supplies", suppliesRoutes);
app.use("/api/order", orderRoutes);
app.use("/api", countryStateCitiesRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api", adminSalesRoutes);
app.use("/api/superstockist", superStockistSignupRoutes);

app.use("/api/superStockistProductDetails", superStockistProductDetailsRoutes);
app.use("/api/stockist/order", stockistOrderRoutes);
app.use("/api/panshop/order", panShopOrderRoutes);
app.use("/api/panShopLogin", panShopLoginRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/sosAlert", sosAlertRoutes);
app.use("/api/location", locationRoutes);
// app.use("/api/qrGeneraterBoy", require("./routes/qrGeneraterBoyRoutes"));
app.use("/api/panShopOwner", require("./routes/PanShopOwnerRouter"));
app.use("/api/admin",adminRoute)

app.use("/api/producteomm" , productEcomm)


// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
