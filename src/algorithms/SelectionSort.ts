import { AlgorithmAction, AlgorithmStep } from "../types";
import SortingAlgorithmAbstract from "./SortingAlgorithm";

class SelectionSort extends SortingAlgorithmAbstract {
  public sort() {
    const arr = [...this.numberArray];
    const steps: AlgorithmStep[] = [];

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        // Compare.
        steps.push({
          action: AlgorithmAction.Compare,
          operands: {
            left: minIndex,
            right: j,
          },
        });
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // Swap and set sorted.
      steps.push({
        action: AlgorithmAction.SwapAndSetSorted,
        operands: {
          left: {
            index: i,
            sorted: true,
          },
          right: {
            index: minIndex,
            sorted: false,
          },
        },
      });

      const tmp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = tmp;
    }

    // Set the last element sorted.
    steps.push({
      action: AlgorithmAction.SetSorted,
      operand: n - 1,
    });
    steps.push({
      action: AlgorithmAction.Finish,
    });

    return steps;
  }
}

export default SelectionSort;
