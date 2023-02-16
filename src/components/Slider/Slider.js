import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Slider() {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/sliders")
      .then((res) => setSliders(res.data));
  }, []);
  return (
    <section className="hero">
      <div className="hero__slider owl-carousel">
        {sliders.map((slider) => (
          <div
            className="hero__items set-bg"
            key={slider.id}
            style={{
              backgroundImage: `url(${slider.image})`,
              width: "500px",
              height: "200px",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text">
                    <h6>{slider.miniTitle}</h6>
                    <h2>{slider.title}</h2>
                    <p>{slider.description}</p>
                    <a href="#" className="primary-btn">
                      Shop now <span className="arrow_right" />
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
