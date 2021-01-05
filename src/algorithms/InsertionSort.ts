import {
  AlgorithmAction,
  AlgorithmStep,
  SortingAlgorithmDisplayName,
} from "../types";
import SortingAlgorithm from "./SortingAlgorithm";

class InsertionSort extends SortingAlgorithm {
  public name = SortingAlgorithmDisplayName.Insertion;

  public sort() {
    const arr = [...this.numberArray];
    const steps: AlgorithmStep[] = [];

    const compare = (a: number, b: number) => {
      steps.push({
        action: AlgorithmAction.Compare,
        operands: {
          left: a,
          right: b,
        },
      });
      return arr[a] > arr[b];
    };

    let i = 1;
    while (i < arr.length) {
      let j = i;
      while (j > 0 && compare(j - 1, j)) {
        steps.push({
          action: AlgorithmAction.Swap,
          operands: {
            left: j - 1,
            right: j,
          },
        });
        const tmp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = tmp;
        j--;
      }
      i++;
    }

    for (let i = 0; i < arr.length; i++) {
      steps.push({
        action: AlgorithmAction.SetSorted,
        operand: i,
      });
    }

    steps.push({
      action: AlgorithmAction.Finish,
    });

    return steps;
  }
}

export default InsertionSort;
