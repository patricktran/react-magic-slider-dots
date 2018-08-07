import React, { Component } from 'react';
import Slider from "react-slick";
import ToggleButton from 'react-toggle-button';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/react-magic-slider-dots.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      enableMagicSliderDots: true
    }
  }

  handleDotToggle = () => {
    this.setState({
      enableMagicSliderDots: !this.state.enableMagicSliderDots
    });
  }

  contentIndexes = [...Array.from({ length: 18 }, (v, k) => k + 1).map((item) => item)];

  render() {
    const { enableMagicSliderDots } = this.state;

    var settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    if (enableMagicSliderDots)
      settings['appendDots'] = (dots) => {
        return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />
      }

    return (
      <div>
        <label><ToggleButton
          value={enableMagicSliderDots}
          onToggle={this.handleDotToggle} />
          &nbsp;enable magic-slider-dots
        </label>
        <Slider {...settings} key={`slider_${enableMagicSliderDots}`}>
          {this.contentIndexes.map(index => <div key={index}><h3>{index}</h3></div>)}
        </Slider>
      </div>
    );
  }
}
