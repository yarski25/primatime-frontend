import { useEffect, useState } from "react";

export const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};
