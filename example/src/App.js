import React, { Component } from 'react'
import Slider from "react-slick";
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/react-magic-slider-dots.css';

export default class App extends Component {

  contentIndexes = [...Array.from({ length: 18 }, (v, k) => k + 1).map((item) => item)];

  render() {
    var settings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: (dots) => {
        return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={30} />
      }
    };
    return (
      <Slider {...settings}>
        {this.contentIndexes.map(index => <div key={index}><h3>{index}</h3></div>)}
      </Slider>
    );
  }
}
