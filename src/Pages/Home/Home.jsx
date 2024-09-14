import React from "react";
import './Home.css'; // Import the CSS file for styles
import SearchBar from "../../components/searchbar/SearchBar";

const Ripple = ({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}) => {
  return (
<div>
<div className="searchbar-div">
    <SearchBar/>
  </div>
    <div className={`ripple-container ${className}`}>


      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "ripple-circle-dashed" : "ripple-circle-solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`ripple-circle ${borderStyle}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          
        );
      })}
    </div>
</div>
  );
};

export default Ripple;
