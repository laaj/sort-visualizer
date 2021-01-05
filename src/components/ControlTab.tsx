// import { Button, Slider } from "@material-ui/core";
import React from "react";
import "./ControlTab.css";
const Button = require("@material-ui/core/Button").default;
const Slider = require("@material-ui/core/Slider").default;
const IconButton = require("@material-ui/core/IconButton").default;
const PlayCircleFilledIcon = require("@material-ui/icons/PlayCircleFilled")
  .default;
const PauseCircleFilledIcon = require("@material-ui/icons/PauseCircleFilled")
  .default;
const SkipNextIcon = require("@material-ui/icons/SkipNext").default;
const SkipPreviousIcon = require("@material-ui/icons/SkipPrevious").default;

interface ControlTabProps {
  isRunning: boolean;
  arrayLength: number;
  setArrayLength: (length: number) => void;
  onClickReset: () => void;
  onClickPlay: () => void;
  onClickGenerateNew: () => void;
  onClickStepForward: () => void;
  onClickStepBackward: () => void;
}

const ControlTab: React.FC<ControlTabProps> = ({
  isRunning,
  arrayLength,
  setArrayLength,
  onClickGenerateNew,
  onClickPlay,
  onClickReset,
  onClickStepForward,
  onClickStepBackward,
}) => {
  return (
    <div className="control-tab-container">
      <div className="play-buttons">
        <IconButton onClick={onClickStepBackward}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton className="play-button" onClick={onClickPlay}>
          {isRunning ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
        </IconButton>
        <IconButton onClick={onClickStepForward}>
          <SkipNextIcon />
        </IconButton>
      </div>
      <div className="settings">
        <Button
          variant="contained"
          color="primary"
          onClick={onClickGenerateNew}
        >
          Generate New
        </Button>
        <Button variant="contained" onClick={onClickReset}>
          Reset
        </Button>
        <div className="slider">
          <p>Adjust the number of bars</p>
          <Slider
            value={arrayLength}
            onChange={(_: any, newValue: any) =>
              setArrayLength(newValue as number)
            }
            step={1}
            min={10}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlTab;
