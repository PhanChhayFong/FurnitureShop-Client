import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style/sidebar.css";

export default function Sidebar() {

    const [categories, setCategories] = useState({});


    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/products/get/product_category')
        .then(res => {
            setCategories(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    
  return (
    <div className="col-lg-3">
        <div className="shop__sidebar">
            {/* start search tool */}
            <div className="shop__sidebar__search">
                <form action="#">
                    <input type="text" placeholder="Search..." />
                    <button type="submit"><span className="icon_search" /></button>
                </form>
            </div>
            {/* end search tool */}
            <div className="shop__sidebar__accordion">
                <div className="accordion" id="accordionExample">
                    {/* start filter category*/}
                    <div className="card">
                        <div className="card-heading">
                            <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
                        </div>
                        <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                            <div className="card-body">
                            <div className="shop__sidebar__categories">
                                <ul className="nice-scroll">
                                    
                                {Object.keys(categories).map((key => 
                                    <li key={key}>
                                        <Link to={`/shop/product_category/${categories[key]._id.toString()}`}>
                                            {categories[key].name} ({categories[key].count})
                                        </Link>
                                    </li>
                                ))}
                              
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* end filter category*/}

                    {/* start filter price*/}
                    <div className="card">
                        <div className="card-heading">
                            <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                        </div>
                        <div id="collapseThree" className="collapse show" data-parent="#accordionExample">
                            <div className="card-body">
                            <div className="shop__sidebar__price">
                                <ul>
                                <li><a href="#">$0.00 - $50.00</a></li>
                                <li><a href="#">$50.00 - $100.00</a></li>
                                <li><a href="#">$100.00 - $150.00</a></li>
                                <li><a href="#">$150.00 - $200.00</a></li>
                                <li><a href="#">$200.00 - $250.00</a></li>
                                <li><a href="#">250.00+</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* end filter price*/}
                    
                   
                </div>
            </div>
        </div>
    </div>
  )
}
