import { useCallback, useEffect, useRef, useState } from "react";
import SortingAlgorithm from "../algorithms/SortingAlgorithm";
import { AlgorithmAction, AlgorithmStep, UIBar } from "../types";
import { evaluateStep } from "../utils/evaluateStep";

export const useVisualizer = (
  algorithm: SortingAlgorithm,
  arrayLength: number
) => {
  const [isRunning, setIsRunning] = useState(false);
  const [mainBars, setMainBars] = useState<UIBar[]>([]);
  const [ambientBars, setAmbientBars] = useState<UIBar[]>([]);

  const stepsRef = useRef<AlgorithmStep[]>([]);
  const stepIndexRef = useRef<number>(0);
  const barsRef = useRef<any>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const startVisualization = () => {
    // const delay =
    //   stepsRef.current.length > 0
    //     ? Math.max(10, Math.min(300, 20000 / stepsRef.current.length))
    //     : null;
    // if (delay) {
    //   for (let i = stepIndexRef.current; i < stepsRef.current.length; i++) {
    //     timeoutsRef.current.push(
    //       setTimeout(() => {
    //         evaluateStep(
    //           barsRef.current.mainBars,
    //           barsRef.current.ambientBars,
    //           stepsRef.current[stepIndexRef.current]
    //         );
    //         if (
    //           stepsRef.current[stepIndexRef.current].action ===
    //           AlgorithmAction.Finish
    //         ) {
    //           setIsRunning(false);
    //         }
    //         stepIndexRef.current += 1;
    //       }, (i - stepIndexRef.current + 1) * delay)
    //     );
    //   }
    // }
    setTimeout(() => {
      evaluateStep(
        barsRef.current.mainBars,
        barsRef.current.ambientBars,
        stepsRef.current[stepIndexRef.current]
      );
      setIsRunning(false);
      stepIndexRef.current += 1;
    }, 100);
  };

  const clearVisualization = () => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
  };

  const reset = () => {
    clearVisualization();
    stepIndexRef.current = 0;
    setIsRunning(false);
    const initialBars = algorithm.getInitialState();
    setMainBars(initialBars);
    setAmbientBars(initialBars);
  };

  const togglePlay = () => {
    if (isRunning) {
      clearVisualization();
      setIsRunning(false);
    } else {
      if (
        stepsRef.current.length > 0 &&
        stepIndexRef.current >= stepsRef.current.length
      ) {
        reset();
      } else {
        if (stepsRef.current.length === 0) {
          stepsRef.current = algorithm.sort();
        }
        startVisualization();
        setIsRunning(true);
      }
    }
  };

  const generateBars = useCallback(() => {
    clearVisualization();
    stepIndexRef.current = 0;
    setIsRunning(false);
    stepsRef.current = [];
    const initialBars = algorithm.generateArray(arrayLength);
    setMainBars(initialBars);
    setAmbientBars(initialBars);
  }, [arrayLength, algorithm]);

  useEffect(() => {
    generateBars();
  }, [generateBars]);

  return {
    isRunning,
    mainBars,
    ambientBars,
    barsRef,
    generateBars,
    togglePlay,
    reset,
  };
};
