import "./ControlTab.css";
import React from "react";
import { SortingAlgorithmName } from "../types";

interface ControlTabProps {
  arrayLength: number;
  setArrayLength: (length: number) => void;
  algorithmName: SortingAlgorithmName;
  setAlgorithm: (name: SortingAlgorithmName) => void;
  onClickReset: () => void;
  onClickPlay: () => void;
  onClickGenerateNew: () => void;
}

const ControlTab: React.FC<ControlTabProps> = ({
  arrayLength,
  setArrayLength,
  algorithmName,
  setAlgorithm,
  onClickGenerateNew,
  onClickPlay,
  onClickReset,
}) => {
  return (
    <div className="control-tab-container">
      <button onClick={onClickGenerateNew}>generate</button>
      <button onClick={onClickPlay}>play</button>
      <button onClick={onClickReset}>reset</button>
      <input
        type="range"
        min="10"
        max="50"
        value={arrayLength}
        onChange={(e) => setArrayLength(Number(e.target.value))}
      />
    </div>
  );
};

export default ControlTab;
