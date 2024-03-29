import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Alart from "../services/Alart";
import "./styles/register.css";

function App() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submit = () => {
    user.name != "" && user.email != "" && user.password != ""
      ? user.password == confirmPassword
        ? Alart.alartRegister(user)
        : Alart.alartPasswordError(true)
      : Alart.alartPasswordError(false);
  };

  return (
    <div className="container-fluid ">
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
          <form>
            <div className="row">
              <div className="col-12 col-lg-6">
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

              <div className="col-12 col-lg-6">
                <input
                  className="form-control"
                  id="form2"
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
              <div className="col-12 col-lg-6">
                <input
                  className="form-control"
                  id="form3"
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

              <div className="col-12 col-lg-6">
                <input
                  className="form-control"
                  id="form4"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <label className="mb-4">Confirm Password</label>
              </div>
            </div>

            <a
              className="btn btn-primary btn-block mb-4 text-light"
              onClick={() => submit()}
            >
              Sign up
            </a>
            <p className="text-center m-0">
              Already have an Account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
