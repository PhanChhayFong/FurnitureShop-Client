import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import ApiService from "../services/api-service";

export default function Footer({ click }) {
  const [companys, setCompanys] = useState();
  const [categories, setCategories] = useState([]);
  const [navigate, setNavigate] = useState(false);
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:5000/api/v1/companys"),
        axios.get("http://localhost:5000/api/v1/categories"),
      ])
      .then(
        axios.spread((companyResponse, categoryResponse) => {
          setCompanys(companyResponse.data);
          setCategories(categoryResponse.data);
        })
      );
    // }, [setCompanys, setCategories]);
  }, []);

  const logout = () => {
    if (token) {
      ApiService.updateActive("users", user.user.id, { active: false });
      localStorage.clear("token");
      setNavigate(true);
    }
  };
  if (navigate) {
    return <Navigate to="/" />;
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {companys &&
            companys.map((company) => (
              <div className="col-lg-3 col-md-6 col-sm-6 order-1 order-lg-1" key={company._id}>
                <div className="footer__about text-center">
                  <div className="footer__logo">
                    <Link to="/" className="text-center">
                      {" "}
                      <img src={company.logo} />{" "}
                    </Link>
                  </div>
                  <h3 className="text-light fw-bold">{company.name}</h3>
                  <p className="m-2">
                    <span>
                      {" "}
                      <i className="fas fa-envelope me-2"></i>{" "}
                    </span>
                    <a
                      href="mailto:{company.email}"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      {" "}
                      {company.email}{" "}
                    </a>
                  </p>
                  <p className="m-2">
                    <span>
                      {" "}
                      <i className="fas fa-phone-square-alt me-2"></i>{" "}
                    </span>
                    <a
                      href="tel:{company.telephone}"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      {" "}
                      {company.telephone}{" "}
                    </a>
                  </p>
                  <p>
                    <span>
                      <i className="far fa-map me-2"></i>
                    </span>
                    {company.address}
                  </p>
                </div>
              </div>
            ))}

          <div className="col-lg-3 col-md-6 col-sm-6 mx-auto order-3 order-lg-2">
            <div className="footer__widget text-center">
              <h6>Useful Links</h6>
              <ul className="m-0 p-0">
                {categories.map((category) => (
                  <li key={category._id}>
                    <NavLink
                      to={`/shop/product_category/${category._id}`}
                      onClick={scrollToTop}
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 order-4 order-lg-3">
            <div className="footer__widget text-center text-md-start">
              <h6>User Account</h6>
              <ul className="m-0 p-0">
                {token ? (
                  <>
                    <li>
                      <NavLink onClick={scrollToTop} to="/my-dashboard">
                        <i className="fas fa-home me-2"></i>My Dashboard
                      </NavLink>{" "}
                    </li>
                    <li>
                      <NavLink onClick={scrollToTop} to="/my-account">
                        <i className="fas fa-crown me-2"></i>My Account
                      </NavLink>{" "}
                    </li>
                    <li>
                      <NavLink onClick={scrollToTop} to="/cart">
                        <i className="fas fa-shopping-cart me-2"></i>Shopping
                        Cart
                      </NavLink>{" "}
                    </li>
                    <li>
                      <NavLink onClick={scrollToTop} to="/wishlist">
                        <i className="fas fa-shopping-bag me-2"></i>Wishlist
                      </NavLink>{" "}
                    </li>
                    <li>
                      <NavLink onClick={scrollToTop} to="/checkout">
                        <i className="fas fa-cash-register me-2"></i>Order
                      </NavLink>{" "}
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          logout();
                          scrollToTop();
                        }}
                      >
                        <i className="fas fa-door-open me-2"></i>Logout
                      </Link>{" "}
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" onClick={click}>
                        Sign In<i className="fas fa-sign-in-alt ms-2"></i>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link to="/sign-up">
                        Sign Up <i className="fas fa-user-plus ms-2"></i>
                      </Link>{" "}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 text-center order-2 order-lg-4">
            <div className="footer__widget">
              <h6>Our Shop Location</h6>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13274.837857384235!2d104.87147572721516!3d11.564707895998772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRUPP%20(Royal%20University%20of%20Phnom%20Penh)!5e0!3m2!1sen!2skh!4v1673066052086!5m2!1sen!2skh"
                height={250}
                width="100%"
                tabIndex={0}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            {companys &&
              companys.map((company) => (
                <div className="footer__copyright__text">
                  <p>
                    Copyright ©
                    <span className="me-2">{new Date().getFullYear()}.</span>
                    All rights reserved | By <Link to="/">{company.name}</Link>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
