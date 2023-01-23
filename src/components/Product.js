import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Product(){
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
    <section className="product spad">
      <div className="container">
        <div className="row product__filter">
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
      </div>
    </section>
    )
}
