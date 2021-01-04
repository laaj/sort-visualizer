import React from "react";

interface BarProps {
  style: React.CSSProperties;
}

const Bar = React.forwardRef<HTMLDivElement, BarProps>(({ style }, ref) => {
  return <div style={style} ref={ref}></div>;
});

export default Bar;
