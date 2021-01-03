import { useCallback, useEffect, useState } from "react";
import SortingAlgorithm from "../algorithms/SortingAlgorithm";
import { AlgorithmAction, AlgorithmStep, UIBar } from "../types";
import { nextBarsState } from "../utils/nextBarsState";
import { useInterval } from "./useInterval";

export const useVisualizer = (
  algorithm: SortingAlgorithm,
  arrayLength: number
) => {
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState<AlgorithmStep[] | null>(null);
  const [bars, setBars] = useState<UIBar[]>([]);
  const delay =
    steps !== null ? Math.max(10, Math.min(300, 20000 / steps.length)) : null;

  const intervalId = useInterval(
    () => {
      if (steps && steps[stepIndex].action !== AlgorithmAction.Finish) {
        setBars(nextBarsState(bars, steps[stepIndex]));
        setStepIndex(stepIndex + 1);
      } else {
        setIsRunning(false);
      }
    },
    isRunning ? delay : null
  );

  const generateBars = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    setBars(algorithm.generateArray(arrayLength));
    setSteps(null);
    setStepIndex(0);
    setIsRunning(false);
  }, [arrayLength, algorithm, intervalId]);

  const reset = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    setBars(algorithm.getInitialState());
    setStepIndex(0);
    setIsRunning(false);
  };

  const togglePlay = () => {
    if (!steps) {
      setSteps(algorithm.sort());
    } else if (steps[stepIndex].action === AlgorithmAction.Finish) {
      reset();
      return;
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    generateBars();
  }, [generateBars]);

  return {
    isRunning,
    bars,
    generateBars,
    togglePlay,
    reset,
  };
};
