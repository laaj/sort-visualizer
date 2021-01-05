import MergeSort from "./algorithms/MergeSort";
import SelectionSort from "./algorithms/SelectionSort";

export enum AlgorithmAction {
  Swap,
  Compare,
  SetSorted,
  Finish,
  SwapAndSetSorted,
  MergeEnter,
  MergeCompare,
  MergeSetSorted,
  MergeExit,
}

export interface StepSwap {
  action: AlgorithmAction.Swap;
  operands: {
    left: number;
    right: number;
  };
}

export interface StepCompare {
  action: AlgorithmAction.Compare;
  operands: {
    left: number;
    right: number;
  };
}

export interface StepSetSorted {
  action: AlgorithmAction.SetSorted;
  operand: number;
}

export interface StepFinish {
  action: AlgorithmAction.Finish;
}

export interface StepSwapAndSetSorted {
  action: AlgorithmAction.SwapAndSetSorted;
  operands: {
    left: {
      index: number;
      sorted: boolean;
    };
    right: {
      index: number;
      sorted: boolean;
    };
  };
}

export interface StepMergeCompare {
  action: AlgorithmAction.MergeCompare;
  operands: {
    left: number;
    right: number;
  };
}

export interface StepMergeEnter {
  action: AlgorithmAction.MergeEnter;
  start: number;
  end: number;
}

export interface StepMergeSetSorted {
  action: AlgorithmAction.MergeSetSorted;
  from: number;
  to: number;
  sorted: boolean;
}

export interface StepMergeExit {
  action: AlgorithmAction.MergeExit;
  start: number;
  end: number;
  swapMap: {
    [id: number]: number;
  };
}

export type AlgorithmStep =
  | StepSwap
  | StepCompare
  | StepSetSorted
  | StepFinish
  | StepSwapAndSetSorted
  | StepMergeCompare
  | StepMergeEnter
  | StepMergeSetSorted
  | StepMergeExit;

export enum StateColor {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
}

export interface UIBar {
  value: number;
  backgroundColor: StateColor;
  id: number;
}

export interface BarState {
  backgroundColor: string;
  order: string;
  opacity: string;
}

export enum SortingAlgorithmDisplayName {
  Selection = "Selection Sort",
  Merge = "Merge Sort",
}

export type SortingAlgorithmClass = typeof SelectionSort | typeof MergeSort;
