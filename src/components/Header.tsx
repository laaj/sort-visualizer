import React, { useState } from "react";
import algorithms from "../algorithms";
import { SortingAlgorithmName } from "../types";
import "./Header.css";

interface HeaderProps {
  currentAlgorithmName: string;
  setAlgorithm: (name: SortingAlgorithmName) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentAlgorithmName,
  setAlgorithm,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="header">
      <h1>Sorting Algorithm Visualizer</h1>
      <div className="algorithm-menu">
        <h2>Algorithm:</h2>
        <div
          className="dropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="dropdown-selected">
            {currentAlgorithmName}
            <div className="dropdown-caret-container">
              <div className={`dropdown-caret ${showDropdown ? "open" : ""}`}>
                ▼
              </div>
            </div>
          </div>
          <ul className={`dropdown-menu ${showDropdown ? "open" : ""}`}>
            {Object.keys(algorithms).map((a) => (
              <li
                key={algorithms[a as SortingAlgorithmName].algorithmName}
                onClick={() => {
                  setAlgorithm(a as SortingAlgorithmName);
                  setShowDropdown(false);
                }}
              >
                {algorithms[a as SortingAlgorithmName].algorithmName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
