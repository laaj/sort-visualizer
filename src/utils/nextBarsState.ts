import { AlgorithmAction, AlgorithmStep, StateColor, UIBar } from "../types";
import assertNever from "./assertNever";

export const nextBarsState = (
  prevBars: UIBar[],
  step: AlgorithmStep
): UIBar[] => {
  const newBars = prevBars.map((bar) => ({
    ...bar,
    backgroundColor:
      bar.backgroundColor === StateColor.Green
        ? StateColor.Green
        : StateColor.Red,
  }));

  switch (step.action) {
    case AlgorithmAction.Compare: {
      return newBars.map((bar, i) => ({
        value: bar.value,
        backgroundColor:
          i === step.operands.left || i === step.operands.right
            ? StateColor.Yellow
            : bar.backgroundColor === StateColor.Green
            ? StateColor.Green
            : StateColor.Red,
      }));
    }
    case AlgorithmAction.Swap: {
      const left = newBars[step.operands.left];
      const right = newBars[step.operands.right];
      return newBars.map((bar, i) =>
        i === step.operands.left
          ? right
          : i === step.operands.right
          ? left
          : bar
      );
    }
    case AlgorithmAction.SetSorted: {
      return newBars.map((bar, i) =>
        i === step.operand
          ? {
              value: bar.value,
              backgroundColor: StateColor.Green,
            }
          : bar
      );
    }
    case AlgorithmAction.SwapAndSetSorted: {
      const left = newBars[step.operands.left.index];
      const right = newBars[step.operands.right.index];
      return newBars.map((bar, i) =>
        i === step.operands.left.index
          ? {
              ...right,
              backgroundColor: step.operands.left.sorted
                ? StateColor.Green
                : StateColor.Red,
            }
          : i === step.operands.right.index
          ? {
              ...left,
              backgroundColor: step.operands.right.sorted
                ? StateColor.Green
                : StateColor.Red,
            }
          : bar
      );
    }
    case AlgorithmAction.Finish: {
      return newBars;
    }
    default:
      assertNever(step);
  }

  return newBars;
};
