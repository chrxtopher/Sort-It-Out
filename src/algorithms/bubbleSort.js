function bubbleSort(numbersArray) {
  // uncomment console logs to see what is happening at each step
  for (let i = 0; i < numbersArray.length; i++) {
    // console.log(numbersArray);
    for (let j = 0; j < numbersArray.length - i - 1; j++) {
      // console.log(`${numbersArray[j]} :: ${numbersArray[j + 1]}`);
      if (numbersArray[j + 1]) {
        if (numbersArray[j] > numbersArray[j + 1]) {
          // console.log(`swapping ${numbersArray[j]} <-> ${numbersArray[j + 1]}`);
          const temp = numbersArray[j];
          numbersArray[j] = numbersArray[j + 1];
          numbersArray[j + 1] = temp;
        }
      }
    }
  }

  return numbersArray;
}

export default bubbleSort;

// Testing Below //

// const testArray = new Array(1000)
//   .fill(0)
//   .map((index) => Math.floor(Math.random() * 1000));

// console.log(BubbleSort(testArray) === testArray.sort((a, b) => a - b));

// node src/algorithms/bubbleSort.js
