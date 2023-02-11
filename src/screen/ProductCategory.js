import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./styles/paginate.css";
import Pagination from "../components/Pagination";

export default function ProductCategory() {
  const [products, setProducts] = useState([]);

  // pagination properties
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prev = () => {
    setCurrentPage(currentPage - 1);
  };
  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      Object.keys(products).map((key) =>
        axios
          .get(
            `http://localhost:5000/api/v1/products/get/product_category/${products[
              key
            ]._id.toString()}`
          )
          .then((res) => {
            setProducts(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      );
    }, 0);
  }, []);

  return (
    <div>
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shop</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <Link to="/shop">Shop</Link>
                  <span>{products.name}</span>
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
            <Sidebar />
            {/* end sidebar */}
            <div className="col-lg-9">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__left">
                      <p>
                        Showing {itemPerPage}–{currentPage} of 126 results
                      </p>
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
                {currentItems.map((product) => (
                  <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div
                        className="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${product.image})` }}
                      >
                        {product.salePrice ? (
                          <>
                            <span className="label text-light bg-dark">
                              sales
                            </span>
                          </>
                        ) : (
                          " "
                        )}
                        <ul className="product__hover">
                          <li>
                            <a href="#">
                              <img src="img/icon/heart.png" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon/compare.png" />{" "}
                              <span>Compare</span>
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
                          {product.salePrice ? (
                            <>
                              {product.salePrice &&
                              typeof product.salePrice === "number"
                                ? product.salePrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })
                                : "N/A"}

                              <span>
                                {product.regularPrice &&
                                typeof product.regularPrice === "number"
                                  ? product.regularPrice.toLocaleString(
                                      "en-US",
                                      { style: "currency", currency: "USD" }
                                    )
                                  : "N/A"}
                              </span>
                            </>
                          ) : (
                            <>
                              {product.regularPrice &&
                              typeof product.regularPrice === "number"
                                ? product.regularPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })
                                : "N/A"}
                            </>
                          )}
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
              {/* end products */}

              {/* start pagination */}
              <div className="row">
                <div className="col-lg-12">
                  {products.length > itemPerPage ? (
                    <div>
                      <Pagination
                        itemsPerPage={itemPerPage}
                        totalItems={products.length}
                        paginate={paginate}
                        currentPage={currentPage}
                        prev={prev}
                        next={next}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* end pagination */}
            </div>
          </div>
        </div>
        {/* end shop page */}
      </section>
    </div>
  );
}
