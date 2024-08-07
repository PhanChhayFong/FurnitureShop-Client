import React, { useEffect, useState } from "react";
import "./styles/login.css";
import axios from "axios";
import Alart from "../services/Alart";
import { Link, Navigate } from "react-router-dom";
import ApiService from "../services/api-service";

function Login() {
  const [companys, setCompanys] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/companys")
      .then((res) => setCompanys(res.data));
  }, []);

  const [navigate, setNavigate] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setNavigate(true);
  }, []);

  const login = async () => {
    if (user.email != "" && user.password != "") {
      Alart.alartLoading();
      const response = await axios
        .post(
          "http://localhost:4000/api/v1/users/login",
          user,
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        )
        .catch((err) => {
          if (err.response) {
            return Alart.alartLoginError(
              err.response.status,
              err.response.data
            );
          }
        });
      if (response) {
        // update user active
        ApiService.updateActive("users", response.data.user.id, {
          active: true,
        });
        response.data.user.active = true;

        // get current date when user logged in
        const date = new Date();

        // set expire date for 1h
        date.setHours(date.getHours() + 1);
        // date.setSeconds(date.getSeconds() + 20);

        const item = {
          user: response.data.user,
          token: response.data.token,
          expDate: date,
        };

        // set Item into localStorage
        localStorage.setItem("token", JSON.stringify(item));

        // alert when user logged in success
        Alart.alartLoginSuccess();

        // redirect to Home Page
        setNavigate(true);
        window.location.reload(true);
      }
    } else {
      user.email
        ? Alart.alartLoginEmpty("Password")
        : Alart.alartLoginEmpty("Email");
    }
  };

  if (navigate) return <Navigate to="/" />;

  const handleKeyPress = (event) => {
    if (event.key == "Enter") login();
  };

  return (
    <div className="container-fluid login-form">
      <div className="row">
        <div className="col-12 col-lg-6 mb-5">
          <div className="d-flex flex-column ms-5">
            {companys &&
              companys.map((company) => (
                <div className="text-center" key={company._id}>
                  <img
                    key={company._id}
                    src={company.logo}
                    style={{ width: "185px" }}
                    alt="logo"
                  />
                  <h4 className="mt-1 mb-5 pb-1">{company.name}</h4>
                </div>
              ))}

            <p>Please login to your account</p>
            <label>Email Address</label>
            <input
              className="mb-4 p-2"
              id="form1"
              type="email"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
            <label>Password</label>
            <input
              className="mb-4 p-2"
              id="form2"
              type="password"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
              onKeyPress={handleKeyPress}
            />

            <div className="text-center pt-1 mb-5 pb-1">
              <button
                className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                type="button"
                onClick={login}
              >
                Log in
              </button>
              <a
                className="text-muted"
                href="#!"
                onClick={() => Alart.alartForgotPassword()}
              >
                Forgot password?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>

              <Link to="/sign-up" className="ms-2 mx-2 btn btn-outline-danger">
                Create new
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6 mb-5 rounded">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            {companys &&
              companys.map((company) => (
                <div
                  className="text-center text-white px-3 py-4 p-md-5 mx-md-4"
                  key={company._id}
                >
                  <img
                    key={company._id}
                    src={company.logo}
                    style={{ width: "185px" }}
                    alt="logo"
                  />
                  <h4 className="mb-4 mt-3">We are more than just a company</h4>
                  <p className="small mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
