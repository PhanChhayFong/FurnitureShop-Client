import React from "react";
import Sliders from "./../components/Slider/Sliders";
import Banner from "./../components/Banner";
import NewArrival from "../components/NewArrival";
import HotSaleProduct from "../components/HotSaleProduct";
import Product from "./../components/Product";


export default function HomePage(){
    return(
        <div>
            <Sliders/>
            <Banner/>
            <NewArrival/>
            <HotSaleProduct/>
            <Product/>
         
        </div>
    )
}