// Generate a range of integers [start, start+1, ... , end).
export const generateRange = (start: number, end: number) => {
  const arr = [];
  for (let i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
};

// Generate a random permutation of the range [start, start+1, ... , end).
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const randomArray = (start: number, end: number) => {
  const arr = generateRange(start, end);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
