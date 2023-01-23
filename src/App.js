// import logo from './logo.svg';
// import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
// import {Container, AppBar, Typhography, Grow, Grid} from '@material-ui/core';
// component
import MenuNavbar from "./components/MenuNavbar";
import Footer from "./components/footer";
// page
import HomePage from "./screen/HomePage";
import AboutUs from "./screen/AboutUs";
import Contact from "./screen/Contact";
import Shop from "./screen/Shop";
import Blog from "./screen/Blog";
import ProductDetail from "./screen/ProductDetail";
import Cart from "./screen/Cart";
import Checkout from "./screen/Checkout";
import BlogDetail from "./screen/BlogDetail";
// import Breadcrumbs from './components/Breadcrumbs';
export default function App() {
  return (
    <div>
      {/* <dataFetching/> */}
      <MenuNavbar />

      {/* <Breadcrumbs/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/BlogDetail" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}
