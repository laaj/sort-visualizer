import "./ColorInfo.css";
import React from "react";

interface ColorInfoProps {}

const ColorInfo: React.FC<ColorInfoProps> = () => {
  return (
    <div className="color-info">
      <div>
        <div className="box red"></div> = Not sorted
      </div>
      <div>
        <div className="box yellow"></div> = Comparison
      </div>
      <div>
        <div className="box green"></div> = Sorted
      </div>
    </div>
  );
};

export default ColorInfo;
