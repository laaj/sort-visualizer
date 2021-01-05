import { SortingAlgorithmClass, SortingAlgorithmDisplayName } from "../types";
import MergeSort from "./MergeSort";
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
];

export default algorithms;
