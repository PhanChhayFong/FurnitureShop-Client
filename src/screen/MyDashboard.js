import React, { useState, useEffect } from "react";
import "./styles/my-dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MyDashboard() {
  const [orders, setOrders] = useState([]);
  const [total_purchase, setTotal_purchase] = useState([]);
  const [total_delivery, setTotal_delivery] = useState([]);
  const [re, setRe] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setRe(false);
      const userId = JSON.parse(token).user.id;
      axios
        .all([
          axios.get(`http://localhost:5000/api/v1/orders/item-order/${userId}`),
          axios.get(
            `http://localhost:5000/api/v1/orders/total-purchased/${userId}`
          ),
          axios.get(
            `http://localhost:5000/api/v1/orders/total-delivery/${userId}`
          ),
        ])
        .then(
          axios.spread(
            (orderResponse, totalPurchasedResponse, totalDeliveryResponse) => {
              setOrders(orderResponse.data);
              setTotal_purchase(totalPurchasedResponse.data);
              setTotal_delivery(totalDeliveryResponse.data);
            }
          )
        );
    }
  }, [re]);

  // update the order status to success
  const updateStatusSuccess = async (orderId) => {
    try {
      const orderResponse = orders.find((item) => item.id === orderId);
      axios.put(
        `http://localhost:5000/api/v1/orders/success/${orderId}`,
        orderResponse
      );
      setRe(true);
      return orderResponse;
    } catch (err) {
      console.log(err);
    }
  };
  const totalCost = orders.reduce(
    (total, item) =>
      total +
      (item.status === "Success" && item.totalPrice ? item.totalPrice : 0),
    0
  );

  return (
    <div>
      {/* Breadcrum */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Dashboard</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <span>My Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrum */}

      <div className="user-dashboard">
        <div className="content">
          <div className="container">
            {/* Main Dashboard */}
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="icon-stat first">
                  <div className="row">
                    <div className="col-xs-8 text-left">
                      <span className="icon-stat-label">Total Cost</span>
                      <span className="icon-stat-value">
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="col-xs-4 text-center">
                      <i className="fa-solid fa-sack-dollar icon-stat-visual bg-warning" />
                    </div>
                  </div>
                  <div className="icon-stat-footer">
                    <i className="fa-solid fa-clock" /> Updated Now
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="icon-stat second">
                  <div className="row">
                    <div className="col-xs-8 text-left">
                      <span className="icon-stat-label">Total Purchase</span>
                      <span className="icon-stat-value">
                        {total_purchase.totalPurchased
                          ? total_purchase.totalPurchased
                          : 0}
                      </span>
                    </div>
                    <div className="col-xs-4 text-center">
                      <i className="fa-solid fa-cash-register icon-stat-visual bg-danger" />
                    </div>
                  </div>
                  <div className="icon-stat-footer">
                    <i className="fa-solid fa-clock" /> Updated Now
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="icon-stat third">
                  <div className="row">
                    <div className="col-xs-8 text-left">
                      <span className="icon-stat-label">Total Delivered</span>
                      <span className="icon-stat-value">
                        {total_delivery.totalDelivery
                          ? total_delivery.totalDelivery
                          : 0}
                      </span>
                    </div>
                    <div className="col-xs-4 text-center">
                      <i className="fa-solid fa-truck icon-stat-visual bg-dark" />
                    </div>
                  </div>
                  <div className="icon-stat-footer">
                    <i className="fa-solid fa-clock" /> Updated Now
                  </div>
                </div>
              </div>
            </div>
            {/* Main Dashboard */}

            {orders.length === 0 ? (
              <div className="row my-5">
                <div className="col-lg-12 text-center">
                  <h1>Order is empty...</h1>
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
              <div className="row mt-4">
                <div className="col-xl-12">
                  <table className="text-center table table-striped table-hover table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>SubTotal</th>
                        <th>Tax</th>
                        <th>Total</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, i) => (
                        <tr key={item.id}>
                          <td>{i + 1}</td>
                          <td>${item.subTotal.toFixed(2)}</td>
                          <td>${item.tax.toFixed(2)}</td>
                          <td>${item.totalPrice.toFixed(2)}</td>
                          <td>
                            {item.lastname} {item.firstname}
                          </td>
                          <td>+ 855 {item.phone}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.status === "Delivering" ? (
                              <span className="bg-warning text-dark status-delivering">
                                Delivering
                              </span>
                            ) : (
                              <span className="bg-success text-light status-success">
                                Success
                              </span>
                            )}
                          </td>
                          {/* <td>{formatDate(item.dateOrdered)}</td> */}
                          <td>
                            {new Date(item.dateOrdered).toLocaleDateString()} |{" "}
                            {new Date(item.dateOrdered).toLocaleTimeString()}
                          </td>
                          <td>
                            <Link
                              to={`/my-dashboard/order-detail/${item.id}`}
                              className="btn btn-info btn-sm"
                            >
                              {" "}
                              <i className="fa-solid fa-eye" />
                            </Link>
                            {item.status == "Success" ? (
                              ""
                            ) : (
                              <a
                                href="#"
                                title="Confirm"
                                className={"btn btn-sm btn-success ms-2"}
                                onClick={() => updateStatusSuccess(item.id)}
                              >
                                <i className="fas fa-check"></i>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
