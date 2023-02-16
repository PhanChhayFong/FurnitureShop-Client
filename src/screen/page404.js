import React from "react";
import "./styles/page404.css";
import { Link } from "react-router-dom";
const page404 = () => {
  return (
    <>
        
      <div className="container-scroller not-found">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center text-center error-page bg-primary-1">
            <div className="row flex-grow">
              <div className="col-lg-7 mx-auto text-white">
                <div className="row align-items-center d-flex flex-row">
                  <div className="col-lg-6 text-lg-right pr-lg-4">
                    <h1 className="display-1 mb-0">404</h1>
                  </div>
                  <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                    <h2>SORRY!</h2>
                    <h3 className="font-weight-light">
                      The page you’re looking for was not found.
                    </h3>
                  </div>
                </div>
                
                
              </div>
              <div className="col-lg-4 text-white p-0">
                <div className="row justify-content-center d-flex p-0">
             
                    <img src="./img/pic-404.png" className="poster-404"/>
            
                  
                </div>
                
               
              </div>
              <div className="row mt-5">
                  <div className="col-12 text-center mt-xl-2">
                    <Link to="/" className="text-white font-weight-medium">Back to home</Link>
                  </div>
                </div>
              <div className="row mt-5">
                  <div className="col-12 mt-xl-2">
                    <p className="text-white font-weight-medium text-center">
                      Copyright © {new Date().getFullYear()} All rights reserved | By <Link to="/" style={{textDecoration: "none"}}>Furniture Shop</Link>
                    </p>
                  </div>
                </div>
            </div>
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
    </>
  );
};

export default page404;
