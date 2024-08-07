import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./styles/paginate.css";
import Pagination from "../components/Pagination";
import Alart from "../services/Alart";

export default function Shop() {
  const [products, setProducts] = useState([]);

  // sort product filter
  const [filter, setFilter] = useState("");

  // set filter by price status
  const filterByPriceStatus = (e) => {
    setFilter(e.target.value);
  };

  // set filter by price value
  const filterProductByPrice = useMemo(() => {
    // useMemo is used to filtered products whenever the filter or products state change by clicked

    // if the product is not yet filter by clicked, it shows all the product items
    if (!filter) {
      return products;
    }

    return products.filter((product) => {
      if (filter === "minSalePrice") {
        return product.salePrice >= 0 && product.salePrice <= 150;
      } else if (filter === "maxSalePrice") {
        return product.salePrice > 150 && product.salePrice <= 2000;
      } else if (filter === "minRegularPrice") {
        return product.regularPrice >= 0 && product.regularPrice <= 2000;
      } else if (filter === "maxRegularPrice") {
        return product.regularPrice > 150 && product.regularPrice <= 2000;
      }
    });
  }, [filter, products]);

  // pagination properties
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filterProductByPrice.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prev = () => {
    setCurrentPage(currentPage - 1);
  };
  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:4000/api/v1/products")
        .then((res) => setProducts(res.data));
    }, 1000);
    //   }, [filter, currentPage]);
  }, []);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  const userId = user ? user.user.id : "";
  const handleAddToCart = async (productId, proQty) => {
    if (localStorage.getItem("token"))
      try {
        // get the product data by product id
        const productResponse = await axios.get(
          `http://localhost:4000/api/v1/products/${productId}`
        );
        const subStractCountInStock = productResponse.data;

        // substract the countInStock of product by 1
        subStractCountInStock.countInStock -= proQty;

        // get all the data of cart item by each user id
        const response = await axios.get(
          `http://localhost:4000/api/v1/shoppingcarts/cart-item/${userId}`
        );
        const items = response.data;

        // check the exist cart item that is already exist
        const existCartItem = items.find(
          (item) => item.product._id === productId
        );
        if (existCartItem) {
          existCartItem.quantity += proQty;
          await axios.put(
            `http://localhost:4000/api/v1/shoppingcarts/update-cart/${existCartItem._id}`,
            {
              quantity: existCartItem.quantity,
            }
          );

          // implement the update of substract count_in_stock
          await axios.put(
            `http://localhost:4000/api/v1/products/update_count_in_stock/${productId}`,
            subStractCountInStock
          );
        } else {
          await axios.post(
            "http://localhost:4000/api/v1/shoppingcarts/add-cart-item",
            {
              user: userId,
              product: productId,
              instance: "cart",
              quantity: proQty,
            }
          );

          // implement the update of substract count_in_stock
          await axios.put(
            `http://localhost:4000/api/v1/products/update_count_in_stock/${productId}`,
            subStractCountInStock
          );
        }

        setCart(response.data);
        window.location.reload(true);
        return cart;
      } catch (err) {
        console.log(err);
      }
    else
      Alart.alartError(
        "Can't Add to Cart",
        "Please Sign in to buy this product!!!"
      );
  };

  const handleAddToWishlist = async (productId, qty) => {
    if (localStorage.getItem("token"))
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/shoppingcarts/add-cart-item",
          {
            user: userId,
            product: productId,
            instance: "wishlist",
            quantity: qty,
          }
        );

        setWishlist({ ...wishlist, [productId]: response.data });
        window.location.reload(true);
        return response;
      } catch (err) {
        console.log(err);
      }
    else
      Alart.alartError(
        "Can't Add to Wishlist",
        "Please Sign in to Wishlist this product!!!"
      );
  };

  return (
    <div>
      {/* Breadcrumb */}
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
            <Sidebar />
            {/* end sidebar */}
            <div className="col-lg-9">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__left">
                      <p>
                        Showing {currentItems.length}-{currentPage} of{" "}
                        {products.length} results
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by Price:</p>
                      <select value={filter} onChange={filterByPriceStatus}>
                        <option value="">-- Select Filter Price --</option>
                        <optgroup label="Sale Price">
                          <option value="minSalePrice">
                            $0 - $150
                          </option>
                          <option value="maxSalePrice">
                            $150 - $2000
                          </option>
                        </optgroup>
                        <optgroup label="Regular Price">
                          <option value="minregularPrice">
                            $0 - $150
                          </option>
                          <option value="maxregularPrice">
                            $150 - $2000
                          </option>
                        </optgroup>
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
                        style={{
                          backgroundImage: `url(${product.image})`,
                          backgroundSize: "auto 100%",
                        }}
                      >
                        {product.salePrice ? (
                          <p className="label text-light bg-dark float-start">
                            sales
                          </p>
                        ) : (
                          " "
                        )}
                        {product.countInStock >= 0 &&
                        product.countInStock <= 20 ? (
                          <p className="float-end text-light bg-danger fw-bold remaining">
                            Remaining: {product.countInStock}
                          </p>
                        ) : (
                          " "
                        )}

                        <ul className="product__hover">
                          <li>
                            <a
                              href="#"
                              onClick={() => handleAddToWishlist(product.id, 0)}
                            >
                              {wishlist[product.id] ? (
                                <i className="far fa-heart text-danger"></i>
                              ) : (
                                <i className="far fa-heart"></i>
                              )}
                            </a>
                          </li>
                          <li>
                            <Link to={`/shop/product_detail/${product.id}`}>
                              <i className="fas fa-search"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>{product.name}</h6>
                        <a
                          href="#"
                          className={
                            product.countInStock === 0 ? "disabled" : "add-cart"
                          }
                          onClick={() => handleAddToCart(product.id, 1)}
                        >
                          {product.countInStock === 0
                            ? "Add To Cart is not available"
                            : "+ Add To Cart"}
                        </a>
                        <div className="rating">
                          {[...Array(product.rating)].map((e, i) => (
                            <i className="fa fa-star star-rating" key={i} />
                          ))}
                          {[...Array(5 - product.rating)].map((e, i) => (
                            <i className="fa fa-star-o" key={i} />
                          ))}
                        </div>
                        <h5>
                          {product.salePrice ? (
                            <>
                              $
                              {product.salePrice
                                ? product.salePrice.toFixed(2)
                                : "N/A"}
                              <span>
                                $
                                {product.regularPrice
                                  ? product.regularPrice.toFixed(2)
                                  : "N/A"}
                              </span>
                            </>
                          ) : (
                            <>
                              {" "}
                              $
                              {product.regularPrice
                                ? product.regularPrice.toFixed(2)
                                : "N/A"}{" "}
                            </>
                          )}
                        </h5>
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
