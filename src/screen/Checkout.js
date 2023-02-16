import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Alart from '../services/Alart';

export default function Checkout() {

    const i = 0;
    const [cartItem, setCartItem] = useState([]);
    const [clearCart ,setclearCartItem] = useState([]);
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(token) : "";
    const userId = user ? user.user.id : "";

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/shoppingcarts/cart-item/${userId}`)
        .then(res => setCartItem(res.data))
        .catch(err => console.log(err));
    });

    const subTotal = cartItem.reduce((total, item) => total + (item.product.salePrice ? item.product.salePrice : item.product.regularPrice) * item.quantity, 0);
    const taxPrice = subTotal * 0.1;
    const totalPrice = subTotal + taxPrice;
    
    const [order, setOrder] = useState({
        orderItems: [
            {
                product: "",
                quantity: ""
            }
        ],
        user: "",
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        shippingAddress: "",
        city: "",
        country: "",
        tax: "",
        subTotal: "",
        totalPrice: ""
    });

    const handleSubmitPlaceOrder = async (e) => {
        // protect page without being refreshed.
        e.preventDefault();

        try {
            const orderData = {
                orderItems: cartItem.map(item => ({
                    product: item.product.id,
                    quantity: item.quantity
                })),
                user: userId,
                firstname: order.firstname,
                lastname: order.lastname,
                phone: order.phone,
                email: order.email,
                shippingAddress: order.shippingAddress,
                city: order.city,
                country: order.country,
                tax: taxPrice,
                subTotal: subTotal,
                totalPrice: totalPrice
            }
    
            const orderResponse = await axios.post(`http://localhost:5000/api/v1/orders`, orderData);
            setOrder(orderResponse.data, Alart.alartOrderSuccess());

            // clear cart
            const clearCartItem = await axios.delete(`http://localhost:5000/api/v1/shoppingcarts/clear/cart_items/${userId}`);
            setclearCartItem(clearCartItem);

            return clearCart;
            
        } catch (err) {
            console.log(err);
        }
       
    }

    const handleChange = (e) =>{
        setOrder({
            ...order, [e.target.name]: e.target.value
        })
    }
    
    return (
        <div>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Check Out</h4>
                                <div className="breadcrumb__links">
                                    <a href="./index.html">Home</a>
                                    <a href="./shop.html">Shop</a>
                                    <span>Check Out</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="checkout spad">
                <div className="container">

                    {cartItem.length === 0 ?
                        <>
                        
                            <div className='row'>
                                <div className="col-lg-12 text-center">
                                    <h1>Cart is empty...</h1>
                                    <p>Please go to shop and add product</p>
                                    <Link to="/shop" className="btn btn-success btn-sm px-4 py-2 fw-bold text-center">Shop Now <i class="fas fa-shopping-cart ms-1"></i></Link>
                                </div>
                            </div>
                        
                        </>
                        :
                        <>
                        
                            <div className="checkout__form">
                                <form action="#" onSubmit={handleSubmitPlaceOrder}>
                                    <div className="row">
                                        <div className="col-lg-8 col-md-6">
                                            <h6 className="coupon__code"><span className="icon_tag_alt" /> Have a coupon? <a href="#">Click
                                                here</a> to enter your code</h6>
                                            <h6 className="checkout__title">Billing Details</h6>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Fist Name<span>*</span></p>
                                                        <input type="text" name='firstname' value={order.firstname} onChange = {handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Last Name<span>*</span></p>
                                                        <input type="text" name='lastname' value={order.lastname} onChange = {handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Country<span>*</span></p>
                                                <input type="text" name="country" value={order.country} onChange = {handleChange}/>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Address<span>*</span></p>
                                                <input type="text" placeholder="Street Address" className="checkout__input__add" name='shippingAddress' value={order.shippingAddress} onChange = {handleChange}/>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Town/City<span>*</span></p>
                                                <input type="text" name='city' value={order.city} onChange = {handleChange}/>
                                            </div>
                            
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Phone<span>*</span></p>
                                                        <input type="text" name="phone" value={order.phone} onChange = {handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Email<span>*</span></p>
                                                        <input type="text" name='email' value={order.email} onChange = {handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                                
                                            <div className="checkout__order">
                                                <h4 className="order__title">Your order</h4>
                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={2}>Product</th>
                                                            <th className='text-center'>Price</th>
                                                            <th className='text-center'>Qty</th>
                                                            <th className='text-center'>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                        {cartItem.map((item, i=1) => (
                                                            <><tr>
                                                                <td style={{width: "10px"}}>{i+1}.</td>
                                                                <td>{item.product.name.length === 12 ? item.product.name : item.product.name.substr(0, 12) + "..."}</td>
                                                                <td className='text-center'>${item.product.salePrice ? item.product.salePrice.toFixed(2) : item.product.regularPrice.toFixed(2)}</td>
                                                                <td className='text-center'>{item.quantity}</td>
                                                                <td className='text-center'>${((item.product.salePrice ? item.product.salePrice.toFixed(2) : item.product.regularPrice.toFixed(2)) * item.quantity).toFixed(2)}</td></tr>
                                                            </>
                                                        ))}
                                                        
                                                    </tbody>
                                                </table>
                                                <ul className="checkout__total__all">
                                                    <li>Subtotal <span>${subTotal.toFixed(2)}</span></li>
                                                    <li>Tax <span>${taxPrice.toFixed(2)}</span></li>
                                                    <li>Total <span>${totalPrice.toFixed(2)}</span></li>
                                                </ul>
                                                
                                            
                                                <div className="checkout__order__products">Payment Method</div>
                                                <div className="checkout__input__checkbox">
                                                    <label htmlFor="payment">
                                                        Cash On Delivery
                                                        <input type="checkbox" id="payment" />
                                                        <span className="checkmark" />
                                                    </label>
                                                </div>
                                            
                                                <button type="submit" className="site-btn">PLACE ORDER</button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>

                        </>
                    
                    }

                    
                </div>
            </section>
        </div>

    )
}
