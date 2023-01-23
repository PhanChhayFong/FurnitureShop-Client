import React, { useEffect, useState } from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import background from './SliderBackground.jpg'
import './style.css'

export default function Sliders() {
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [sliders, setSliders]= useState([]);
  useEffect(() => {
      axios.get("http://localhost:5000/api/v1/sliders/get/enable")
      .then(res=>{
          console.log(res);
          setSliders(res.data);
      })
      .catch(err =>{
          console.log(err);
      })
  })
  const styles = {
    Bslide:{
      backgroundImage:`url(${background})`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"100% 500px",
      backgroundPosition:"center center",
      height:"500px",
    },
    slide:(someBoolean)=>({
      backgroundImage : someBoolean,
      width:"100%",
      height:"500px",
      margin:"auto",
      float:"right",
      backgroundRepeat:"no-repeat",
      backgroundSize:"40%",
      backgroundPosition:"right center",
    }),
    txtBox:{
      width:"50%",
      left:"30px",
      top:"100px",
      textAlign:"left"
    }
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={styles.Bslide}>
    {sliders.map(slider=>
      <Carousel.Item>
        <div style={styles.slide(`url(${slider.image})`)}></div>
        <Carousel.Caption style={styles.txtBox}>
          <h5 style={{color:"red",textTransform:"uppercase"}} className='fw'>{slider.miniTitle}</h5>
          <h1 className='fw'>{slider.title}</h1>
          <p className='fw'>{slider.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    )}
    </Carousel>
  );
}