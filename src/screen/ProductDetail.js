import React, { useState, useEffect } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./styles/product-detail.css";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [product_images, setProductImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const productID = params.id;

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  const userId = user ? user.user.id : "";

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/api/v1/products/${productID}`)
        .then((res) => {
          setProduct(res.data);
          setProductImages(res.data.images);

          // fetch the related product in product detail page through category
          axios
            .get(
              `http://localhost:5000/api/v1/products/get/product_category/${res.data.category._id}`
            )
            .then((res) => setRelatedProducts(res.data));
        });
    } catch (err) {
      console.log(err);
    }
    //   }, [productID]);
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      // get the product data by product id
      const productResponse = await axios.get(
        `http://localhost:5000/api/v1/products/${productId}`
      );
      const subStractCountInStock = productResponse.data;

      // substract the countInStock of product by 1
      subStractCountInStock.countInStock -= quantity;

      // get all the data of cart item by each user id
      const response = await axios.get(
        `http://localhost:5000/api/v1/shoppingcarts/cart-item/${userId}`
      );
      const items = response.data;

      // check the exist cart item that is already exist
      const existCartItem = items.find(
        (item) => item.product._id === productId
      );
      if (existCartItem) {
        existCartItem.quantity += parseInt(quantity);
        await axios.put(
          `http://localhost:5000/api/v1/shoppingcarts/update-cart/${existCartItem._id}`,
          {
            quantity: existCartItem.quantity,
          }
        );

        // implement the update of substract count_in_stock
        await axios.put(
          `http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`,
          subStractCountInStock
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/v1/shoppingcarts/add-cart-item",
          {
            user: userId,
            product: productId,
            instance: "cart",
            quantity: quantity,
          }
        );

        // implement the update of substract count_in_stock
        await axios.put(
          `http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`,
          subStractCountInStock
        );
      }

      setCart(response.data);
      return cart;
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToWishlist = async (productId, qty) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/shoppingcarts/add-cart-item",
        {
          user: userId,
          product: productId,
          instance: "wishlist",
          quantity: qty,
        }
      );

      setWishlist({ ...wishlist, [productId]: response.data });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCart({
      ...cart,
      [e.target.quantity]: setQuantity(e.target.value),
    });
  };

  return (
    <div>
      <section className="shop-details">
        <div className="product__details__pic">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__breadcrumb">
                  <Link to="/">Home</Link>
                  <Link to="/shop">Shop</Link>
                  <span>{product.name}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3"></div>
              <div className="col-lg-6 col-md-9">
                {product_images.length == 0 ? (
                  <div className="product__thumb__pic set-bg product-img">
                    <img src={product.image} />
                  </div>
                ) : (
                  <>
                    <Carousel
                      startIndex={0}
                      showStatus={false}
                      showIndicators={false}
                      showArrows={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={3000}
                    >
                      {product_images.map((product_imgs, i) => (
                        <div
                          className="product__thumb__pic set-bg product-img"
                          key={i}
                        >
                          <img src={product_imgs} />
                        </div>
                      ))}
                    </Carousel>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="product__details__content">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="product__details__text">
                  <h4>{product.name}</h4>
                  <h3>
                    ${product.salePrice ? product.salePrice.toFixed(2) : "N/A"}
                    <span>
                      {" "}
                      $
                      {product.regularPrice
                        ? product.regularPrice.toFixed(2)
                        : "N/A"}{" "}
                    </span>
                  </h3>

                  <div className="row my-5">
                    <div className="col-lg-12">
                      <div className="text-center ">
                        <h3 className="fw-bold">Description</h3>
                        <p className="note">{product.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="product__details__cart__option">
                    <div className="quantity">
                      <div className="pro-qty">
                        <input
                          type="number"
                          value={quantity}
                          onChange={handleChange}
                          min="1"
                          max={`${product.countInStock}`}
                        />
                      </div>
                    </div>
                    <a
                      href="#"
                      className="primary-btn"
                      onClick={() => handleAddToCart(product.id, quantity)}
                    >
                      add to cart
                    </a>
                  </div>

                  <div className="product__details__btns__option">
                    <a
                      href="#"
                      onClick={() => handleAddToWishlist(product.id, 0)}
                    >
                      <i className="fa fa-heart" /> add to wishlist
                    </a>
                  </div>
                  <div className="product__details__last__option">
                    <h5>
                      <span>Guaranteed Safe Checkout</span>
                    </h5>
                    <ul>
                      <li>
                        <span>SKU:</span> {product.sku}
                      </li>
                      <li>
                        <span>Categories:</span>
                        <span className="ms-1">
                          {product && product.category
                            ? product.category.name
                            : ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="related spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="related-title">Related Product</h3>
            </div>
          </div>
          <div className="row">
            {relatedProducts.map((product, i) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6" key={i}>
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    {product.salePrice ? (
                      <p className="label text-light bg-dark float-start">
                        sales
                      </p>
                    ) : (
                      " "
                    )}
                    {product.countInStock >= 0 && product.countInStock <= 20 ? (
                      <p className="float-end text-light bg-danger fw-bold remaining">
                        Remaining: {product.countInStock}
                      </p>
                    ) : (
                      " "
                    )}

                    <ul className="product__hover">
                      <li>
                        <a href="#">
                          <i className="far fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <Link to={`/shop/product_detail/${product._id}`}>
                          <i className="fas fa-search"></i>
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
        </div>
      </section>
    </div>
  );
}
