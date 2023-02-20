import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./styles/my-dashboard.css";

export default function OrderDetail() {
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const orderId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/orders/${orderId}`)
      .then((res) => setOrders(res.data));
    // }, [setOrders]);
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>My Order</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <Link to="/my-dashboard">My Dashboard</Link>
                  <span>My Order</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb */}

      <section className="shop spad">
        {/* start shop page */}
        <div className="container">
          <div className="row">
            <h2 className="text-center">Order Product Image</h2>
            {orders &&
              orders.orderItems &&
              orders.orderItems.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={item.id}>
                  <Card style={{ border: "none" }}>
                    <Card.Img
                      src={item.product.image}
                      style={{
                        height: "260px",
                        objectFit: "cover",
                        maxHeight: "260px",
                      }}
                    />
                    <Card.Body className="text-start px-0 py-4">
                      <Card.Title
                        as="h6"
                        style={{
                          color: "#111111 !important",
                          fontWeight: "600",
                        }}
                      >
                        {" "}
                        {item.product.name}{" "}
                      </Card.Title>
                      <Card.Title as="h5" className="fw-bold">
                        Price: $
                        {item.product.salePrice
                          ? item.product.salePrice.toFixed(2)
                          : item.product.regularPrice.toFixed(2)}
                      </Card.Title>
                      <Card.Text>Amount: {item.quantity}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        {/* end shop page */}
      </section>

      {/* <section className="checkout spad"> */}
      <div className="container mb-5">
        <div className="checkout__form">
          <form action="#">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <div className="checkout__order">
                  <h4 className="order_title text-center">My order</h4>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="col-lg-12 col-md-6">
                <div className="checkout__order">
                  <h4 className="order__title">Shipping Address</h4>
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{orders.user ? orders.user.name : ""}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{orders.user ? orders.user.email : ""}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{orders.user ? orders.user.phone : ""}</td>
                      </tr>
                      <tr>
                        <th>Shipping Address</th>
                        <td>{orders.shippingAddress}</td>
                      </tr>
                      <tr>
                        <th>{"City/Province"}</th>
                        <td>{orders.city}</td>
                      </tr>
                      <tr>
                        <th>Country</th>
                        <td>{orders.country}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Shipping Address */}

              {/* Payment */}
              <div className="col-lg-12 col-md-6">
                <div className="checkout__order">
                  <h4 className="order__title">Product Ordered</h4>
                  <table className="table checkout__order__products table-striped">
                    <thead>
                      <tr>
                        <th colSpan={2}>Product</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.orderItems &&
                        orders.orderItems.map((item, i) => (
                          <tr
                            className="checkout__total__products"
                            key={item.id}
                          >
                            <td style={{ width: "10px" }}>0{i + 1}.</td>
                            <td>{item.product.name}</td>
                            <td className="text-center">
                              $
                              {item.product.salePrice
                                ? item.product.salePrice.toFixed(2)
                                : item.product.regularPrice.toFixed(2)}
                            </td>
                            <td className="text-center"> {item.quantity}</td>
                            <td className="text-center">
                              $
                              {(
                                (item.product.salePrice
                                  ? item.product.salePrice.toFixed(2)
                                  : item.product.regularPrice.toFixed(2)) *
                                item.quantity
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  <ul className="checkout__total__all">
                    <h4 className="order_title py-4">Total Paid</h4>
                    <li>
                      Subtotal{" "}
                      <span>
                        ${orders.subTotal ? orders.subTotal.toFixed(2) : ""}
                      </span>
                    </li>
                    <li>
                      Tax{" "}
                      <span>${orders.tax ? orders.tax.toFixed(2) : ""}</span>
                    </li>
                    <li>
                      Total{" "}
                      <span>
                        ${orders.totalPrice ? orders.totalPrice.toFixed(2) : ""}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Payment */}
            </div>
          </form>
        </div>
      </div>
      {/* </section> */}
    </div>
  );
}
