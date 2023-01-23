import React, { Component } from 'react'
import {Link,NavLink} from 'react-router-dom'

export default function MenuNavbar(){
    return (
      <nav>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="header__logo">
              <Link to="/"><img src="img/logo.png" alt /></Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/shop">Shop</NavLink></li>
                  <li><Link to="#">Pages</Link>
                    <ul className="dropdown">
                      <li><NavLink to="/aboutus">About Us</NavLink></li>
                      <li><NavLink to="/productdetail">Shop Details</NavLink></li>
                      <li><NavLink to="/cart">Shopping Cart</NavLink></li>
                      <li><NavLink to="/checkout">Check Out</NavLink></li>
                      <li><NavLink to="/blogdetail">Blog Details</NavLink></li>
                    </ul>
                  </li>
                  <li><NavLink to="/blog">Blog</NavLink></li>
                  <li><NavLink to="/contact">Contact Us</NavLink></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <Link to="#" className="search-switch"><img src="img/icon/search.png" alt /></Link>
                <Link to="#"><img src="img/icon/heart.png" alt /></Link>
                <Link to="#"><img src="img/icon/cart.png" alt /> <span>0</span></Link>
                <div className="price">$0.00</div>
              </div>
            </div>
          </div>
          <div className="canvas__open"><i className="fa fa-bars" /></div>
        </div>
      </nav>
    )
}
// function CustomeLink ({to, children, ...props}){
//   const path = window.location.pathname
//   return (
//     <li className={path === to? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   )
// }
