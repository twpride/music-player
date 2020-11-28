import React, { useCallback, useState, useEffect, useRef } from "react";
import { throttle } from "lodash";
import "./touchSlider.css";

export default function TouchSlider() {
  const slider = useRef();
  const [touchState, setTouchState] = useState({
    touchStartYPosition: 0,
    isDragging: false,
    touchYPosition: 0
  });

  const handleTouchStart = useCallback(event => {
    setTouchState(prevState => ({ ...prevState, isDragging: true }));
  }, []);

  const handleTouchMove = useCallback(
    event => {
      console.log(
        touchState.touchStartYPosition,
        event.touches[0].clientY,
        touchState.touchYPosition
      );
      if (touchState.isDragging === true && event.touches[0].clientY) {
        if (!touchState.touchStartYPosition) {
          setTouchState(prevTouchState => ({
            ...prevTouchState,
            touchStartYPosition: event.touches[0].clientY
          }));
        } else {
          if (event.touches[0].clientY > touchState.touchStartYPosition) {
            console.log("IS GREATER");
            setTouchState(prevTouchState => ({
              ...prevTouchState,
              touchYPosition: touchState.touchYPosition + 1
            }));
          }
        }
      }
    },
    [
      touchState.isDragging,
      touchState.touchStartYPosition,

    ]
  );

  const handleTouchEnd = useCallback(
    event => {
      if (touchState.isDragging) {
        setTouchState(prevState => ({
          ...prevState,
          isDragging: false,
          touchStartYPosition: 0
        }));
      }
    },
    [touchState.isDragging, touchState.touchStartYPosition]
  );

  useEffect(() => {
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  return (
    <div className="touchSlider">
      <div className="sliderBox" ref={slider} onTouchStart={handleTouchStart}>
        {touchState.touchYPosition}
      </div>
    </div>
  );
}