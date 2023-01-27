import React from "react";

function GraphBar({ value, color }) {
  return (
    <div
      style={{
        width: "3px",
        height: `${value}px`,
        background: color,
        border: "1px solid black",
      }}
    ></div>
  );
}

export default GraphBar;
