import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import "./style/menuNavBar.css";
import axios from "axios";
import ApiService from "../services/api-service";

export default function MenuNavbar({ click }) {
  const [companys, setCompanys] = useState();
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";

  const userId = user ? user.user.id : "";
  const [countNumCartItem, setCountNumCartItem] = useState(0);
  const [countNumWishlistItem, setCountNumWishlistItem] = useState(0);

  useEffect(() => {
    axios
      .all(
        [
          axios.get(`http://localhost:4000/api/v1/companys`),
          axios.get("http://localhost:4000/api/v1/categories"),
          token &&
            axios.get(
              `http://localhost:4000/api/v1/shoppingcarts/get/cart_item_count/${userId}`
            ),
          token &&
            axios.get(
              `http://localhost:4000/api/v1/shoppingcarts/get/wishlist_item_count/${userId}`
            ),
        ].filter(Boolean)
      )
      .then(
        axios.spread(
          (
            companyResponse,
            categoryResponse,
            cartResponse,
            wishlistResponse
          ) => {
            setCompanys(companyResponse.data);
            setCategories(categoryResponse.data);
            token && setCountNumCartItem(cartResponse.data);
            token && setCountNumWishlistItem(wishlistResponse.data);
          }
        )
      );
  }, []);

  const logout = () => {
    <Navigate to="/" />;
    if (token) {
      ApiService.updateActive("users", user.user.id, { active: false });
      localStorage.clear("token");
      window.location.reload(true);
    }
  };
  return (
    <>
      <div>
        {/* Offcanvas Menu Begin */}
        <div className="offcanvas-menu-overlay" />
        <div className="offcanvas-menu-wrapper">
          <div className="offcanvas__option">
            <div className="offcanvas__links">
              {!token ? (
                <Link to="/login" onClick={click}>
                  Sign In
                </Link>
              ) : (
                <span className="dropdown open">
                  <a
                    style={{
                      width: "45px",
                      height: "45px",
                      backgroundImage: `url(${user.user.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "100%",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="rounded-circle p-0 m-0 border broder-5 border-danger"
                  />
                  <div className="user-dropdown">
                    <ul>
                      {user.user.isAdmin ? (
                        <li>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              window.location.href = "http://localhost:3000/";
                            }}
                          >
                            AdminDashboard<i class="fa fa-dashboard ms-2"></i>
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      <li>
                        <NavLink to="/my-dashboard">
                          My Dashboard<i className="fas fa-home ms-2"></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/my-account">
                          My Account<i className="fas fa-crown ms-2"></i>
                        </NavLink>
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
                </span>
              )}
            </div>
          </div>
          <div className="offcanvas__nav__option">
            <Link to="/shop">
              <i class="fa fa-shopping-cart text-dark" aria-hidden="true"></i>
            </Link>
            <Link to="/shop/wishlist">
              <img src="img/icon/heart.png" />
            </Link>
            <Link to="/shop/cart">
              <img src="img/icon/cart.png" />
            </Link>
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
          <div className="col-md-3">
            <div className="header__logo p-0 pt-2">
              {companys &&
                companys.map((company) => (
                  <Link to="/" key={company._id}>
                    <img src={company.logo} width="150" />
                  </Link>
                ))}
            </div>
          </div>
          <div className="col-md-6">
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <NavLink to="/">
                    <i className="fas fa-home me-2"></i>Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop">Shop</NavLink>
                  <ul className="dropdown">
                    {categories &&
                      categories.map((category) => (
                        <li key={category._id}>
                          <NavLink
                            to={`/shop/product_category/${category._id}`}
                          >
                            {category.name}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  <NavLink to="/aboutus">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-3">
            <div className="header__nav__option">
              {token ? (
                <>
                  <Link to="/shop/wishlist">
                    {countNumWishlistItem.countWishlistItem ? (
                      <>
                        <i
                          className="fas fa-heart"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                        <span style={{ backgroundColor: "red" }}>
                          {countNumWishlistItem.countWishlistItem}
                        </span>
                      </>
                    ) : (
                      <>
                        <i
                          className="far fa-heart"
                          style={{ fontSize: "22px", color: "black" }}
                        ></i>
                        <span style={{ backgroundColor: "black" }}>0</span>
                      </>
                    )}
                  </Link>
                  <Link to="/shop/cart">
                    {countNumCartItem.countCartItem ? (
                      <>
                        <i
                          className="fas fa-shopping-bag"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                        <span style={{ backgroundColor: "red" }}>
                          {countNumCartItem.countCartItem}
                        </span>
                      </>
                    ) : (
                      <>
                        <i
                          className="fas fa-shopping-bag"
                          style={{ fontSize: "24px", color: "black" }}
                        ></i>
                        <span style={{ backgroundColor: "black" }}>0</span>
                      </>
                    )}
                  </Link>
                  <span className="dropdown open">
                    <a
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundImage: `url(${user.user.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="rounded-circle p-0 m-0 border broder-5 border-danger"
                    />
                    <div className="user-dropdown">
                      <ul>
                        {user.user.isAdmin ? (
                          <li>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                window.location.href = "http://localhost:3000/";
                              }}
                            >
                              AdminDashboard<i class="fa fa-dashboard ms-2"></i>
                            </a>
                          </li>
                        ) : (
                          ""
                        )}
                        <li>
                          <NavLink to="/my-dashboard">
                            My Dashboard<i className="fas fa-home ms-2"></i>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/my-account">
                            My Account<i className="fas fa-crown ms-2"></i>
                          </NavLink>
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
                  </span>
                </>
              ) : (
                <span className="dropdown open">
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
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars" />
        </div>
      </div>
    </>
  );
}
