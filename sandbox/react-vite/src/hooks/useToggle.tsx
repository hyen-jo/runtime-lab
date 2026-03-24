import { useState } from "react";

const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  const set = (nextValue: boolean) => {
    setValue(nextValue);
  };

  return [value, toggle, set] as const;
};

export default useToggle;
