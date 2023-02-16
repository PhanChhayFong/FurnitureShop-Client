import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./style/menuNavBar.css";
import axios from "axios";
import ApiService from "../services/api-service";

export default function MenuNavbar({ click }) {
  const [companys, setCompanys] = useState();
  const [categories, setCategories] = useState([]);
  const [navigate, setNavigate] = useState(false);
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";

  const userId = user ? user.user.id : "";
  const [countNumCartItem, setCountNumCartItem] = useState(0);
  const [countNumWishlistItem, setCountNumWishlistItem] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/companys")
      .then((res) => setCompanys(res.data));
    axios
      .get("http://localhost:5000/api/v1/categories")
      .then((res) => setCategories(res.data));
    if(token){axios
      .get(
        `http://localhost:5000/api/v1/shoppingcarts/get/cart_item_count/${userId}`
      )
      .then((res) => setCountNumCartItem(res.data));
    axios
      .get(
        `http://localhost:5000/api/v1/shoppingcarts/get/wishlist_item_count/${userId}`
      )
      .then((res) => setCountNumWishlistItem(res.data));}
  }, []);


  const logout = () => {
    if (token) {
      ApiService.updateActive("users", user.user.id, { active: false });
      localStorage.clear("token");
      setNavigate(true);
    }
  };
  if (navigate) return <Navigate to="/" />;

  return (
    <nav>
      <div>
        {/* Offcanvas Menu Begin */}
        <div className="offcanvas-menu-overlay" />
        <div className="offcanvas-menu-wrapper">
          <div className="offcanvas__option">
            <div className="offcanvas__links">
              <a href="#">Sign in</a>
              <a href="#">FAQs</a>
            </div>
            <div className="offcanvas__top__hover">
              <span>
                Usd <i className="arrow_carrot-down" />
              </span>
              <ul>
                0.00
                <li>USD</li>
                <li>EUR</li>
                <li>USD</li>
              </ul>
            </div>
          </div>
          <div className="offcanvas__nav__option">
            <a href="#" className="search-switch">
              <img src="img/icon/search.png" />
            </a>
            <a href="#">
              <img src="img/icon/heart.png" />
            </a>
            <a href="#">
              <img src="img/icon/cart.png" /> <span>0</span>
            </a>
            <div className="price">$0.00</div>
          </div>
          <div id="mobile-menu-wrap" />
          <div className="offcanvas__text">
            <p>Free shipping, 30-day return or refund guarantee.</p>
          </div>
        </div>
        {/* Offcanvas Menu End */}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="header__logo">
              {companys &&
                companys.map((company) => (
                  <Link to="/" key={company._id}>
                    <img src={company.logo} width="80" />
                  </Link>
                ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                  <ul className="dropdown">
                    {categories &&
                      categories.map((category) => (
                        <li key={category._id}>
                          <Link to="/aboutus">{category.name}</Link>
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="header__nav__option">
              <Link to="#" className="search-switch">
                <img src="img/icon/search.png" width="22" />
              </Link>

              {token ? (
                <>
                  <Link to="/wishlist">
                    <img src="img/icon/heart.png" width="22" />
                    <span style={{ marginLeft: "3px" }}>
                      {countNumWishlistItem
                        ? countNumWishlistItem.countWishlistItem
                        : "0"}
                    </span>
                  </Link>
                  <Link to="/cart" className="dropdown open">
                    <img src="img/icon/cart.png" width="22" />
                    <span style={{ marginLeft: "3px" }}>
                      {countNumCartItem ? countNumCartItem.countCartItem : "0"}
                    </span>
                  </Link>
                  <a className="dropdown open">
                    <img
                      src={user.user.image}
                      style={{ width: "30px", height: "30px" }}
                      className="rounded-circle  border broder-5 border-danger"
                    />
                    <div className="user-dropdown">
                      <ul>
                        <li>
                          <Link to="/my-dashboard">
                            My Dashboard<i className="fas fa-home ms-2"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="/my-account">
                            My Account<i className="fas fa-crown ms-2"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => {
                              logout();
                            }}
                          >
                            Logout<i className="fas fa-door-open ms-2"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </a>
                </>
              ) : (
                <>
                  <a className="dropdown open">
                    <i className="fas fa-user-circle ms-3 fs-5 my-auto text-dark"></i>
                    <div className="user-dropdown">
                      <ul>
                        <li>
                          <Link to="/login" onClick={click}>
                            Sign In<i className="fas fa-sign-in-alt ms-2"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="/sign-up">
                            Sign Up <i className="fas fa-user-plus ms-2"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars" />
        </div>
      </div>
    </nav>
  );
}
