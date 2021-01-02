import { AlgorithmStep, StateColor, UIBar } from "../types";
import { randomArray } from "../utils/randomArray";

export const MIN_VALUE = 1;

abstract class SortingAlgorithm {
  protected numberArray: number[] = [];

  public getInitialState(): UIBar[] {
    return this.numberArray.map((x) => ({
      value: x,
      backgroundColor: StateColor.Red,
    }));
  }

  public generateArray(arrLen: number): UIBar[] {
    const arr = randomArray(MIN_VALUE, MIN_VALUE + arrLen);
    this.numberArray = arr;
    return this.getInitialState();
  }

  public abstract sort(): AlgorithmStep[];
}

export default SortingAlgorithm;
