import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alart from "../services/Alart";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};
export default function Checkout() {
  // testing auth : 4000 0027 6000 3184
  const stripe = useStripe();
  const elements = useElements();
  const [cartItem, setCartItem] = useState([]);
  const [clearCart, setclearCartItem] = useState([]);
  //getting data from localStorage
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token).user : "";
  const userId = token ? user.id : "";

  useEffect(() => {
    if (token)
      axios
        .get(`http://localhost:5000/api/v1/shoppingcarts/cart-item/${userId}`)
        .then((res) => setCartItem(res.data));
  }, []);
  //subtotal tax TotalPrice
  const subTotal = cartItem.reduce(
    (total, item) =>
      total +
      (item.product.salePrice
        ? item.product.salePrice
        : item.product.regularPrice) *
        item.quantity,
    0
  );
  const taxPrice = subTotal * 0.1;
  const totalPrice = subTotal + taxPrice;
  //datatype
  const [order, setOrder] = useState({
    orderItems: [
      {
        product: "",
        quantity: "",
      },
    ],
    user: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    shippingAddress: "",
    city: "",
    country: "",
    tax: "",
    subTotal: "",
    totalPrice: "",
    Tmode: false,
  });
  //add data from each txtbox
  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
  //if txtbox empty
  function em(inputtx) {
    if (inputtx.length == 0) return false;
    else return true;
  }
  //check each txtbox
  const validate = () => {
    if (
      em(order.firstname) &&
      em(order.lastname) &&
      em(order.country) &&
      em(order.shippingAddress) &&
      em(order.city) &&
      em(order.phone) &&
      em(order.email)
    )
      return true;
    return false;
  };
  //add to tbOrder
  const addOrders = async () => {
    try {
      const date = new Date();
      const orderData = {
        orderItems: cartItem.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
        user: userId,
        firstname: order.firstname,
        lastname: order.lastname,
        phone: order.phone,
        email: order.email,
        shippingAddress: order.shippingAddress,
        city: order.city,
        country: order.country,
        tax: taxPrice,
        subTotal: subTotal,
        totalPrice: totalPrice,
        Tmode: order.Tmode,
        TDate: order.Tmode == "true" ? date : "",
        Tstatus: order.Tmode == "true" ? true : false,
      };
      const orderResponse = await axios.post(
        `http://localhost:5000/api/v1/orders`,
        orderData
      );
      setOrder(orderResponse.data, Alart.alartOrderSuccess());
      // clear cart
      const clearCartItem = await axios.delete(
        `http://localhost:5000/api/v1/shoppingcarts/clear/cart_items/${userId}`
      );
      setclearCartItem(clearCartItem);
      window.location.reload(true);
      return clearCart;
    } catch (err) {
      console.log(err);
    }
  };
  //submit when customer choose Cash on Delivery
  const submitCash = () => {
    // protect page without being refreshed.
    if (validate()) addOrders();
    else Alart.alartEmpty();
  };
  //submit when customer choose Credit Card
  const submitCard = async (e) => {
    if (validate()) {
      e.preventDefault();
      document.querySelector("#pay_btn").disabled = true;
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let res = await axios.post(
          "http://localhost:5000/api/v1/payments/placeOrder",
          { amount: Math.round(totalPrice * 100) },
          config
        );
        const clientSecret = res.data.client_secret;

        if (!stripe || !elements) {
          return;
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
            },
          },
        });
        if (result.error) {
          Alart.alartLoginEmpty(result.error.message);
          document.querySelector("#pay_btn").disabled = false;
        } else {
          if (result.paymentIntent.status === "succeeded") {
            Alart.alartSaveSuccess();
            addOrders();
          } else {
            Alart.alartLoginEmpty(
              "There is some issue while payment processing"
            );
          }
        }
      } catch (error) {
        document.querySelector("#pay_btn").disabled = false;
        Alart.alartLoginEmpty(error.response.data.message);
      }
    } else Alart.alartEmpty();
  };
  return (
    <div>
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Check Out</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <Link to="/shop">Shop</Link>
                  <Link to="/shop/cart">Shopping Cart</Link>
                  <span>Check Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="checkout spad">
        <div className="container">
          {cartItem.length === 0 ? (
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1>Cart is empty...</h1>
                <p>Please go to shop and add product</p>
                <Link
                  to="/shop"
                  className="btn btn-success btn-sm px-4 py-2 fw-bold text-center"
                >
                  Shop Now <i className="fas fa-shopping-cart ms-1"></i>
                </Link>
              </div>
            </div>
          ) : (
            <div className="checkout__form">
              <form>
                <div className="row">
                  <div className="col-lg-7 col-md-12">
                    <h6 className="coupon__code">
                      <span className="icon_tag_alt" /> Have a coupon?{" "}
                      <a href="#">Click here</a> to enter your code
                    </h6>
                    <h6 className="checkout__title">Billing Details</h6>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Fist Name<span>*</span>
                          </p>
                          <input
                            type="text"
                            name="firstname"
                            value={order.firstname}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Last Name<span>*</span>
                          </p>
                          <input
                            type="text"
                            name="lastname"
                            value={order.lastname}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Country<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="country"
                        value={order.country}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Address<span>*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="checkout__input__add"
                        name="shippingAddress"
                        value={order.shippingAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Town/City<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="city"
                        value={order.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Phone<span>*</span>
                          </p>
                          <input
                            type="text"
                            name="phone"
                            value={order.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Email<span>*</span>
                          </p>
                          <input
                            type="text"
                            name="email"
                            value={order.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="checkout__order">
                      <h4 className="order__title">Your order</h4>
                      <table className="table">
                        <thead>
                          <tr>
                            <th colSpan={2}>Product</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItem.map((item, i) => (
                            <tr key={i}>
                              <td style={{ width: "10px" }}>{i + 1}.</td>
                              <td>
                                {item.product.name.length === 12
                                  ? item.product.name
                                  : item.product.name.substr(0, 12) + "..."}
                              </td>
                              <td className="text-center">
                                $
                                {item.product.salePrice
                                  ? item.product.salePrice.toFixed(2)
                                  : item.product.regularPrice.toFixed(2)}
                              </td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-center">
                                $
                                {(
                                  (item.product.salePrice
                                    ? item.product.salePrice
                                    : item.product.regularPrice) * item.quantity
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <ul className="checkout__total__all">
                        <li>
                          Subtotal <span>${subTotal.toFixed(2)}</span>
                        </li>
                        <li>
                          Tax <span>${taxPrice.toFixed(2)}</span>
                        </li>
                        <li>
                          Total <span>${totalPrice.toFixed(2)}</span>
                        </li>
                      </ul>
                      <label>Payment Method : </label>{" "}
                      <div className="checkout__input__checkbox">
                        <label htmlFor="cash">
                          Cash On Delivery
                          <input
                            type="radio"
                            id="cash"
                            name="Tmode"
                            value={false}
                            onChange={handleChange}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="payment">
                          Credit Card
                          <input
                            type="radio"
                            id="payment"
                            name="Tmode"
                            value={true}
                            onChange={handleChange}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      {order.Tmode == "false" ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          onClick={() => submitCash()}
                          className="site-btn text-center text-light"
                        >
                          PLACE ORDER
                        </button>
                      ) : (
                        <button
                          type="button"
                          href="#exampleModalToggle"
                          data-toggle="modal"
                          role="button"
                          style={{ cursor: "pointer" }}
                          className="site-btn text-center text-light"
                        >
                          PLACE ORDERs
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* model */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered  ">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h6
                className="modal-title fw-bold text-capitalize"
                id="exampleModalToggleLabel"
              >
                Credit Card
              </h6>
              <button
                type="button"
                className="btn-close btn-sm fw-bold"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row wrapper">
                <div className="col-12 mx-auto">
                  <form
                    className="shadow-lg p-5 rounded-lg bg-primary"
                    onSubmit={submitCard}
                  >
                    <div className="form-group">
                      <label htmlFor="card_num_field">Card Number</label>
                      <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                        options={options}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="card_exp_field">Card Expiry</label>
                      <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                        options={options}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="card_cvc_field">Card CVC</label>
                      <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        options={options}
                      />
                    </div>

                    <div className="text-center">
                      <button
                        id="pay_btn"
                        type="submit"
                        className="btn btn-block py-2 bg-light"
                        style={{ width: "50%" }}
                      >
                        Pay - {totalPrice.toFixed(2)}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
