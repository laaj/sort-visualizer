import React from "react";
import { MIN_VALUE } from "../algorithms/SortingAlgorithm";
import { UIBar } from "../types";
import Bar from "./Bar";
import "./Bars.css";

const HEIGHT = 500;

interface BarsProps {
  bars: UIBar[];
}

const Bars: React.FC<BarsProps> = ({ bars }) => {
  const maxValue = MIN_VALUE + bars.length - 1;
  const heightCoefficient = (HEIGHT - 26) / maxValue;

  return (
    <div
      className="bars-container"
      style={{
        height: HEIGHT,
      }}
    >
      {bars.map((bar) => (
        <Bar
          key={bar.value}
          style={{
            backgroundColor: bar.backgroundColor,
            height: bar.value * heightCoefficient,
            flex: 1,
            marginLeft: -0.25 * bars.length + 12.5,
            marginRight: -0.25 * bars.length + 12.5,
          }}
        />
      ))}
    </div>
  );
};

export default Bars;