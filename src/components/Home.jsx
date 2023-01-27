import React, { useState } from "react";
import SortingGraph from "./SortingGraph";

function Home() {
  const [activeAlgorithm, setActiveAlgorithm] = useState("Quick Sort");

  const handleSortChange = (e) => {
    e.preventDefault();
    setActiveAlgorithm(e.target.value);
  };
  return (
    <div>
      <header>
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
        <button
          className="change-sort-button"
          value="Bubble Sort"
          onClick={handleSortChange}
        >
          Bubble Sort
        </button>
      </header>
      <div>
        <SortingGraph algorithm={activeAlgorithm} />
      </div>
    </div>
  );
}

export default Home;
