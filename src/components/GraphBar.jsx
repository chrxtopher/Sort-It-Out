import React from "react";

function GraphBar({ value, color }) {
  return (
    <div
      style={{
        width: "1px",
        height: `${value}px`,
        background: color,
      }}
    ></div>
  );
}

export default GraphBar;
