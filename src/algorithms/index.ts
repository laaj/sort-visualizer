import { SortingAlgorithmClass, SortingAlgorithmDisplayName } from "../types";
import InsertionSort from "./InsertionSort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import SelectionSort from "./SelectionSort";

const algorithms: {
  displayName: SortingAlgorithmDisplayName;
  algorithmClass: SortingAlgorithmClass;
}[] = [
  {
    displayName: SortingAlgorithmDisplayName.Selection,
    algorithmClass: SelectionSort,
  },
  {
    displayName: SortingAlgorithmDisplayName.Merge,
    algorithmClass: MergeSort,
  },
  {
    displayName: SortingAlgorithmDisplayName.Insertion,
    algorithmClass: InsertionSort,
  },
  {
    displayName: SortingAlgorithmDisplayName.Quick,
    algorithmClass: QuickSort,
  },
];

export default algorithms;
