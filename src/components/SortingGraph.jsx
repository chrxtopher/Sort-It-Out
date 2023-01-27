import React, { useState } from "react";
import GraphBar from "./GraphBar";

function SortingGraph({ algorithm }) {
  const [message, setMessage] = useState("Ready");
  const [numberArray, setNumberArray] = useState(
    new Array(150)
      .fill(0)
      .map((number) => Math.floor(Math.random() * (650 - 10) + 10))
  );

  const pause = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleNewArrayClick = () => {
    const newArray = new Array(numberArray.length)
      .fill(0)
      .map((number) => Math.floor(Math.random() * (650 - 10) + 10));
    setNumberArray(numberArray.map((number, index) => newArray[index]));
    setMessage("Ready");
  };

  const handleSortClick = () => {
    bubbleSort(numberArray);
  };

  const determineWidth = (total) => {
    if (total >= 850) {
      return 1;
    } else if (total >= 625) {
      return 2;
    } else if (total >= 450) {
      return 3;
    } else if (total >= 300) {
      return 4;
    } else if (total >= 175) {
      return 5;
    } else {
      return 10;
    }
  };

  /////////////////
  // Bubble Sort //
  /////////////////

  const bubbleSort = async (array) => {
    setMessage("Sorting");
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) setMessage("Sorted");
      for (let j = 0; j < array.length - i - 1; j++) {
        await pause();
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          setNumberArray(numberArray.map((number, index) => array[index]));
        }
      }
    }
  };

  return (
    <div className="sorting-graph">
      <h1>
        {algorithm} -- {message}
      </h1>
      <button
        onClick={handleNewArrayClick}
        disabled={message === "Sorting" ? true : false}
      >
        New Array
      </button>
      <button
        onClick={handleSortClick}
        disabled={message === "Sorting" || message === "Sorted" ? true : false}
      >
        Sort
      </button>
      <div className="graph">
        {numberArray.map((number) =>
          message === "Sorted" ? (
            <GraphBar
              value={number}
              color="limegreen"
              width={determineWidth(numberArray.length)}
            />
          ) : (
            <GraphBar
              value={number}
              color="pink"
              width={determineWidth(numberArray.length)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default SortingGraph;
