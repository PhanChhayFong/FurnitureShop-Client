import React, { useState, useEffect } from "react";
import apiService from "../services/api-service";
import "./style/banner.css";

export default function Banner() {
  const [produdct_category, setProductCategory] = useState([]);

  useEffect(() => {
    apiService
      .getAll("categories/get/product_category")
      .then((res) => setProductCategory(res.data));
  }, []);

  return (
    <section className="banner spad">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center mb-3">
            <h2 className="fw-bold fs-1">Product By Category</h2>
          </div>
        </div>
        <div className="row">
          {produdct_category.map((productCategory) => (
            <div
              key={productCategory._id}
              className="col-md-4 col-12 mb-md-0 mb-3"
            >
              <div className="card h-100 border border-5 border-secondary">
                <img
                  src={productCategory.icon}
                  className="card-img-top"
                  width="180"
                />
                <div className="card-body text-center py-5">
                  <h2 className="card-title">{productCategory.name}</h2>
                  <a href="#" className="card-link">
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
