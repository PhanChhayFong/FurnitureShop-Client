import React from 'react'

export default function offcanvas(){
    <div>
        <div className="offcanvas-menu-overlay" />
        <div className="offcanvas-menu-wrapper">
            <div className="offcanvas__option">
            <div className="offcanvas__links">
                <a href="#">Sign in</a>
                <a href="#">FAQs</a>
            </div>
            <div className="offcanvas__top__hover">
                <span>Usd <i className="arrow_carrot-down" /></span>
                <ul>
                <li>USD</li>
                <li>EUR</li>
                <li>USD</li>
                </ul>
            </div>
            </div>
            <div className="offcanvas__nav__option">
            <a href="#" className="search-switch"><img src="img/icon/search.png"   /></a>
            <a href="#"><img src="img/icon/heart.png"   /></a>
            <a href="#"><img src="img/icon/cart.png"   /> <span>0</span></a>
            <div className="price">$0.00</div>
            </div>
            <div id="mobile-menu-wrap" />
            <div className="offcanvas__text">
            <p>Free shipping, 30-day return or refund guarantee.</p>
            </div>
        </div>
    </div>
}
