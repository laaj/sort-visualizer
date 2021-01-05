import {
  AlgorithmAction,
  AlgorithmStep,
  SortingAlgorithmDisplayName,
} from "../types";
import SortingAlgorithm from "./SortingAlgorithm";

class QuickSort extends SortingAlgorithm {
  public name = SortingAlgorithmDisplayName.Quick;

  public sort() {
    const arr = [...this.numberArray];
    const steps: AlgorithmStep[] = [];

    const quicksort = (lo: number, hi: number) => {
      if (lo < hi) {
        const p = partition(lo, hi);
        quicksort(lo, p - 1);
        quicksort(p + 1, hi);
      } else if (lo === hi) {
        steps.push({
          action: AlgorithmAction.SetSorted,
          operand: lo,
        });
      }
    };

    const partition = (lo: number, hi: number) => {
      const pivot = arr[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        steps.push({
          action: AlgorithmAction.Compare,
          operands: {
            left: j,
            right: hi,
          },
        });
        if (arr[j] < pivot) {
          steps.push({
            action: AlgorithmAction.Swap,
            operands: {
              left: i,
              right: j,
            },
          });
          const tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
          i++;
        }
      }

      steps.push({
        action: AlgorithmAction.SwapAndSetSorted,
        operands: {
          left: {
            index: i,
            sorted: true,
          },
          right: {
            index: hi,
            sorted: false,
          },
        },
      });

      const tmp = arr[i];
      arr[i] = arr[hi];
      arr[hi] = tmp;

      return i;
    };

    quicksort(0, arr.length - 1);

    steps.push({
      action: AlgorithmAction.Finish,
    });

    return steps;
  }
}

export default QuickSort;
