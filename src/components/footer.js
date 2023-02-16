import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Footer(){

    const [companys, setCompanys] = useState();
    const [categories, setCategories] = useState([]);
    
    useEffect(() =>{
        axios.get('http://localhost:5000/api/v1/companys')
        .then(res =>{
            setCompanys(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err));
    },[]) ;

    return(
        
        <footer className="footer">
           

            
            <div className="container">
                <div className="row">
                {companys && companys.map(company =>(
                    <div className="col-lg-3 col-md-6 col-sm-6" key={company._id}>
                        <div className="footer__about text-center">
                            <div className="footer__logo">
                                <Link to="/" className="text-center"><img src={company.logo} alt /></Link>
                            </div>
                            <h3 className="text-light fw-bold">{company.name}</h3>
                            <p>The customer is at the heart of our unique business model, which includes design.</p>
                            <p><span><i class="fas fa-envelope me-2"></i></span> <a href="mailto:{company.email}" style={{textDecoration: "none", color: "#fff"}}>{company.email}</a></p>
                            <p><span><i class="fas fa-phone-square-alt me-2"></i></span> <a href="tel:{company.telephone}" style={{textDecoration: "none", color: "#fff"}}>{company.telephone}</a></p>
                            <p><span><i class="far fa-map me-2"></i></span> {company.address}</p>
                        </div>
                    </div>
                ))}

                
                    <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6" >
                        <div className="footer__widget">
                        <h6>Useful Links</h6>
                        <ul>
                        {categories.map(category => (
                            <li key={category._id}>
                                {/* <a href="#">Clothing Store</a> */}
                                <Link to="#">{category.name}</Link>
                            </li>
                        ))} 
                        </ul> 
                      
                        </div>
                    </div>
               
                
                <div className="col-lg-2 col-md-3 col-sm-6">
                    <div className="footer__widget">
                    <h6>Shopping</h6>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Payment Methods</a></li>
                        <li><a href="#">Delivary</a></li>
                        <li><a href="#">Return &amp; Exchanges</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                    <div className="footer__widget">
                    <h6>NewLetter</h6>
                    <div className="footer__newslatter">
                        <p>Be the first to know about new arrivals, look books, sales &amp; promos!</p>
                        <form action="#">
                        <input type="text" placeholder="Your email" />
                        <button type="submit"><span className="icon_mail_alt" /></button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-lg-12 text-center">
                    {companys && companys.map(company =>(
                
                    
                        <div className="footer__copyright__text" >
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            <p>
                                Copyright ©<span className="me-2">{new Date().getFullYear()}.</span>
                                
                                All rights reserved | By <Link to="/">{company.name}</Link>
                            </p>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                        </div>
                    
                    ))}
                </div>
                </div>
            </div>
     

        </footer>

    )
}