import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import algorithms from "../algorithms";
import SortingAlgorithm from "../algorithms/SortingAlgorithm";
import { UIBar } from "../types";
import Bars from "./Bars";
import useInterval from "./hooks/useInterval";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [algorithmName, setAlgorithmName] = useState("selection");
  const [arrayLength, setArrayLength] = useState(10);
  const [bars, setBars] = useState<UIBar[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const algorithm = useRef<SortingAlgorithm | null>(null);

  const getAlgorithm = useCallback(() => {
    if (algorithm.current === null) {
      algorithm.current = new algorithms[algorithmName]();
    }
    return algorithm.current;
  }, [algorithmName]);

  const generateBars = useCallback(() => {
    setBars(getAlgorithm().generateArray(arrayLength));
  }, [arrayLength, getAlgorithm]);

  useEffect(() => {
    generateBars();
  }, [generateBars]);

  return (
    <div className="app-container">
      <header>
        <h1>Sorting Algorithm Visualizer</h1>
      </header>
      <Bars bars={bars} />
      <button onClick={() => setIsRunning(!isRunning)}>start</button>
    </div>
  );
};

export default App;
