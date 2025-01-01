import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate for redirection

import "./index.css";
import App from "./App.jsx";
import RegisterFieldManager from "./components/Login/RegisterFieldManager.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import InspectionList from "./pages/InspectionList.jsx";
import ShowCaseList from "./pages/ShowCase/ShowCaseList.jsx";
import ShopInspection from "./pages/reports/ShopInspection.jsx";
import { ShowCasePage } from "./pages/reports/ShowCasePage.jsx";
import ShopInspectionModule from "./pages/reports/ShopInspectionModule.jsx";
import VendorNotIntrestedModule from "./pages/reports/VendorNotIntrestedModule.jsx";

// Render the application with routing
import FEADashbord from "./pages/fieldExecutiveApproval/FEADashbord.jsx";
import NotFound from "./components/NotFound.jsx";
import ListOfRegisterdField from "./pages/fieldExecutiveApproval/fieldManager/FieldManager.jsx";
import FEAShowCase from "./pages/fieldExecutiveApproval/ShowCase/FEAShowCase.jsx";
import ListOfReview from "./pages/reports/ListOfReview.jsx";
import ListOfInspection from "./pages/fieldExecutiveApproval/InspectionShop/ListOfInspection.jsx";
import RejectVendor from "./pages/fieldExecutiveApproval/InspectionShop/RejectVendor.jsx";
import VerifiedVendor from "./pages/fieldExecutiveApproval/InspectionShop/VerifiedVendor.jsx";
import VendorNotInterested from "./pages/fieldExecutiveApproval/InspectionShop/VendorNotInterested.jsx";

// Get the user's role from localStorage
const role = localStorage.getItem("role");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default Home Route */}
        <Route path="/" element={<App />} />

        {/* Routes accessible to all users */}
        <Route path="/register" element={<RegisterFieldManager />} />
        <Route path="/fieldManagerDashboard" element={<Dashboard />} />
        <Route path="/Pending-Verification" element={<ShopInspection />} />
        <Route path="/Verified-Vender" element={<InspectionList />} />
        <Route path="/showcase" element={<ShowCasePage />} />
        <Route path="/showcaseList" element={<ShowCaseList />} />
        <Route path="/Add-New-Vendor" element={<ShopInspectionModule />} />
        <Route path="/ListOfReview" element={<ListOfReview />} />
        <Route
          path="/vendor-not-intrested"
          element={<VendorNotIntrestedModule />}
        />
        {/* Route for RegisterFieldManager page */}
        {/* Add more routes as needed */}

        {/* Conditionally render the Field Executive Approval Dashboard for admin */}
        {role == "Admin" ? (
          <>
            <Route
              path="/Field-Executive-Approval-Dashboard"
              element={<FEADashbord />}
            />
            <Route
              path="/Field-Executive-Approval/showcase"
              element={<FEAShowCase />}
            />
            <Route
              path="/Field-Executive-Approval/field-executive"
              element={<ListOfRegisterdField />}
            />
            <Route
              path="/Field-Executive-Approval/Pending-Verification"
              element={<ListOfInspection
                 />}
            />
            <Route
              path="/Field-Executive-Approval/Reject-Verification"
              element={<RejectVendor
                 />}
            />
            <Route
              path="/Field-Executive-Approval/Verified-Verification"
              element={<VerifiedVendor
                 />}
            />
             <Route
              path="/Field-Executive-Approval/Vendor-Not-Interested"
              element={<VendorNotInterested
                 />}
            />
          </>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}

        {/* Handle undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
