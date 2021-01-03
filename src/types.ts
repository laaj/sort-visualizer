import MergeSort from "./algorithms/MergeSort";
import SelectionSort from "./algorithms/SelectionSort";

export enum AlgorithmAction {
  Swap,
  Compare,
  SetSorted,
  Finish,
  SwapAndSetSorted,
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

export type AlgorithmStep =
  | StepSwap
  | StepCompare
  | StepSetSorted
  | StepFinish
  | StepSwapAndSetSorted;

export enum StateColor {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
}

export interface UIBar {
  value: number;
  backgroundColor: StateColor;
}

export enum SortingAlgorithmName {
  Selection = "selection",
  Merge = "merge",
}

export type SortingAlgorithmClass = typeof SelectionSort | typeof MergeSort;
