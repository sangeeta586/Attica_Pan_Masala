import React, { useEffect } from "react";

import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import ExecutiveDashBoard from "./pages/Executive/ExecutiveDashBoard";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar/Navbar";
import Category from "./pages/Category/Category";
import Items from "./pages/Items/Items";
import Purchases from "./pages/Purchases/Purchases";
import ItemStock from "./pages/ItemStock/ItemStock";  
import ProductStock from "./pages/ProductStock/ProductStock";
import Seller from "./pages/Seller/Seller";
import Supplies from "./pages/Supplies/Supplies";
import Orders from "./pages/Orders/Orders";
import DashBoard from "./Components/DashBoard/DashBoard";
import EditCategory from "./utils/Modal/Category/EditCategory";
import Supplier from "./pages/Suppliers/Supplier";
import Products from "./pages/Products/Products";
import EditSupplier from "./utils/Modal/Supplier/EditSupplier";
import EditItemsStock from "./utils/Modal/ItemStock/EditItemsStock";
import EditProductStock from "./utils/Modal/ProductStock/EditProductStock";
import EditOrder from "../src/utils/Modal/Order/EditOrder";
import EditSeller from "../src/utils/Modal/Seller/EditSeller";
import EditProduct from "../src/utils/Modal/Products/EditProduct";
import Sales from "./pages/Sales/Sales";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Superstockist from "./pages/SuperStockist/SuperStockist";
import ProductDetails from "./pages/SuperStockist/ProductDetails";
import MyOrders from "./pages/MyOrders";
import SuperStockistLogin from "./pages/SuperStockist/SuperStockistLogin";
import RegisterForm from "./pages/Management/Register/RegisterForm";
import ManagementLogin from "./pages/Management/ManagementLogin";
import ManagementDashboard from "./pages/Management/ManagementDashboard";
import OrderHomepage from "./pages/Management/Order/OrderHomepage";
import SuperStockistDetails from "./pages/Management/SuperStockistDetails";
import SuperstockistRegister from "./pages/Management/Register/SuperstockistRegister";
import StockistDetails from "./pages/Management/StockistDetails";
import DeliveryboyDetails from "./pages/Management/DeliveryboyDetails";
import StockistRegister from "./pages/Management/Register/StockistRegister";
import PanshowDetails from "./pages/Management/PanshowDetails";
import ExecutiveOrderHomePage from "./pages/Executive/Orders/ExecutiveOrderHomepage";
import SosHomepage from "./pages/Management/SOS/SosHomepage";
import SosRegister from "./pages/Management/SOS/SosRegister";
import DeliveryBoyTracker from "./pages/Management/DeliveryBoyTracker/DeliveryBoyTracker";
import DeliveryBoyResetPassword from "./pages/Management/DeliveryBoyResetPassword";
import SuperStockistResetPassword from "./pages/Management/SuperStockistResetPassword";
import ManagementUser from "./pages/Admin/ManagementUser";
import ManagementUserResetPassword from "./pages/Admin/ManagementUserResetPassword";
import { ManagementDetails } from "./pages/Admin/MangementDeteails";
import AdminRegister from "./pages/Admin/AdminRegister";
import DeliveryBoyDetails from "./pages/AllUserDetails/DeliveryBoyDetails";
import {SuperStockistProfile} from "./pages/AllUserDetails/SuperStockistProfile";
import AddProduct from "./pages/Management/ManagementChart/AddProduct";
import SuperStockistOrderHomePage from "./pages/SuperStockist/Order/SuperStockistOrderHomePage";

import SuperStockistDevelivey from "./pages/SuperStockist/SuperStockistDevelivey";

import DeliveryBoy from "./pages/Executive/DeliveryBoy/DeliveryBoy";
import SuperStockist from "./pages/Management/Manage/SuperStockist/SuperStockist";
import Stockist from "./pages/Management/Manage/stockist/Stockist";
import FieldManager from "./pages/Management/Manage/fieldManager/FieldManager";
import SuperStockistDashboard from "./pages/Management/Manage/SuperStockist/SuperStockistDashboard";
import StockistDashBoard from "./pages/Management/Manage/stockist/StockistDashBoard";
import { TrackOrder } from "./pages/AllUserDetails/TrackOrder";


import ListOfRegisteredField from "./pages/Management/Manage/fieldManager/registerd/ListOfRegisterdField";

import { AreaSealManagerDetails } from "./pages/Management/AreaSealManagerDetails";
import { AreaMangerTacker } from "./pages/Management/DeliveryBoyTracker/AreaMangerTacker";
import RegisterOrEditFieldManager from "./pages/Management/Manage/fieldManager/registerd/RegisterOrEditFieldManager";
import ListOfInspection from "./pages/Management/InspectionShop/ListOfInspection";
import { FieldMaangerTracker } from "./pages/Management/FieldManagerTracker/FieldMaangerTracker";
import ShowCaseList from "./pages/Management/ShowCase/ShowCaseList";
import ListOfRegisterdFieldMangerAdmin from "./pages/Management/Manage/fieldManagerAdmin/registerd/ListOfRegisterdFieldMangerAdmin";
import FieldManagerAdmin from "./pages/Management/Manage/fieldManagerAdmin/FieldManagerAdmin";




function App() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (
      pathname === '/signup' ||
      pathname === '/ForgetPassword' ||
      pathname === '/ResetPassword' ||
      pathname === `/superstockistLogin/${routesName}` ||
      pathname === `/managementLogin/${routesName}`
    ) {
      if (email) {
        localStorage.clear(); // Remove email from localStorage
        navigate(`${pathname}`); // Navigate to the current route
      }
    }
  }, [pathname, email, navigate]);

  const routesName = "$2a$04$YfW4xcTH6aSEkkxIcTu/C.waONt/RaiJjPr09ybf9vTo5UFkWPtqS$2a$04$YfW4xcTH6aSEkkxIcTu/C.waONt/RaiJjPr09ybf9vTo5UFkWPtqS$2a$04$YfW4xcTH6aSEkkxIcTu/C.waONt/RaiJjPr09ybf9vTo5UFkWPtqS"
  
  return (
    <div className="App"   style={{
      width: "100%",  // Use 100% for better responsiveness, avoid hard-coded values like 108%
      maxWidth: "100vw", // Ensure it doesn't overflow the viewport
      margin: "0 auto", // Centering the content horizontally
      backgroundColor: "#f7f7f7", // Light background color for contrast
      padding: "20px", // Add padding for spacing around content
    }}>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/" element={<Login routesName={routesName} />} />
        <Route path="/Admin-Register" element={<AdminRegister />} />

        {!email && (


          <>
            
         
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path={`/superstockistLogin/${routesName}`} element={<SuperStockistLogin />} />

            <Route path={`/managementLogin/${routesName}`} element={<ManagementLogin />} />
          </>
        )}
        {email && (
          <>
            <Route path="/adminDashboard" element={<AdminDashBoard />} />
            <Route path="/managementuser" element={<ManagementUser />} />
            <Route
              path="/managementresetpassword"
              element={<ManagementUserResetPassword />}
            />
            <Route path="/management-deteils" element={<ManagementDetails/>} />
            <Route
              path="/executiveDashboard"
              element={<ExecutiveDashBoard />}
            />
            
            <Route path="/category" element={<Category />} />
            <Route path="/items" element={<Items />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/itemStock" element={<ItemStock />} />
            <Route path="/itemStock/:id" element={<EditItemsStock />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<EditProduct />} />
            <Route path="/productStock" element={<ProductStock />} />
            <Route path="/productStock/:id" element={<EditProductStock />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/seller/:id" element={<EditSeller />} />
            <Route path="/supplies" element={<Supplies />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/supplier/:id" element={<EditSupplier />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/category/:id" element={<EditCategory />} />
            <Route path="/orders/:id" element={<EditOrder />} />
            <Route path="/sales" element={<Sales />} />
            <Route path={`/superStockist/${routesName}`} element={<Superstockist />} />
            <Route path="/product-details" element={<ProductDetails />} />

            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/orderItems" element={<ExecutiveOrderHomePage />} />

            <Route path="/deliveryboys" element={<DeliveryBoy />} />

            <Route path="/panshowDetails" element={<PanshowDetails />} />
            <Route path="/stockistDetails" element={<StockistDetails />} />
            <Route
              path="/superstockistDetails"
              element={<SuperStockistDetails />}
            />
            <Route
              path="/superstockistRegister"
              element={<SuperstockistRegister />}
            />

            <Route path="/registeredFieldManager" element={<RegisterOrEditFieldManager/>}/>
            <Route path="/ListofregisteredFieldManager" element={<ListOfRegisteredField/>}/>

            <Route
              path="/deliveryboyDetails"
              element={<DeliveryboyDetails />}
            />
            <Route
              path="/resetpassworddeliveryboy"
              element={<DeliveryBoyResetPassword />}
            />
            <Route
              path="/resetpasswordsuperstockist"
              element={<SuperStockistResetPassword />}
            />
            <Route path="/stockistRegister" element={<StockistRegister />} />
            <Route
              path="/managementDashboard"
              element={<ManagementDashboard />}
            />
            <Route path="/orderHistory" element={<OrderHomepage />} />
            <Route path="/registerForm" element={<RegisterForm />} />

            <Route path="/sos-homepage" element={<SosHomepage />} />
            <Route
              path="/deliveryBoyTracker"
              element={<DeliveryBoyTracker />}
            />
            <Route path="/sos-register" element={<SosRegister />} />

            <Route
              path="/SuperStockist-Order"
              element={<SuperStockistOrderHomePage />}
            />
            <Route path="/DeliveryboyDetails/:id/:name" element={<DeliveryBoyDetails />} />
            <Route
              path="/productadded"
              element={<AddProduct/>}
            />
            <Route path="/superStockitDetails/:id/:name" element={<SuperStockistProfile />} />
            <Route path="/superStockitDetailsDeliveryboyDetails" element={<SuperStockistDevelivey />} />
            <Route path="/manage/superStockit" element={<SuperStockist />} />
            <Route path="/manage/stockit" element={<Stockist />} />
            <Route path="/manage/Field-Executive" element={<FieldManager/>}/>
           < Route path="/manage/superStockist/dashboard" element={<SuperStockistDashboard/>}/>
           <Route path="/manage/stockist/dashboard" element={<StockistDashBoard/>} />
           
           <Route path="/manage/stockist/details" element={<StockistDetails/>}/>

            <Route path="/trackerOrder/:name" element={<TrackOrder />} />

            <Route path="/AreaSealManagerDetails" element={<AreaSealManagerDetails/>} />
            <Route path="/areaManagerTracker" element={<AreaMangerTacker/>} />

            <Route path="/management/inspection/shop" element={<ListOfInspection/>}/>
            <Route path = "/field-executive/details" element={<FieldMaangerTracker/>}/>

            <Route path = "/showCase" element={<ShowCaseList/>}/>

            <Route path = "/Field-Executive-Approval" element={<ListOfRegisterdFieldMangerAdmin/>}/>

            <Route path = "/mange/Field-Executive-Approval" element={<FieldManagerAdmin/>}/>





          </>
        )}
      </Routes>
    </div>
  );
}

export default App;