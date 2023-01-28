import React, { useState } from "react";
import GraphBar from "./GraphBar";

function SortingGraph() {
  const [activeAlgorithm, setActiveAlgorithm] = useState("Bubble Sort");
  const [message, setMessage] = useState("Ready");
  const [numberArray, setNumberArray] = useState(
    new Array(150).fill({}).map((item) => ({
      active: false,
      value: Math.floor(Math.random() * (650 - 10) + 10),
    }))
  );

  const [speed, setSpeed] = useState(5);

  const pause = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSortChange = (e) => {
    e.preventDefault();
    setActiveAlgorithm(e.target.value);
  };

  const handleNewArrayClick = () => {
    const newArray = new Array(150).fill({}).map((item) => ({
      active: false,
      value: Math.floor(Math.random() * (650 - 10) + 10),
    }));
    setNumberArray(numberArray.map((number, index) => newArray[index]));
    setMessage("Ready");
  };

  const handleSortClick = () => {
    bubbleSort(numberArray);
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
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
