import { AlgorithmAction, AlgorithmStep } from "../types";
import SortingAlgorithm from "./SortingAlgorithm";

class MergeSort extends SortingAlgorithm {
  static algorithmName = "Merge Sort";

  public sort() {
    const arr = [...this.numberArray];
    const steps: AlgorithmStep[] = [];

    const mergeSort = (
      list: number[],
      start: number,
      end: number
    ): number[] => {
      if (list.length <= 1) {
        return list;
      }

      const middle = Math.ceil(list.length / 2);
      const leftSubArraySorted = mergeSort(
        list.slice(0, middle),
        start,
        middle
      );
      const rightSubArraySorted = mergeSort(list.slice(middle), middle, end);

      return merge(leftSubArraySorted, rightSubArraySorted, start, end);
    };

    const merge = (
      left: number[],
      right: number[],
      start: number,
      end: number
    ): number[] => {
      const result: number[] = [];
      const sorted = start === 0 && end === arr.length;
      const swapMap: { [id: number]: number } = {};

      steps.push({
        action: AlgorithmAction.MergeEnter,
        start,
        end,
      });

      let i = 0;
      let j = 0;
      while (i < left.length && j < right.length) {
        steps.push({
          action: AlgorithmAction.MergeCompare,
          operands: {
            left: start + i,
            right: start + left.length + j,
          },
        });
        if (left[i] <= right[j]) {
          steps.push({
            action: AlgorithmAction.MergeSetSorted,
            from: start + i,
            to: i + j,
            sorted,
          });
          swapMap[start + i] = i + j;
          result.push(left[i]);
          i++;
        } else {
          steps.push({
            action: AlgorithmAction.MergeSetSorted,
            from: start + left.length + j,
            to: i + j,
            sorted,
          });
          swapMap[start + left.length + j] = i + j;
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) {
        steps.push({
          action: AlgorithmAction.MergeSetSorted,
          from: start + i,
          to: i + j,
          sorted,
        });
        swapMap[start + i] = i + j;
        result.push(left[i]);
        i++;
      }
      while (j < right.length) {
        steps.push({
          action: AlgorithmAction.MergeSetSorted,
          from: start + left.length + j,
          to: i + j,
          sorted,
        });
        swapMap[start + left.length + j] = i + j;
        result.push(right[j]);
        j++;
      }

      steps.push({
        action: AlgorithmAction.MergeExit,
        start,
        end,
        swapMap,
      });

      return result;
    };

    mergeSort(arr, 0, arr.length);

    steps.push({
      action: AlgorithmAction.Finish,
    });

    return steps;
  }
}

export default MergeSort;
