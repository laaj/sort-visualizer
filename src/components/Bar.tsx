import React from "react";

interface BarProps {
  style: React.CSSProperties;
}

const Bar: React.FC<BarProps> = ({ style }) => {
  return <div style={style}></div>;
};

export default Bar;
