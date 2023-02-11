import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api-service";

export default function NewArrival() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    apiService
      .getAll("products/get/new_arrival_product")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <section className="product spad">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold fs-1">New Arrival Products</h2>
          </div>
        </div>
        <div className="row product__filter">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 col-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  <span className="label bg-dark text-light">New</span>
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src="img/icon/heart.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="img/icon/compare.png" /> <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <Link to={`/shop/product_detail/${product.id}`}>
                        <img src="img/icon/search.png" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>{product.name}</h6>
                  <a href="#" className="add-cart">
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                  </div>
                  <h5>
                    {product.regularPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
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
          ))}
        </div>
      </div>
    </section>
  );
}
