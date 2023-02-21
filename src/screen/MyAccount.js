import React, { useState, useEffect } from "react";
import "./styles/my-account.css";
import { Link } from "react-router-dom";
import Alart from "../services/Alart";
import apiService from "../services/api-service";

export default function MyAccount() {
  const [users, setUsers] = useState([]);
  const [img, setImg] = useState();
  const [changed, setChanged] = useState(false);
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  useEffect(() => setUsers(user.user), []);

  // edit new Image of User Profile
  const hiddenImageUpload = React.useRef(null);
  const handleClick = () => hiddenImageUpload.current.click();
  const hnadleInputChange = (event) => {
    // review image
    setImg(URL.createObjectURL(event.target.files[0]));
    setUsers({
      ...users,
      image: event.target.files[0],
    });
    setChanged(true);
  };

  // update the user profile
  const update = async () => apiService.update("users", user.user.id, users);

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
          <div className="row p-2">
            <div
              className="col-lg-4"
              style={{ backgroundColor: "#fff", padding: "50px 0px 25px 0px" }}
            >
              <div className="mb-4">
                <div className="text-center">
                  <div
                    src={users.image}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      backgroundImage: `url(${users.image})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100%",
                      margin: "0 auto",
                      border: "5px solid rgb(238, 238, 238)",
                    }}
                  />
                  <p className="text-muted mb-1">{users.name}</p>
                  <p className="text-muted mb-1">
                    {users.isAdmin === false ? "Customer" : ""}
                  </p>
                  <p className="text-muted mb-1">{users.DOB}</p>
                  <p className="mt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm text-light fw-bold p-2 px-3"
                      data-toggle="modal"
                      href="#exampleModalToggle"
                      role="button"
                    >
                      <i className="fas fa-user me-2"/>Update Profile
                    </button>
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm text-light fw-bold p-2 px-3"
                    data-toggle="modal"
                    role="button"
                    onClick={() => Alart.alartChangePassword(user.user.id)}
                  >
                    <i className="fas fa-key me-2"/>Change Password
                  </button>
                </div>
              </div>
            </div>
            <div
              className="col-lg-8"
              style={{ backgroundColor: "#fff", padding: "50px 0px 25px 0px" }}
            >
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

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl ">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h6
                className="modal-title fw-bold text-capitalize"
                id="exampleModalToggleLabel"
              >
                Update User Profile
              </h6>
              <button
                type="button"
                className="btn-close btn-sm fw-bold"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username..."
                      value={users.name || ""}
                      onChange={(e) => {
                        setChanged(true);
                        setUsers({ ...users, name: e.target.value });
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    >
                      Select Photo
                    </label>
                    <input
                      type="file"
                      ref={hiddenImageUpload}
                      onChange={hnadleInputChange}
                      accept="*/image"
                      className="form-control"
                    />
                  </div>

                  <div
                    className="rounded-circle border border-5 border-success mb-3 user-img"
                    style={{
                      backgroundImage: img
                        ? `url(${URL.createObjectURL(users.image)})`
                        : `url(${users.image})`,
                    }}
                  ></div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email.."
                      value={users.email || ""}
                      onChange={(e) => {
                        setChanged(true);
                        setUsers({ ...users, email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number..."
                      value={users.phone || ""}
                      onChange={(e) => {
                        setChanged(true);
                        setUsers({ ...users, phone: e.target.value });
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Date Of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Username..."
                      value={users.DOB || ""}
                      onChange={(e) => {
                        setChanged(true);
                        setUsers({ ...users, DOB: e.target.value });
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      placeholder="Address..."
                      value={users.address || ""}
                      onChange={(e) => {
                        setChanged(true);
                        setUsers({ ...users, address: e.target.value });
                      }}
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-danger btn-sm fw-bold"
                data-dismiss="modal"
              >
                Cancel<i className="fas fa-close ms-2"></i>
              </button>

              {changed ? (
                <>
                  <button
                    className="btn btn-success btn-sm fw-bold"
                    onClick={() => Alart.alartSave(changed, update())}
                    data-dismiss="modal"
                  >
                    Update<i className="fas fa-tools ms-2"></i>
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a> */}
    </>
  );
}
