import SelectionSort from "./SelectionSort";

type SortingAlgorithmClass = typeof SelectionSort;

const algorithms: Record<string, SortingAlgorithmClass> = {
  selection: SelectionSort,
};

export default algorithms;
