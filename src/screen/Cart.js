import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [removeSingleCartItem, setRemoveSingleCartItem] = useState([]);
  const [clearAllCart, setClearAllCartItem] = useState([]);
  const [re, setRe] = useState(false);

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  const userId = user ? user.user.id : "";
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/shoppingcarts/cart-item/${userId}`)
      .then((res) => setCartItem(res.data));
    setRe(false);
  }, [re]);

  const totalPrice = cartItem.reduce(
    (total, item) =>
      total +
      (item.product.salePrice
        ? item.product.salePrice
        : item.product.regularPrice) *
        item.quantity,
    0
  );

  const clearAllCartItem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/shoppingcarts/clear/cart_items/${userId}`
      );

      setClearAllCartItem(response.data);
      return response;
    } catch (err) {
      console.log(err);
    }
    return clearAllCart;
  };

  const handleRemoveCartItem = async (cartId, productId, proQty) => {
    try {
      // get the product data by product id
      const productResponse = await axios.get(
        `http://localhost:5000/api/v1/products/${productId}`
      );
      const subStractCountInStock = productResponse.data;

      // substract the countInStock of product by 1
      subStractCountInStock.countInStock += proQty;

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
        existCartItem.quantity += proQty;
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

        const response = await axios.delete(
          `http://localhost:5000/api/v1/shoppingcarts/remove/cart_item/${cartId}`
        );
        setRemoveSingleCartItem(cartItem.filter((item) => item._id !== cartId));
        setRe(true);
        return response;
      }
    } catch (err) {
      console.log(err);
    }
    return removeSingleCartItem;
  };

  return (
    <div>
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shopping Cart</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <Link to="/shop">Shop</Link>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            {cartItem.length === 0 ? (
              <>
                <div className="col-lg-12 text-center">
                  <h1>Cart is empty...</h1>
                  <p>Please go to shop and Add product</p>
                  <Link
                    to="/shop"
                    className="btn btn-success btn-sm px-4 py-2 fw-bold text-center"
                  >
                    Shop Now <i className="fas fa-shopping-cart ms-1"></i>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="col-lg-8">
                  <div className="shopping__cart__table">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {cartItem.map((item) => (
                          <tr key={item.id}>
                            <td className="product__cart__item">
                              <div className="product__cart__item__pic">
                                <Link
                                  to={`/shop/product_detail/${item.product.id}`}
                                >
                                  <img src={item.product.image} width="90" />
                                </Link>
                              </div>
                              <div className="product__cart__item__text">
                                <h6>
                                  <Link
                                    to={`/shop/product_detail/${item.product.id}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "#000",
                                    }}
                                  >
                                    {item.product.name}
                                  </Link>
                                </h6>
                                {/* <h5>$98.49</h5> */}
                              </div>
                            </td>
                            <td className="quantity__item">
                              <div className="quantity">
                                <div className="pro-qty-2">
                                  <input
                                    type="text"
                                    defaultValue={item.quantity}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="cart__price">
                              ${" "}
                              {item.product.salePrice
                                ? item.product.salePrice.toFixed(2)
                                : item.product.regularPrice.toFixed(2)}
                            </td>
                            <td className="cart__close">
                              <a
                                href="#"
                                onClick={() =>
                                  handleRemoveCartItem(
                                    item.id,
                                    item.product.id,
                                    item.quantity
                                  )
                                }
                              >
                                <i className="fa fa-close" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="continue__btn">
                        <Link to="/shop">Continue Shopping</Link>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="continue__btn update__btn">
                        <a
                          href="#"
                          onClick={() => clearAllCartItem()}
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fas fa-trash-alt" /> Clear All Cart
                        </a>
                        {/* <a href="#" onClick={() => clearAllCartItem()}><i className="fa fa-spinner" /> Update cart</a> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="cart__discount">
                    <h6>Discount codes</h6>
                    <form action="#">
                      <input type="text" placeholder="Coupon code" />
                      <button type="submit">Apply</button>
                    </form>
                  </div>
                  <div className="cart__total">
                    <h6>Cart total</h6>
                    <ul>
                      <li>
                        Subtotal <span>$ {totalPrice.toFixed(2)}</span>
                      </li>
                      <li>
                        Total <span>$ {totalPrice.toFixed(2)}</span>
                      </li>
                    </ul>
                    <Link to="/checkout" className="primary-btn">
                      Proceed to checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
