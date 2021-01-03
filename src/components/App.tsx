import React, { useState } from "react";
import { useAlgorithm } from "../hooks/useAlgorithm";
import { useVisualizer } from "../hooks/useVisualizer";
import "./App.css";
import Bars from "./Bars";
import ColorInfo from "./ColorInfo";
import ControlTab from "./ControlTab";
import Header from "./Header";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { algorithmDisplayName, getAlgorithm, setAlgorithm } = useAlgorithm();
  const [arrayLength, setArrayLength] = useState(10);
  const { isRunning, bars, generateBars, togglePlay, reset } = useVisualizer(
    getAlgorithm(),
    arrayLength
  );

  return (
    <div className="app-container">
      <Header
        currentAlgorithmName={algorithmDisplayName}
        setAlgorithm={setAlgorithm}
      />
      <Bars bars={bars} />
      <ControlTab
        isRunning={isRunning}
        arrayLength={arrayLength}
        setArrayLength={setArrayLength}
        onClickGenerateNew={generateBars}
        onClickPlay={togglePlay}
        onClickReset={reset}
      />
      <ColorInfo />
    </div>
  );
};

export default App;
