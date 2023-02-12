import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import "./style/menuNavBar.css";
import axios from "axios";
import ApiService from "../services/api-service";

export default function MenuNavbar({ click }) {
  const [companys, setCompanys] = useState();
  const [categories, setCategories] = useState([]);
  const [reRender, setReRender] = useState(false);

  const [navigate, setNavigate] = useState(false);
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";

  const userId = user ? user.user.id : "";
  const [countNumCartItem, setCountNumCartItem] = useState(0);

  useEffect(() => {
    setReRender(false);
    axios
      .get("http://localhost:5000/api/v1/companys")
      .then((res) => setCompanys(res.data))
      .catch((err) => console.log(err));
    if (userId != "")
      axios
        .get(
          `http://localhost:5000/api/v1/shoppingcarts/get/cart_item_count/${userId}`
        )
        .then((res) => setCountNumCartItem(res.data))
        .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/api/v1/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, [reRender]);
  const logout = () => {
    setReRender(true);
    window.location.reload(true);
    if (token)
      ApiService.updateActive("users", user.user.id, { active: false });
    localStorage.clear("token");
    setNavigate(true);
  };
  if (navigate) return <Navigate to="/" />;

  const redirect = () => {
    window.location.href = "http://localhost:3000/";
    return null;
  };
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
                USD <i className="arrow_carrot-down" />
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
                    <img src={company.logo} height="100" />
                  </Link>
                ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/shop">Shop</NavLink>
                </li>
                {/* <li><Link to="#">Pages</Link>
                    <ul className="dropdown">
                      <li><NavLink to="/aboutus">About Us</NavLink></li>
                      <li><NavLink to="/productdetail">Shop Details</NavLink></li>
                      <li><NavLink to="/cart">Shopping Cart</NavLink></li>
                      <li><NavLink to="/checkout">Check Out</NavLink></li>
                      <li><NavLink to="/blogdetail">Blog Details</NavLink></li>
                    </ul>
                  </li> */}
                <li>
                  <NavLink to="/aboutus">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/blog">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="header__nav__option">
              <div className=" d-flex align-items-center justify-content-center">
                <Link className="search-switch">
                  <img src="img/icon/search.png" width="22" />
                </Link>

                {token ? (
                  <>
                    <Link>
                      <img src="img/icon/heart.png" width="22" />
                    </Link>
                    <Link to="/cart" className="dropdown open">
                      <img
                        src="img/icon/cart.png"
                        className="dropdown-toggle"
                        width="22"
                      />{" "}
                      <span>
                        {countNumCartItem
                          ? countNumCartItem.countCartItem
                          : "0"}
                      </span>
                      <div className="cart-dropdown">
                        <div className="cart-list">
                          <div className="product-widget">
                            <div className="product-img">
                              <img src="./img/shopping-cart/cart-1.jpg" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <a href="#">product name goes here</a>
                              </h3>
                              <h4 className="product-price">1x $980.00</h4>
                            </div>
                            <button className="delete">
                              <i className="fa fa-close" />
                            </button>
                          </div>
                          <div className="product-widget">
                            <div className="product-img">
                              <img src="./img/shopping-cart/cart-2.jpg" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <a href="#">product name goes here</a>
                              </h3>
                              <h4 className="product-price">1x $980.00</h4>
                            </div>
                            <button className="delete">
                              <i className="fa fa-close" />
                            </button>
                          </div>
                          <div className="product-widget">
                            <div className="product-img">
                              <img src="./img/shopping-cart/cart-3.jpg" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <a href="#">product name goes here</a>
                              </h3>
                              <h4 className="product-price">1x $980.00</h4>
                            </div>
                            <button className="delete">
                              <i className="fa fa-close" />
                            </button>
                          </div>
                          <div className="product-widget">
                            <div className="product-img">
                              <img src="./img/shopping-cart/cart-4.jpg" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <a href="#">product name goes here</a>
                              </h3>
                              <h4 className="product-price">1x $980.00</h4>
                            </div>
                            <button className="delete">
                              <i className="fa fa-close" />
                            </button>
                          </div>
                        </div>
                        <div className="cart-summary">
                          <small>3 Item(s) selected</small>
                          <h5>SUBTOTAL: $2940.00</h5>
                        </div>
                        <div className="cart-btns">
                          <Link to="/cart">
                            View Cart <i className="far fa-eye ms-1" />
                          </Link>
                          <Link to="/checkout">
                            Checkout{" "}
                            <i className="fa fa-arrow-circle-right ms-1" />
                          </Link>
                        </div>
                      </div>
                    </Link>
                    <div className="price">$0.00</div>
                    <Link to="/" className="dropdown open">
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundImage: `url(${user.user.image})`,
                          backgroundSize: "100%",
                          backgroundPosition: "center",
                        }}
                        className="rounded-circle ms-2 border broder-5 border-primary"
                      />
                      <div className="user-dropdown">
                        <ul>
                          <li>
                            <Link onClick={() => redirect()}>
                              My Dashboard<i className="fas fa-home ms-2"></i>
                            </Link>
                          </li>
                          <li>
                            <Link onClick={() => logout()}>
                              Logout<i className="fas fa-door-open ms-2"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Link>
                  </>
                ) : (
                  <Link to="/" className="dropdown open">
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
                  </Link>
                )}
              </div>
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