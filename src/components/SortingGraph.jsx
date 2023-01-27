import React, { useState } from "react";
import GraphBar from "./GraphBar";

function SortingGraph({ algorithm }) {
  const [numberArray, setNumberArray] = useState(
    new Array(300)
      .fill(0)
      .map((number) => Math.floor(Math.random() * (750 - 5) + 5))
  );

  const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        setTimeout(() => {
          if (array[j + 1]) {
            if (array[j] > array[j + 1]) {
              const temp = array[j];

              array[j] = array[j + 1];
              array[j + 1] = temp;

              setNumberArray(numberArray.map((number, index) => array[index]));
            }
          }
        }, 500);
      }
    }
  };

  const handleSortClick = () => {
    bubbleSort(numberArray);
  };

  return (
    <div className="sorting-graph">
      <h1>Sorting with {algorithm}</h1>
      <button onClick={handleSortClick}>Sort</button>
      <div className="graph">
        {numberArray.map((number) => (
          <GraphBar value={number} color="pink" />
        ))}
      </div>
    </div>
  );
}

export default SortingGraph;
