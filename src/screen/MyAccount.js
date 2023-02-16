import React, { useState, useEffect } from "react";
import "./styles/my-account.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MyAccount() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  const userId = user ? user.user.id : "";
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users/${userId}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>My Account</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <Link to="/my-account">My Account</Link>
                  <span>My Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb */}
      <section style={{ backgroundColor: "#eee" }}>
        <div className="py-5 container">
          <div className="row">
            <div className="col-lg-4">
              <div className="mb-4">
                <div className="text-center">
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      margin:"auto",
                      borderRadius: "50%",
                      border: "5px solid rgb(238, 238, 238)",
                      marginBottom: "10px",
                      backgroundImage:`url(${users.image})`,
                      backgroundSize:"100%",
                      backgroundRepeat:"no-repeat"
                    }}
                  />
                  <p className="text-muted mb-1">{users.name}</p>
                  <p className="text-muted mb-1">
                    {users.isAdmin === false ? "Customer" : ""}
                  </p>
                  <p className="text-muted mb-1">{users.DOB}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="mb-4">
                <div>
                  <div className="row">
                    <div className="col-sm-3">
                      <div>Full Name</div>
                    </div>
                    <div className="col-sm-9">
                      <div className="text-muted">{users.name}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <div>Email</div>
                    </div>
                    <div className="col-sm-9">
                      <div className="text-muted">{users.email}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <div>Phone</div>
                    </div>
                    <div className="col-sm-9">
                      <div className="text-muted">+855 {users.phone}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <div>Nationality</div>
                    </div>
                    <div className="col-sm-9">
                      <div className="text-muted">{users.nationality}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <div>Address</div>
                    </div>
                    <div className="col-sm-9">
                      <div className="text-muted">{users.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
