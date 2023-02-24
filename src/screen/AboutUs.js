import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

export default function AboutUs() {
  const [userAdmin, setUserAdmin] = useState([]);
  const [countClient, setCountClient] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users/get/user-admin")
      .then((res) => setUserAdmin(res.data));
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((res) => setCountClient(res.data));
    axios
      .get("http://localhost:5000/api/v1/categories")
      .then((res) => setCategory(res.data));
    axios
      .get("http://localhost:5000/api/v1/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      {/* BreaadCrumb */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>About Us</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <span>About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about__pic">
                <img src="img/about/about-banner.jpg" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>Who We Are ?</h4>
                <p>
                  Contextual advertising programs sometimes have strict policies
                  that need to be adhered too. Let’s take Google as an example.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>Who We Do ?</h4>
                <p>
                  In this digital generation where information can be easily
                  obtained within seconds, business cards still have retained
                  their importance.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>Why Choose Us</h4>
                <p>
                  A two or three storey house is the ideal way to maximise the
                  piece of earth on which our home sits, but for older or infirm
                  people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonial">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="testimonial__text">
                <span className="icon_quotations" />
                <p>
                  “Going out after work? Take your butane curling iron with you
                  to the office, heat it up, style your hair before you leave
                  the office and you won’t have to make a trip back home.”
                </p>
                <div className="testimonial__author">
                  <div className="testimonial__author__pic">
                    <img src="img/about/testimonial-author.jpg" />
                  </div>
                  <div className="testimonial__author__text">
                    <h5>Augusta Schultz</h5>
                    <p>Fashion Design</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 p-0 mt-5 pe-5">
              <img src="img/about/catalog-furniture-custom.jpg" />
            </div>
          </div>
        </div>
      </section>
      <section className="counter spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item">
                <div className="counter__item__number">
                  <h2 className="cn_num">
                    {countClient.length - userAdmin.length}
                  </h2>
                </div>
                <span>
                  Our <br />
                  Clients
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item">
                <div className="counter__item__number">
                  <h2 className="cn_num">{category.length}</h2>
                </div>
                <span>
                  Total <br />
                  Categories
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item">
                <div className="counter__item__number">
                  <h2 className="cn_num">{products.length}</h2>
                </div>
                <span>
                  Our <br />
                  Products
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item">
                <div className="counter__item__number">
                  <h2 className="cn_num">98</h2>
                  <strong>%</strong>
                </div>
                <span>
                  Happy <br />
                  Customer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Our Team</span>
                <h2>Meet Our Team</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {userAdmin.map((user) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={user._id}>
                <Card style={{ border: "none" }}>
                  <Card.Img
                    src={user.image}
                    style={{
                      height: "360px",
                      objectFit: "cover",
                      maxHeight: "360px",
                    }}
                  />
                  <Card.Body className="text-start px-0 py-4">
                    <Card.Title
                      as="h4"
                      style={{ color: "#111111 !important", fontWeight: "700" }}
                    >
                      {" "}
                      {user.name}
                    </Card.Title>
                    <Card.Text>
                      {user.isAdmin === true ? "Admin" : ""}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="clients spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Partner</span>
                <h2>Happy Clients</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-1.png" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-2.png" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-3.png" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-4.png" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-5.png" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-6.png" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-7.png" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="img/clients/client-8.png" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
