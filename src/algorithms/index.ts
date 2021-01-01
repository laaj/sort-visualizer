import { SortingAlgorithm } from "../types";
import SelectionSort from "./SelectionSort";

const algorithms: Record<string, SortingAlgorithm> = {
  selection: SelectionSort,
};

export default algorithms;
