
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

export default function Shop(){
    const [products, setProducts]= useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/products")
        .then(res=>{
            console.log(res);
            setProducts(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    })
    return(
        <div>
            <section className="breadcrumb-option">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="breadcrumb__text">
                        <h4>Shop</h4>
                        <div className="breadcrumb__links">
                        <Link to="/">Home</Link>
                        <span>Shop</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="shop spad">
                {/* start shop page */}
                <div className="container">
                    <div className="row">
                        {/* start sidebar */}
                        <Sidebar/>
                        {/* end sidebar */}
                        <div className="col-lg-9">
                        <div className="shop__product__option">
                            <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="shop__product__option__left">
                                <p>Showing 1–12 of 126 results</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="shop__product__option__right">
                                <p>Sort by Price:</p>
                                <select>
                                    <option value>Low To High</option>
                                    <option value>$0 - $55</option>
                                    <option value>$55 - $100</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* start products */}
                        <div className="row">
                        {products.map(product=>
                            <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" style={{backgroundImage : `url(${product.image})`}}>
                                        <ul className="product__hover">
                                            <li><a href="#"><img src="img/icon/heart.png" alt /></a></li>
                                            <li><a href="#"><img src="img/icon/compare.png" alt /> <span>Compare</span></a>
                                            </li>
                                            <li><Link to="/productdetail"><img src="img/icon/search.png" alt /></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                    <h6>{product.name}</h6>
                                    <a href="#" className="add-cart">+ Add To Cart</a>
                                    <div className="rating">
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                    </div>
                                    <h5>$ {product.price}</h5>
                                    <div className="product__color__select">
                                        <label htmlFor="pc-4">
                                        <input type="radio" id="pc-4" />
                                        </label>
                                        <label className="active black" htmlFor="pc-5">
                                        <input type="radio" id="pc-5" />
                                        </label>
                                        <label className="grey" htmlFor="pc-6">
                                        <input type="radio" id="pc-6" />
                                        </label>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                        {/* end products */}

                        {/* start pagination */}
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="product__pagination">
                                <a className="active" href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <span>...</span>
                                <a href="#">21</a>
                            </div>
                            </div>
                        </div>
                        {/* end pagination */}
                        </div>
                    </div>
                </div>
                {/* end shop page */}
            </section>
        </div>
    )
}