import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Alart from "../services/Alart";
import "./styles/register.css";

function App() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [navigate, setNavigate] = useState(false);
  if (navigate) {
    return <Navigate to="/" />;
  }
  const submit = () => {
    if (user.name != "" && user.email != "" && user.password != "") {
      if (user.password == confirmPassword) {
        axios.post("http://localhost:5000/api/v1/users/register", user, {
          headers: { "Content-Type": "application/json" },
        });
        setNavigate(true);
      } else {
        Alart.alartPasswordError(true);
      }
    } else {
      Alart.alartPasswordError(false);
    }
  };

  return (
    <div className="container-fluid">
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url(https://demos.creative-tim.com/soft-ui-dashboard/assets/img/curved-images/curved14.jpg)",
          height: "300px",
          backgroundPosition: "top left ",
          backgroundSize: "cover",
        }}
      ></div>

      <div
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="p-5 text-center">
          <h2 className="fw-bold mb-5">Sign up now</h2>
          {/* <form onSubmit={submit}> */}

          <div className="row">
            <div className="col-6">
              <input
                className="form-control"
                id="form1"
                type="text"
                value={user.name}
                onChange={(e) => {
                  setUser({
                    ...user,
                    name: e.target.value,
                  });
                }}
              />
              <label className="mb-4">Username</label>
            </div>

            <div className="col-6">
              <input
                className="form-control"
                id="form1"
                type="email"
                value={user.email}
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />
              <label className="mb-4">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <input
                className="form-control"
                id="form1"
                type="password"
                value={user.password}
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              />
              <label className="mb-4">Password</label>
            </div>

            <div className="col-6">
              <input
                className="form-control"
                id="form1"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <label className="mb-4">Confirm Password</label>
            </div>
          </div>

          <button
            className="btn btn-primary btn-block mb-4"
            onClick={() => submit()}
          >
            Sign up
          </button>
          <p className="text-center m-0">
            Already have an Account? <Link to="/login">Sign In</Link>
          </p>

          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default App;
