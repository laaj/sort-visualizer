import { AlgorithmStep, StateColor, UIBar } from "../types";
import { getUniqueId } from "../utils/idHelper";
import { randomArray } from "../utils/randomArray";

export const MIN_VALUE = 1;

abstract class SortingAlgorithm {
  static algorithmName: string;
  protected numberArray: number[] = [];

  public getInitialState(): UIBar[] {
    return this.numberArray.map((x) => ({
      value: x,
      backgroundColor: StateColor.Red,
      id: getUniqueId(),
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
