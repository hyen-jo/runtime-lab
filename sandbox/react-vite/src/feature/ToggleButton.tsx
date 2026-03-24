import { useState } from "react";

interface ToggleButtonProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

const ToggleButton = ({
  value,
  defaultValue = false,
  onChange,
  disabled = false,
}: ToggleButtonProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || false);
  const currentValue = isControlled ? value : internalValue;

  const handleClick = () => {
    if (disabled) return;
    const newValue = !currentValue;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const isOn = currentValue ? "ON" : "OFF";

  return (
    <button
      onClick={handleClick}
      className={isOn ? "on" : "off"}
      disabled={disabled}
    >
      {currentValue ? "ON" : "OFF"}
    </button>
  );
};

export default ToggleButton;
