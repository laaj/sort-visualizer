import { AlgorithmAction, AlgorithmStep, StateColor } from "../types";
import assertNever from "./assertNever";

export const evaluateStep = (
  mainBars: HTMLDivElement[],
  ambientBars: HTMLDivElement[],
  step: AlgorithmStep
): void => {
  switch (step.action) {
    case AlgorithmAction.Compare: {
      mainBars.forEach((bar) => {
        const index = parseInt(bar.style.order);
        bar.style.backgroundColor =
          index === step.operands.left || index === step.operands.right
            ? StateColor.Yellow
            : bar.style.backgroundColor === StateColor.Green
            ? StateColor.Green
            : StateColor.Red;
      });
      break;
    }
    case AlgorithmAction.Swap: {
      mainBars.forEach((bar) => {
        bar.style.backgroundColor =
          bar.style.backgroundColor === StateColor.Green
            ? StateColor.Green
            : StateColor.Red;
        const index = parseInt(bar.style.order);
        if (index === step.operands.left) {
          bar.style.order = step.operands.right.toString();
        } else if (index === step.operands.right) {
          bar.style.order = step.operands.left.toString();
        }
      });
      break;
    }
    case AlgorithmAction.SetSorted: {
      mainBars.forEach((bar) => {
        bar.style.backgroundColor =
          bar.style.backgroundColor === StateColor.Green
            ? StateColor.Green
            : StateColor.Red;
        const index = parseInt(bar.style.order);
        if (index === step.operand) {
          bar.style.backgroundColor = StateColor.Green;
        }
      });
      break;
    }
    case AlgorithmAction.SwapAndSetSorted: {
      mainBars.forEach((bar) => {
        bar.style.backgroundColor =
          bar.style.backgroundColor === StateColor.Green
            ? StateColor.Green
            : StateColor.Red;
        const index = parseInt(bar.style.order);
        if (index === step.operands.right.index) {
          bar.style.order = step.operands.left.index.toString();
          if (step.operands.left.sorted) {
            bar.style.backgroundColor = StateColor.Green;
          }
        } else if (index === step.operands.left.index) {
          bar.style.order = step.operands.right.index.toString();
          if (step.operands.right.sorted) {
            bar.style.backgroundColor = StateColor.Green;
          }
        }
      });
      break;
    }
    case AlgorithmAction.Finish: {
      break;
    }
    case AlgorithmAction.MergeEnter: {
      mainBars.forEach((bar) => {
        const index = parseInt(bar.style.order);
        if (index >= step.start && index < step.end) {
          bar.style.opacity = "0";
        }
      });
      ambientBars.forEach((bar) => {
        const index = parseInt(bar.style.order);
        bar.style.backgroundColor = StateColor.Red;
        bar.style.opacity =
          index >= step.start && index < step.end ? "0.2" : "0";
      });
      break;
    }
    case AlgorithmAction.MergeCompare: {
      ambientBars.forEach((bar) => {
        const index = parseInt(bar.style.order);
        bar.style.backgroundColor =
          index === step.operands.left || index === step.operands.right
            ? StateColor.Yellow
            : StateColor.Red;
      });
      break;
    }
    case AlgorithmAction.MergeSetSorted: {
      let targetHeight: string;
      ambientBars.forEach((bar) => {
        bar.style.backgroundColor = StateColor.Red;
        const index = parseInt(bar.style.order);
        if (index === step.from) {
          targetHeight = bar.style.height;
        }
      });
      mainBars.forEach((bar) => {
        if (bar.style.height === targetHeight) {
          bar.style.order = step.to.toString();
          bar.style.opacity = "1";
          bar.style.backgroundColor = step.sorted
            ? StateColor.Green
            : StateColor.Red;
        }
        const index = parseInt(bar.style.order);
        if (index === step.to) {
          bar.style.order = step.from.toString();
        }
      });
      break;
    }
    case AlgorithmAction.MergeExit: {
      ambientBars.forEach((bar) => {
        const index = parseInt(bar.style.order);
        if (index >= step.start && index < step.end) {
          bar.style.order = step.swapMap[index].toString();
        }
      });
      break;
    }
    default:
      assertNever(step);
  }
};
