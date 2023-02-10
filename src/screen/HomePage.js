import React from "react";
import Sliders from "./../components/Slider/Sliders";
import Banner from "./../components/Banner";
import NewArrival from "../components/NewArrival";
import HotSaleProduct from "../components/HotSaleProduct";
import Countdown from "./../components/Countdown";
import Product from "./../components/Product";
import LatestBlog from "./../components/Latest Blog";

export default function HomePage(){
    return(
        <div>
            <Sliders/>
            <Banner/>
            <NewArrival/>
            <HotSaleProduct/>
            <Countdown/>
            <Product/>
            <LatestBlog/>
        </div>
    )
}