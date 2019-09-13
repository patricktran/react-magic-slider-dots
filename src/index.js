import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './magic-dots.css';

export default class MagicSliderDots extends Component {
  constructor(props) {
    super(props);

    // init
    this.previousActiveIndex = 0;
    this.hasAnimated = false;
    this.minIndex = 0;
    this.maxIndex = 0;
    this.breakPointActiveIndex = 0;
    this.addActiveClassToLastDot = false;
  }

  //handle react-slick breakpoints
  componentDidUpdate(prevProps) {
    const prevDots = prevProps.dots;
    const { dots: currentDots, activeDotClassName, numDotsToShow } = this.props;

    //moving from more dots to less dots
    if (prevDots && currentDots && prevDots.length > currentDots.length) {
      //edge case - last dot was active
      if (prevDots[prevDots.length - 1].props.className === activeDotClassName) {
        this.breakPointActiveIndex = currentDots.length - 1;
        this.previousActiveIndex = this.breakPointActiveIndex - 1;
        this.addActiveClassToLastDot = true;
      }

      //edge case - last active index is at end of current dots or exceeds current dot length
      const lastActiveDot = prevDots.find(dot => dot.props.className === activeDotClassName);
      let lastActiveIndex = parseInt(lastActiveDot.key);

      if (lastActiveIndex > currentDots.length - 1) {
        this.breakPointActiveIndex = currentDots.length - 1;
        this.previousActiveIndex = this.breakPointActiveIndex - 1;
        this.addActiveClassToLastDot = true;
      }

      //adjust minIndex and maxIndex if necessary
      if (this.minIndex < 0) {
        this.minIndex = 0;
        this.maxIndex = numDotsToShow - 1;
      }

      if (this.maxIndex > currentDots.length - 1) {
        this.maxIndex = currentDots.length - 1;
        this.minIndex = this.maxIndex - numDotsToShow + 1;
      }

      this.forceUpdate();
    } else if (prevDots && currentDots && prevDots.length < currentDots.length) {
      //edge case - adjust minIndex and maxIndex if active dot will be out of the View determined by min/max index
      const currentActiveDot = currentDots.find(dot => dot.props.className === activeDotClassName);
      let currentActiveIndex = parseInt(currentActiveDot.key);

      if (currentActiveIndex >= this.maxIndex) {
        this.maxIndex = currentActiveIndex + 1;
        this.minIndex = this.maxIndex - numDotsToShow + 1;
      }

      //adjust minIndex and maxIndex if necessary
      if (this.maxIndex > currentDots.length - 1) {
        this.maxIndex = currentDots.length - 1;
        this.minIndex = this.maxIndex - numDotsToShow + 1;
      }

      this.forceUpdate();
    }
  }

  render() {
    const {
      dots,
      numDotsToShow,
      dotWidth,
      dotContainerClassName,
      activeDotClassName,
      prevNextDotClassName
    } = this.props;

    const active = dots.find(dot => dot.props.className === activeDotClassName);
    let adjustedDots = [...dots];
    //if no current activeIndex, then due to react-slick breakpoint - use generated breakPointActiveIndex
    let activeIndex = active ? parseInt(active.key) : this.breakPointActiveIndex;
    //consider '>=' as moving forward to support react-slick breakpoint use case
    const isMovingForward = activeIndex >= this.previousActiveIndex;

    // need to subtract 2 from numDotsToShow since array index are zero-based
    if (
      (activeIndex > numDotsToShow - 2 && adjustedDots.length > numDotsToShow) ||
      this.hasAnimated
    ) {
      if (isMovingForward) {
        if (activeIndex === this.maxIndex && activeIndex !== dots.length - 1) {
          // list will move left
          this.minIndex = activeIndex - (numDotsToShow - 2);
          this.maxIndex = activeIndex + 1;
        } else {
          // special case - handle if initialSlide from react-slick has a value greater than 0
          if (this.minIndex === 0 && this.maxIndex === 0) {
            if (activeIndex === dots.length - 1) {
              this.maxIndex = activeIndex;
              this.minIndex = this.maxIndex - (numDotsToShow - 1);
            } else {
              this.minIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
              this.maxIndex =
                this.minIndex + (numDotsToShow - 1) > dots.length - 1
                  ? dots.length - 1
                  : this.minIndex + (numDotsToShow - 1);
            }
          } else {
            if (activeIndex === dots.length - 1) {
              // moving carousel backward from 0 to max index
              this.maxIndex = dots.length - 1;
              this.minIndex = dots.length - numDotsToShow;
            }
          }
        }
      } else {
        // movingBackwards
        if (activeIndex === this.minIndex && activeIndex !== 0) {
          // list will move right
          this.minIndex = activeIndex - 1;
          this.maxIndex = this.minIndex + (numDotsToShow - 1);
        } else {
          if (activeIndex === 0) {
            // moving carousel forward from max index to 0
            this.maxIndex = numDotsToShow - 1;
            this.minIndex = 0;
          }
        }
      }

      this.hasAnimated = true;
      const firstViewableDotIndex = this.minIndex;
      const firstViewableDot = adjustedDots[firstViewableDotIndex];
      const lastViewableDotIndex = this.maxIndex;
      const lastViewableDot = adjustedDots[lastViewableDotIndex];

      //outside of bounds check - can be caused when using react-slick breakpoints
      //return null and dots will correctly re-render once componentDidUpdate lifecycle recalculates indexes
      if (!firstViewableDot || !lastViewableDot) {
        console.log('rendering null - outside of bounds', firstViewableDot, lastViewableDot);
        return null;
      }

      if (lastViewableDotIndex < adjustedDots.length - 1 && isMovingForward) {
        // moving foward - but not on the last dot
        adjustedDots = [
          ...adjustedDots.slice(0, firstViewableDotIndex),
          React.cloneElement(firstViewableDot, {
            className: prevNextDotClassName
          }),
          ...adjustedDots.slice(firstViewableDotIndex + 1, lastViewableDotIndex),
          React.cloneElement(lastViewableDot, {
            className: prevNextDotClassName
          }),
          ...adjustedDots.slice(lastViewableDotIndex + 1)
        ];
      } else if (lastViewableDotIndex === adjustedDots.length - 1) {
        // moving foward or backward - last dot visible - should appear not small
        adjustedDots = [
          ...adjustedDots.slice(0, firstViewableDotIndex),
          React.cloneElement(firstViewableDot, {
            className: prevNextDotClassName
          }),
          ...adjustedDots.slice(firstViewableDotIndex + 1, lastViewableDotIndex),
          this.addActiveClassToLastDot || activeIndex === lastViewableDotIndex
            ? React.cloneElement(lastViewableDot, {
                className: this.props.activeDotClassName
              })
            : lastViewableDot
        ];
      } else if (activeIndex > 1 && !isMovingForward) {
        // moving backwards the left
        adjustedDots = [
          ...adjustedDots.slice(0, firstViewableDotIndex),
          React.cloneElement(firstViewableDot, {
            className: prevNextDotClassName
          }),
          ...adjustedDots.slice(firstViewableDotIndex + 1, lastViewableDotIndex),
          React.cloneElement(lastViewableDot, {
            className: prevNextDotClassName
          }),
          ...adjustedDots.slice(lastViewableDotIndex + 1)
        ];
      } else {
        this.hasAnimated = false;
        // moving backwards on first dot - should appear not small
        // eq: (activeIndex === 1 || activeIndex === 0) && !isMovingForward
        adjustedDots = [
          ...adjustedDots.slice(0, lastViewableDotIndex),
          React.cloneElement(lastViewableDot, {
            className: prevNextDotClassName
          }),
          ...adjustedDots.slice(lastViewableDotIndex + 1)
        ];
      }
    }
    // no leftOffset in place, just render the dots
    else {
      const lastViewableDotIndex = Math.min(numDotsToShow, dots.length) - 1;
      this.minIndex = 0;
      this.maxIndex = lastViewableDotIndex;

      if (lastViewableDotIndex < adjustedDots.length - 1) {
        const lastViewableDot = adjustedDots[lastViewableDotIndex];

        adjustedDots = [
          ...adjustedDots.slice(0, lastViewableDotIndex),
          React.cloneElement(lastViewableDot, {
            className: prevNextDotClassName
          }),
          ...adjustedDots.slice(lastViewableDotIndex + 1)
        ];
      }
    }

    // track active index
    this.previousActiveIndex = activeIndex;
    this.addActiveClassToLastDot = false;
    // calculate container width
    const containerWidth =
      dots.length < numDotsToShow ? dots.length * dotWidth : numDotsToShow * dotWidth;

    const midIndex = (this.minIndex + this.maxIndex) / 2;

    // only give leftOffset if number of dots exceeds number of dots to show at one time
    const leftOffset =
      dots.length < numDotsToShow
        ? 0
        : (dotWidth * numDotsToShow - dotWidth) / 2 - midIndex * dotWidth;

    return (
      <div
        className={dotContainerClassName}
        style={{
          position: 'relative',
          overflow: 'hidden',
          margin: 'auto',
          width: containerWidth + 'px'
        }}
      >
        <ul style={{ transform: `translateX(${leftOffset}px)` }}> {adjustedDots} </ul>
      </div>
    );
  }
}

MagicSliderDots.propTypes = {
  /** array of HTML li elements representing the slider dot.   */
  dots: PropTypes.array.isRequired,
  /** number of slider dots to show. */
  numDotsToShow: PropTypes.number.isRequired,
  /** width, in pixels, of a slider dot including any margins/padding. */
  dotWidth: PropTypes.number.isRequired,
  /** class name of parent div. */
  dotContainerClassName: PropTypes.string,
  /** class name of active slider dot. */
  activeDotClassName: PropTypes.string,
  /** class name of left-most (prev) and right-most (next) slider dot. */
  prevNextDotClassName: PropTypes.string
};

MagicSliderDots.defaultProps = {
  dotContainerClassName: 'magic-dots slick-dots',
  activeDotClassName: 'slick-active',
  prevNextDotClassName: 'small'
};
