import React from "react";
import Sliders from "./../components/Slider/Sliders";
import Banner from "./../components/Banner";
import Product from "./../components/Product";
import Countdown from "./../components/Countdown";
import LatestBlog from "./../components/Latest Blog";

export default function HomePage(){
    return(
        <div>
            <Sliders/>
            <Banner/>
            <Product/>
            <Countdown/>
            <LatestBlog/>
        </div>
    )
}