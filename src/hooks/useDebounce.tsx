import { useEffect, useState } from 'react';

const useDebounce = (value: string): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
