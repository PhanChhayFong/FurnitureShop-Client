// import logo from './logo.svg';
// import './App.css';
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
// component
import MenuNavbar from "./components/MenuNavbar";
import Footer from "./components/footer";
import ApiService from "./services/api-service";
// page
import HomePage from "./screen/HomePage";
import AboutUs from "./screen/AboutUs";
import Contact from "./screen/Contact";
import Shop from "./screen/Shop";

import ProductDetail from "./screen/ProductDetail";
import ProductCategory from "./screen/ProductCategory";
import Cart from "./screen/Cart";
import Wishlist from "./screen/Wishlist";
import Checkout from "./screen/Checkout";

import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

import MyDashboard from "./screen/MyDashboard";
import OrderDetail from "./screen/OrderDetail";
import MyAccount from "./screen/MyAccount";

// page 404 not found
import Page404 from "./screen/page404";

export default function App() {
  const [stripeAPIKey, setStripeAPIKey] = useState("");

  <Navigate to="/login" />;
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/payments/stripeapi")
      .then((res) => setStripeAPIKey(res.data));
    if (!token) {
      <Navigate to="/" />;
    } else {
      const item = JSON.parse(token);
      const expItem = new Date(item.expDate);
      const now = new Date();
      if (now.getTime() > expItem) {
        ApiService.updateActive("users", item.user.id, { active: false });
        localStorage.clear("token");
        <Navigate to="/" />;
        window.location.reload(true);
      }
    }
  }, []);
  return (
    <Router>
      <MenuNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product_detail/:id" element={<ProductDetail />} />
        <Route
          path="/shop/product_category/:id"
          element={<ProductCategory />}
        />
        <Route
          path="/shop/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        {stripeAPIKey && (
          <Route
            path="/checkout"
            element={
              <Elements stripe={loadStripe(stripeAPIKey)}>
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              </Elements>
            }
          />
        )}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route
          path="/my-dashboard"
          element={
            <ProtectedRoute>
              <MyDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/my-dashboard/order-detail/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}
