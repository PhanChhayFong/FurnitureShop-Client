import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function NewArrival () {
    const [products, setProducts]= useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/products/get/new_arrival_product")
        .then(res=>{
            // console.log(res);
            setProducts(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);


  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  const userId = user ? user.user.id : "";

  console.log(userId);
  
  const handleAddToCart = async (productId, proQty) => {
      try {

        const productResponse = await axios.get(`http://localhost:5000/api/product/${productId}`);
        const subStractCountInStock = productResponse.data;
        subStractCountInStock.countInStock -= proQty;

        // get all the data of cart item by each user id
        const response = await axios.get(`http://localhost:5000/api/v1/shoppingcarts/cart-item/${userId}`);
        const items = response.data;

        // check the exist cart item that is already exist
        const existCartItem = items.find(item => item.product._id === productId);
        if(existCartItem){
            existCartItem.quantity += proQty;
            await axios.put(`http://localhost:5000/api/v1/shoppingcarts/update-cart/${existCartItem._id}`, { quantity: existCartItem.quantity });

            await axios.put(`http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`, subStractCountInStock);
        }
        else{
            await axios.post('http://localhost:5000/api/v1/shoppingcarts/add-cart-item', {
                user: userId,
                product: productId,
                instance: 'cart',
                quantity: proQty
            });

            await axios.put(`http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`, subStractCountInStock);
        }

        setCart(response.data);
        return response;
      } catch (err) {
          console.log(err)
      }
  }

  const handleAddToWishlist = async (productId) => {
      try {
          const response = await axios.post('http://localhost:5000/api/v1/shoppingcarts/add-cart-item', {
              user: userId,
              product: productId,
              instance: 'wishlist'
          });

          setWishlist({...wishlist, [productId]: response.data });
          return response;
      } catch (err) {
          console.log(err)
      }
  }

  

    return(
    <section className="product spad">
      <div className="container">
        <div className="row mb-5">
                <div className="col-12 text-center mb-5">
                    <h2 className="fw-bold fs-1">New Arrival Products</h2>
                </div>
            </div>
        <div className="row product__filter">
        {products.map(product=>
            <div key={product.id} className="col-lg-3 col-md-6 col-6">
                <div className="product__item">
                    <div className="product__item__pic set-bg" style={{backgroundImage : `url(${product.image})`}}>
                    <span className="label bg-dark text-light">New</span>
                        <ul className="product__hover">
                            <li>
                                <a href="#" onClick={() => handleAddToWishlist(product.id)}>
                                    {wishlist[product.id] ? <img src="img/icon/red-heart.png" alt /> : <img src="img/icon/heart.png" alt />}
                                </a>
                            </li>
                            <li><Link to={`/shop/product_detail/${product.id}`}><img src="img/icon/search.png" alt /></Link></li>
                            
                        </ul>
                    </div>
                    <div className="product__item__text">
                    <h6>{product.name}</h6>
                    <a href="#" className="add-cart" onClick={() => handleAddToCart(product.id, 1)}>+ Add To Cart</a>
                    <div className="rating">
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                    </div>
                    <h5>${product.regularPrice.toFixed(2)}</h5>
                    <div className="product__color__select">
                        <label htmlFor="pc-4">
                        <input type="radio" id="pc-4" />
                        </label>
                        <label className="active black" htmlFor="pc-5">
                        <input type="radio" id="pc-5" />
                        </label>
                        <label className="grey" htmlFor="pc-6">
                        <input type="radio" id="pc-6" />
                        </label>
                    </div>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
    )
}
