import React, { Component } from 'react';
import Slider from "react-slick";
import ToggleButton from 'react-toggle-button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/styles/hljs';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';

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

  contentIndexes = [...Array.from({ length: 10 }, (v, k) => k + 1).map((item) => item)];

  render() {
    const { enableMagicSliderDots } = this.state;

    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    if (enableMagicSliderDots)
      settings['appendDots'] = (dots) => {
        return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={30} />
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

        <section className="code-example">
          <h4>API - <a href="https://patricktran.github.io/react-magic-slider-dots/" target="_blank">click here</a></h4>
          <h4>Installation</h4>
          <SyntaxHighlighter language='javascript' style={tomorrowNightEighties}>
            {`
            //install react slick and css
            npm install react-slick --save
            npm install slick-carousel --save

            //install react-magic-slider-dots
            npm install react-magic-slider-dots --save
        `}</SyntaxHighlighter>
          <h4></h4>
          <SyntaxHighlighter language='javascript' style={tomorrowNightEighties}>{
            `
        import React, { Component } from 'react'
        import Slider from 'react-slick';
        import 'slick-carousel/slick/slick.css';
        import 'slick-carousel/slick/slick-theme.css';
        import MagicSliderDots from 'react-magic-slider-dots';
        import 'react-magic-slider-dots/magic-dots.css';

        class App extends Component {

        render() {

          const settings = {
              dots: true,
              arrows: true,
              infinite: false,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              appendDots: (dots) => {
                return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={30} />
              }
            };

            return (<Slider {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>)
          }
        }`
          }</SyntaxHighlighter>
        </section>
      </div>
    );
  }
}
