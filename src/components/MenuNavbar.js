import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate, redirect } from "react-router-dom";
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
      .all(
        [
          axios.get(`http://localhost:5000/api/v1/companys`),
          axios.get("http://localhost:5000/api/v1/categories"),
          token &&
            axios.get(
              `http://localhost:5000/api/v1/shoppingcarts/get/cart_item_count/${userId}`
            ),
          token &&
            axios.get(
              `http://localhost:5000/api/v1/shoppingcarts/get/wishlist_item_count/${userId}`
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
    <Navigate to="/" />
    if (token) {
      ApiService.updateActive("users", user.user.id, { active: false });
      localStorage.clear("token");
      window.location.reload(true);
    }
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
            <div className="header__logo p-0 pt-2">
              {companys &&
                companys.map((company) => (
                  <Link to="/" key={company._id}>
                    <img src={company.logo} width="150" />
                  </Link>
                ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <NavLink to="/"><i className="fas fa-home me-2"></i>Home</NavLink>
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
          <div className="col-lg-3 col-md-3">
            <div className="header__nav__option">
              <Link to="#" className="search-switch">
                {" "}
                <i
                  className="fas fa-search"
                  style={{ fontSize: "24px", color: "black" }}
                ></i>{" "}
              </Link>

              {token ?
                (
                  <>
                    <a href="/shop/wishlist">
                      
                      {
                        countNumWishlistItem.countWishlistItem ? 
                          <>
                            <i className="fas fa-heart" style={{fontSize: "24px" ,  color: "red"}}></i>
                            <span style={{backgroundColor: "red"}}>{countNumWishlistItem.countWishlistItem}</span>
                          </>
                          :
                          <>
                            <i className="far fa-heart" style={{fontSize: "22px", color: "black"}}></i>
                            <span style={{backgroundColor: "black"}}>0</span>
                          </>
                      }
                    </a>
                    <a href="/shop/cart">
                      {
                        countNumCartItem.countCartItem ? 
                          <>
                            <i className="fas fa-shopping-bag" style={{fontSize: "24px" ,  color: "red"}}></i>
                            <span style={{backgroundColor: "red"}}>{countNumCartItem.countCartItem}</span>
                          </>
                          
                          :
                          <>
                            <i className="fas fa-shopping-bag" style={{fontSize: "24px" , color: "black"}}></i>
                            <span style={{backgroundColor: "black"}}>0</span>
                          </>
                          
                      }
                      
                    </a>
                    <a className="dropdown open">
                      <div style={{ width: "30px", height: "30px", backgroundImage:`url(${user.user.image})`, backgroundPosition:"center",backgroundSize:"100%",backgroundRepeat:"no-repeat"}} className="rounded-circle  border broder-5 border-danger" />
                      <div className="user-dropdown">
                        <ul>
                          {user.user.isAdmin?<li><a onClick={()=>{window.location.href = 'http://localhost:3000/'}}>AdminDashboard</a></li>:""}
                          <li><NavLink to="/my-dashboard">My Dashboard<i className="fas fa-home ms-2"></i></NavLink> </li>
                          <li><NavLink to="/my-account">My Account<i className="fas fa-crown ms-2"></i></NavLink> </li>
                          <li><Link onClick={() => { logout(); }}>Logout<i className="fas fa-door-open ms-2"></i></Link> </li>
                        </ul>
                      </div>
                    </a>
                  </> 
                )
                :
                (
                  <>
                    <a className="dropdown open">

                      <i className="fas fa-user-circle ms-3 fs-5 my-auto text-dark"></i>
                      <div className="user-dropdown">
                        <ul>
                          <li><Link to="/login" onClick={click}>Sign In<i className="fas fa-sign-in-alt ms-2"></i></Link> </li>
                          <li><Link to="/sign-up">Sign Up <i className="fas fa-user-plus ms-2"></i></Link> </li>
                        </ul>
                      </div>
                    </a>
                  </>
                )
              }
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
