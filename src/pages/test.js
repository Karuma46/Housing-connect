import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Test extends Component {
  
  render(){
    return (
      <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
          <div>
              <img src="http://localhost/housing-media/images/p3.jpg" alt="" />
          </div>
          <div>
              <img src="http://localhost/housing-media/images/p2.jpg" alt=""/>
          </div>
          <div>
              <img src="http://localhost/housing-media/images/p1.jpg" alt="" />
          </div>
      </Carousel>
    )
  }
}

export default Test;