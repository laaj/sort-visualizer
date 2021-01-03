import { SortingAlgorithmClass, SortingAlgorithmName } from "../types";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";

const algorithms: Record<SortingAlgorithmName, SortingAlgorithmClass> = {
  selection: SelectionSort,
  merge: MergeSort,
};

export default algorithms;
