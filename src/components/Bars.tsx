import React, { useEffect, useImperativeHandle, useRef } from "react";
import { MIN_VALUE } from "../algorithms/SortingAlgorithm";
import { UIBar } from "../types";
import Bar from "./Bar";
import "./Bars.css";

const HEIGHT = 500;

interface BarsProps {
  mainBars: UIBar[];
  ambientBars: UIBar[];
}

const Bars = React.forwardRef<any, BarsProps>(
  ({ mainBars, ambientBars }, ref) => {
    const maxValue = MIN_VALUE + mainBars.length - 1;
    const heightCoefficient = (HEIGHT - 26) / maxValue;
    const margin = Math.max(-0.25 * mainBars.length + 12.5, 0.5);

    const mainBarsRef = useRef<Array<HTMLDivElement | null>>([]);
    const ambientBarsRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
      mainBarsRef.current = mainBarsRef.current.splice(0, mainBars.length);
      ambientBarsRef.current = ambientBarsRef.current.splice(
        0,
        ambientBars.length
      );
    }, [mainBars, ambientBars]);

    useImperativeHandle(ref, () => ({
      get mainBars() {
        return mainBarsRef.current;
      },
      get ambientBars() {
        return ambientBarsRef.current;
      },
    }));

    return (
      <div
        className="bars-container"
        style={{
          height: HEIGHT,
        }}
      >
        <div className="main-bars">
          {mainBars.map((bar, i) => (
            <Bar
              key={bar.id}
              style={{
                backgroundColor: bar.backgroundColor,
                height: bar.value * heightCoefficient,
                flex: 1,
                marginLeft: margin,
                marginRight: margin,
                zIndex: 1,
                order: i,
              }}
              ref={(el) => (mainBarsRef.current[i] = el)}
            />
          ))}
        </div>
        <div className="ambient-bars">
          {ambientBars.map((bar, i) => (
            <Bar
              key={bar.id}
              style={{
                backgroundColor: bar.backgroundColor,
                height: bar.value * heightCoefficient,
                flex: 1,
                marginLeft: margin,
                marginRight: margin,
                opacity: 0,
                order: i,
              }}
              ref={(el) => (ambientBarsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default React.memo(Bars);
