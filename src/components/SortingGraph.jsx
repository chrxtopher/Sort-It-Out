import React, { useState } from "react";
import GraphBar from "./GraphBar";

function SortingGraph() {
  const [activeAlgorithm, setActiveAlgorithm] = useState("Bubble Sort");
  const [message, setMessage] = useState("Ready");
  const [speed, setSpeed] = useState(5);

  // creates an array of objects; value key is given a random number between 10-650
  // the value given will determine the length of the associated GraphBar
  const [numberArray, setNumberArray] = useState(
    new Array(50).fill({}).map((item) => ({
      active: false,
      value: Math.floor(Math.random() * (650 - 10) + 10),
    }))
  );

  // utilizes setTimeout function to slow down each algorithm for visualization purposes
  const pause = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSortChange = (e) => {
    e.preventDefault();
    setActiveAlgorithm(e.target.value);
  };

  const handleNewArrayClick = () => {
    const newArray = new Array(50).fill({}).map((item) => ({
      active: false,
      value: Math.floor(Math.random() * (650 - 10) + 10),
    }));
    setNumberArray(numberArray.map((number, index) => newArray[index]));
    setMessage("Ready");
  };

  const handleSortClick = () => {
    if (activeAlgorithm === "Merge Sort") {
      const sorted = mergeSort(compare, numberArray);
      setNumberArray(numberArray.map((number, index) => sorted[index]));
    } else {
      bubbleSort(numberArray);
    }
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  // used to pass a width prop argument to each GraphBar component - determined by array size
  // helps larger arrays to fit properly on the screen
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
      return 6;
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
        // active set to true/false to determine which array indexes are being compared
        array[j].active = true;
        array[j + 1].active = true;
        await pause(speed);

        if (array[j].value > array[j + 1].value) {
          const temp = array[j].value;
          array[j].value = array[j + 1].value;
          array[j + 1].value = temp;
          setNumberArray(numberArray.map((obj, index) => array[index]));
        }
        array[j].active = false;
        array[j + 1].active = false;
        setNumberArray(numberArray.map((obj, index) => array[index]));
      }
    }
  };

  ////////////////
  // Merge Sort //
  ////////////////

  const mergeSort = (compare, arrayOfElements) => {
    if (Array.isArray(arrayOfElements)) {
      if (arrayOfElements.length <= 1) {
        return arrayOfElements;
      }

      const middle = Math.floor(arrayOfElements.length / 2);

      const leftHalf = arrayOfElements.slice(0, middle);
      const rightHalf = arrayOfElements.slice(middle);

      const leftHalfSorted = mergeSort(compare, leftHalf);
      const rightHalfSorted = mergeSort(compare, rightHalf);

      return merge(compare, leftHalfSorted, rightHalfSorted);
    }

    return arrayOfElements;
  };

  /////////////
  // HELPERS //
  /////////////

  function compare(leftElement, rightElement) {
    return leftElement - rightElement;
  }

  function merge(compare, left, right) {
    const sorted = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      const comparison = compare(
        left[leftIndex].value,
        right[rightIndex].value
      );

      if (comparison <= 0) {
        sorted.push(left[leftIndex]);
        leftIndex++;
      } else {
        sorted.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return sorted.concat(
      leftIndex < left.length ? left.slice(leftIndex) : right.slice(rightIndex)
    );
  }

  //////////////////
  // Return Below //
  //////////////////

  return (
    <div className="sorting-graph">
      <header>
        <div className="sort-selection-buttons">
          <button
            className="change-sort-button"
            value="Bubble Sort"
            onClick={handleSortChange}
          >
            Bubble Sort
          </button>
          <button
            type="button"
            className="change-sort-button"
            value="Quick Sort"
            onClick={handleSortChange}
          >
            Quick Sort
          </button>
          <button
            className="change-sort-button"
            value="Merge Sort"
            onClick={handleSortChange}
          >
            Merge Sort
          </button>
        </div>
        <h1>
          {activeAlgorithm} -- {message}
        </h1>
        <form>
          <label>Speed: </label>
          <select
            onChange={handleSpeedChange}
            disabled={message === "Sorting" ? true : false}
          >
            <option value={0}>Fastest</option>
            <option value={20}>Fast</option>
            <option value={50}>Mid</option>
            <option value={80}>Slow</option>
            <option value={150}>Slowest</option>
          </select>
        </form>
        <div className="header-buttons">
          <button
            onClick={handleNewArrayClick}
            disabled={message === "Sorting" ? true : false}
          >
            New Array
          </button>
          <button
            onClick={handleSortClick}
            disabled={
              message === "Sorting" || message === "Sorted" ? true : false
            }
          >
            Sort
          </button>
        </div>
      </header>

      <div className="graph">
        {numberArray.map((obj) => {
          if (message === "Sorting") {
            return obj.active === true ? (
              <GraphBar
                value={obj.value}
                color="lightblue"
                width={determineWidth(numberArray.length)}
              />
            ) : (
              <GraphBar
                value={obj.value}
                color="salmon"
                width={determineWidth(numberArray.length)}
              />
            );
          } else if (message === "Sorted") {
            return (
              <GraphBar
                value={obj.value}
                color="lightgreen"
                width={determineWidth(numberArray.length)}
              />
            );
          } else {
            return (
              <GraphBar
                value={obj.value}
                color="salmon"
                width={determineWidth(numberArray.length)}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default SortingGraph;
