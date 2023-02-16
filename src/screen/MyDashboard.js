import React, { useState, useEffect } from "react";
import "./styles/my-dashboard.css";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function MyDashboard(){

  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  const userId = user ? user.user.id : "";
  const i = 0;
  const [total_purchase, setTotal_purchase] = useState([]);
  const [total_delivery, setTotal_delivery] = useState([]);

  

  useEffect(() => {
    setTimeout(() => {
      axios.get(`http://localhost:5000/api/v1/orders/item-order/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
    }, 1000)
  });

  // update the order status to success
  const updateStatusSuccess = async (orderId) => {
    try {
      const orderResponse = orders.find(item => item.id === orderId);
      axios.put(`http://localhost:5000/api/v1/orders/success/${orderId}`, orderResponse);

      return orderResponse;

    } catch (err) {
      console.log(err);
    }
  }
  const totalCost = orders.reduce((total, item) => total + (item.status === "Success" && item.totalPrice ? item.totalPrice : 0), 0);
  useEffect(() => {

      axios.get(`http://localhost:5000/api/v1/orders/total-purchased/${userId}`)
      .then(res => setTotal_purchase(res.data))
      .catch(err => console.log(err));
 
  },[]);

  useEffect(() => {

      axios.get(`http://localhost:5000/api/v1/orders/total-delivery/${userId}`)
      .then(res => setTotal_delivery(res.data))
      .catch(err => console.log(err));
  
  },[]);


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
              <div className="col-md-3 col-sm-6">
                <div className="icon-stat first">
                  <div className="row">
                    <div className="col-xs-8 text-left">
                      <span className="icon-stat-label">Total Cost</span>
                      <span className="icon-stat-value">${totalCost.toFixed(2)}</span>
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
              <div className="col-md-3 col-sm-6">
                <div className="icon-stat second">
                  <div className="row">
                    <div className="col-xs-8 text-left">
                      <span className="icon-stat-label">Total Purchase</span>
                      <span className="icon-stat-value">{total_purchase.totalPurchased}</span>
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
              <div className="col-md-3 col-sm-6">
                <div className="icon-stat third">
                  <div className="row">
                    <div className="col-xs-8 text-left">
                      <span className="icon-stat-label">Total Delivered</span>
                      <span className="icon-stat-value">{total_delivery.totalDelivery ? total_delivery.totalDelivery : 0}</span>
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
              <div className="col-md-3 col-sm-6">
                <div className="icon-stat fourth">
                  <div className="row">
                    <div className="col-xs-8 text-left">
                      <span className="icon-stat-label">Total Cancelled</span>
                      <span className="icon-stat-value">0</span>
                    </div>
                    <div className="col-xs-4 text-center">
                      <i className="fa-solid fa-ban icon-stat-visual bg-secondary" />
                    </div>
                  </div>
                  <div className="icon-stat-footer">
                    <i className="fa-solid fa-clock" /> Updated Now
                  </div>
                </div>
              </div>
            </div>
            {/* Main Dashboard */}

            {
              orders.length === 0 ?
              <>
                <div className='row my-5'>
                  <div className="col-lg-12 text-center">
                      <h1>Order is empty...</h1>
                      <p>Please go to shop and add product</p>
                      <Link to="/shop" className="btn btn-success btn-sm px-4 py-2 fw-bold text-center">Shop Now <i class="fas fa-shopping-cart ms-1"></i></Link>
                  </div>
                </div>
              </>
              :
              <>
                <div className="row mt-4">
                  <div className="col-xl-12">
                    <Table table striped bordered hover className="text-center">
                      <thead>
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

                        {orders.map((item, i=1) => (
                          <tr key={item.id}>
                            <td>{i+1}</td>
                            <td>${item.subTotal.toFixed(2)}</td>
                            <td>${item.tax.toFixed(2)}</td>
                            <td>${item.totalPrice.toFixed(2)}</td>
                            <td>{item.lastname} {item.firstname}</td>
                            <td>+ 855 {item.phone}</td>
                            <td>{item.email}</td>
                            <td>
                              {
                                item.status === "Delivering" ? 
                                <> <span className="bg-warning text-dark status-delivering">Delivering</span> </>
                                :
                                <> <span className="bg-success text-light status-success">Success</span> </>
                              }
                            </td>
                            {/* <td>{formatDate(item.dateOrdered)}</td> */}
                            <td>{(new Date(item.dateOrdered)).toLocaleDateString()} | {(new Date(item.dateOrdered)).toLocaleTimeString()} </td>
                            <td>
                              <Link to={`/order-detail/${item.id}`} className="btn btn-info btn-sm"> <i className="fa-solid fa-eye" /></Link>
                              <a href="#" className={item.status === "Success" ? "d-none" : "btn btn-sm btn-success ms-2"} onClick={() => updateStatusSuccess (item.id)}><i className="fas fa-check"></i></a>
                            </td>
                          </tr>
                        ))}

                        
                      </tbody>
                    </Table>
                  </div>
                </div>
              </>
            }

            
          </div>
        </div>
      </div>
    </div>
    
  );
};
