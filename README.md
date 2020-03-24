# react-magic-slider-dots

> React Magic Slider Dots Component for React Slick Carousel

##### _Inspired by Instagram_

[![NPM](https://img.shields.io/npm/v/react-magic-slider-dots.svg)](https://www.npmjs.com/package/react-magic-slider-dots) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![screenshot](/magic-slider-dots-screenshot.png?raw=true)

## Install

```bash
npm install --save react-magic-slider-dots
```

⚠️ Also install react-slick and slick-carousel for css and font [React Slick Documentation](https://github.com/akiran/react-slick)

```bash
npm install slick-carousel
npm install react-slick --save
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
```

## [DEMO](https://patricktran.github.io/react-magic-slider-dots/)

## Usage

```jsx
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';

class App extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: dots => {
        return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
      }
    };

    return (
      <Slider {...settings}>
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
        <div>
          <h3>7</h3>
        </div>
        <div>
          <h3>8</h3>
        </div>
      </Slider>
    );
  }
}
```

### API

This a list of props that you can pass down to the component:

| Property                | Description                                                      | Default value           | Type   | Required |
| ----------------------- | ---------------------------------------------------------------- | ----------------------- | ------ | -------- |
| `dots`                  | array of HTML li elements representing the slider dot            |                         | array  | yes      |
| `numDotsToShow`         | number of slider dots to show                                    |                         | number | yes      |
| `dotWidth`              | width, in pixels, of a slider dot including any margins/padding  |                         | number | yes      |
| `dotContainerClassName` | class name of parent div                                         | `magic-dots slick-dots` | string |
| `activeDotClassName`    | class name of active slider dot                                  | `slick-active`          | string |
| `prevNextDotClassName`  | class name of left-most (prev) and right-most (next) slider dot. | `small`                 | string |

## License

MIT © [patricktran](https://github.com/patricktran)
