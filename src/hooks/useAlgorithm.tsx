import { useCallback, useRef, useState } from "react";
import algorithms from "../algorithms";
import SortingAlgorithm from "../algorithms/SortingAlgorithm";
import { SortingAlgorithmName } from "../types";

export const useAlgorithm = () => {
  const [algorithmName, setAlgorithmName] = useState<SortingAlgorithmName>(
    SortingAlgorithmName.Selection
  );
  const algorithm = useRef<SortingAlgorithm | null>(null);
  const algorithmDisplayName = algorithms[algorithmName].algorithmName;

  const getAlgorithm = useCallback(() => {
    if (algorithm.current === null) {
      algorithm.current = new algorithms[algorithmName]();
    }
    return algorithm.current;
  }, [algorithmName]);

  const setAlgorithm = (name: SortingAlgorithmName) => {
    setAlgorithmName(name);
    algorithm.current = new algorithms[name]();
  };

  return { algorithmDisplayName, getAlgorithm, setAlgorithm };
};
