import { useRef, useEffect } from "react";

// https://usehooks-typescript.com/react-hook/use-interval
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void | null>();
  const intervalId = useRef<NodeJS.Timeout | null>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== "undefined") {
        savedCallback?.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      intervalId.current = id;

      return () => clearInterval(id);
    }
  }, [delay]);

  return intervalId;
};
