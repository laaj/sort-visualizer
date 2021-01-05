import React, { useState } from "react";
import algorithms from "../algorithms";
import SortingAlgorithm from "../algorithms/SortingAlgorithm";
import { useVisualizer } from "../hooks/useVisualizer";
import "./App.css";
import Bars from "./Bars";
import ColorInfo from "./ColorInfo";
import ControlTab from "./ControlTab";
import Header from "./Header";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>(
    () => new algorithms[0].algorithmClass()
  );
  const [arrayLength, setArrayLength] = useState(10);
  const {
    isRunning,
    mainBars,
    ambientBars,
    barsRef,
    generateBars,
    togglePlay,
    reset,
    stepForward,
    stepBackward,
  } = useVisualizer(algorithm, arrayLength);

  return (
    <div className="app-container">
      <Header
        currentAlgorithmName={algorithm.name}
        setAlgorithm={setAlgorithm}
      />
      <Bars mainBars={mainBars} ambientBars={ambientBars} ref={barsRef} />
      <ControlTab
        isRunning={isRunning}
        arrayLength={arrayLength}
        setArrayLength={setArrayLength}
        onClickGenerateNew={generateBars}
        onClickPlay={togglePlay}
        onClickReset={reset}
        onClickStepForward={stepForward}
        onClickStepBackward={stepBackward}
      />
      <ColorInfo />
    </div>
  );
};

export default App;
