import { useCallback, useEffect, useRef, useState } from "react";
import SortingAlgorithm from "../algorithms/SortingAlgorithm";
import { AlgorithmAction, AlgorithmStep, BarState, UIBar } from "../types";
import { evaluateNextStep, evaluatePrevStep } from "../utils/evaluateStep";

export const useVisualizer = (
  algorithm: SortingAlgorithm,
  arrayLength: number
) => {
  const [isRunning, setIsRunning] = useState(false);
  const [mainBars, setMainBars] = useState<UIBar[]>([]);
  const [ambientBars, setAmbientBars] = useState<UIBar[]>([]);

  const steps = useRef<AlgorithmStep[]>([]);
  const stepIndex = useRef<number>(0);
  const barsRef = useRef<any>(null);
  const timeOuts = useRef<NodeJS.Timeout[]>([]);
  const prevMainBars = useRef<Array<BarState[]>>([]);
  const prevAmbientBars = useRef<Array<BarState[]>>([]);

  const startVisualization = () => {
    const delay =
      steps.current.length > 0
        ? Math.max(10, Math.min(300, 20000 / steps.current.length))
        : null;
    if (delay) {
      for (let i = stepIndex.current; i < steps.current.length; i++) {
        timeOuts.current.push(
          setTimeout(() => {
            evaluateNextStep(
              barsRef.current.mainBars,
              barsRef.current.ambientBars,
              steps.current[stepIndex.current],
              prevMainBars,
              prevAmbientBars,
              stepIndex.current === prevMainBars.current.length
            );
            if (
              steps.current[stepIndex.current].action === AlgorithmAction.Finish
            ) {
              setIsRunning(false);
            }
            stepIndex.current += 1;
          }, (i - stepIndex.current + 1) * delay)
        );
      }
    }
  };

  const clearVisualization = () => {
    timeOuts.current.forEach((timeout) => clearTimeout(timeout));
  };

  const reset = () => {
    clearVisualization();
    stepIndex.current = 0;
    setIsRunning(false);
    const initialBars = algorithm.getInitialState();
    setMainBars(initialBars);
    setAmbientBars(initialBars);
  };

  const stepForward = () => {
    if (steps.current.length === 0) {
      steps.current = algorithm.sort();
    }
    if (stepIndex.current < steps.current.length) {
      clearVisualization();
      setIsRunning(false);
      evaluateNextStep(
        barsRef.current.mainBars,
        barsRef.current.ambientBars,
        steps.current[stepIndex.current],
        prevMainBars,
        prevAmbientBars,
        stepIndex.current === prevMainBars.current.length
      );
      stepIndex.current += 1;
    }
  };

  const stepBackward = () => {
    if (stepIndex.current > 0) {
      clearVisualization();
      setIsRunning(false);
      evaluatePrevStep(
        barsRef.current.mainBars,
        barsRef.current.ambientBars,
        prevMainBars.current[stepIndex.current - 1],
        prevAmbientBars.current[stepIndex.current - 1]
      );
      stepIndex.current -= 1;
    }
  };

  const togglePlay = () => {
    if (isRunning) {
      clearVisualization();
      setIsRunning(false);
    } else {
      if (
        steps.current.length > 0 &&
        stepIndex.current >= steps.current.length
      ) {
        reset();
      } else {
        if (steps.current.length === 0) {
          steps.current = algorithm.sort();
        }
        startVisualization();
        setIsRunning(true);
      }
    }
  };

  const generateBars = useCallback(() => {
    clearVisualization();
    stepIndex.current = 0;
    setIsRunning(false);
    steps.current = [];
    prevMainBars.current = [];
    prevAmbientBars.current = [];
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
    stepForward,
    stepBackward,
  };
};
