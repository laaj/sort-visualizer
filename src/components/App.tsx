import React, { useState } from "react";
import { useAlgorithm } from "../hooks/useAlgorithm";
import { useVisualizer } from "../hooks/useVisualizer";
import "./App.css";
import Bars from "./Bars";
import ControlTab from "./ControlTab";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { algorithmName, getAlgorithm, setAlgorithm } = useAlgorithm();
  const [arrayLength, setArrayLength] = useState(10);
  const { bars, generateBars, togglePlay, reset } = useVisualizer(
    getAlgorithm(),
    arrayLength
  );

  return (
    <div className="app-container">
      <header>
        <h1>Sorting Algorithm Visualizer</h1>
      </header>
      <Bars bars={bars} />
      <ControlTab
        arrayLength={arrayLength}
        setArrayLength={setArrayLength}
        algorithmName={algorithmName}
        setAlgorithm={setAlgorithm}
        onClickGenerateNew={generateBars}
        onClickPlay={togglePlay}
        onClickReset={reset}
      />
    </div>
  );
};

export default App;
