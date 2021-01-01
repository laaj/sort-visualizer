import SelectionSort from "./algorithms/SelectionSort";

export enum AlgorithmAction {
  Swap,
  Compare,
  SetSorted,
  Finish,
  SwapAndSetSorted,
}

interface AlgorithmStepBase {
  action: AlgorithmAction;
  operands?: {
    left: number;
    right?: number;
  };
}

export interface StepSwap extends AlgorithmStepBase {
  action: AlgorithmAction.Swap;
}

export interface StepCompare extends AlgorithmStepBase {
  action: AlgorithmAction.Compare;
}

export interface StepSetSorted extends AlgorithmStepBase {
  action: AlgorithmAction.SetSorted;
}

export interface StepFinish extends AlgorithmStepBase {
  action: AlgorithmAction.Finish;
}

export interface StepSwapAndSetSorted extends AlgorithmStepBase {
  action: AlgorithmAction.SwapAndSetSorted;
  sortedOperands: {
    left: boolean;
    right: boolean;
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

export type SortingAlgorithm = typeof SelectionSort;

export interface UIBar {
  value: number;
  backgroundColor: StateColor;
}
