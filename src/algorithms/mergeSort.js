function mergeSort(compare, arrayOfElements) {
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
}

// helpers below //

function compare(leftElement, rightElement) {
  return leftElement - rightElement;
}

function merge(compare, left, right) {
  const sorted = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const comparison = compare(left[leftIndex], right[rightIndex]);
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
