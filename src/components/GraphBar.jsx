import React from "react";

function GraphBar({ value, color, width }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${value}px`,
        background: color,
      }}
    ></div>
  );
}

export default GraphBar;
