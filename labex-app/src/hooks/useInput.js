import { useState } from "react";

const useInput = initialState => {
  const [inputValue, updateValue] = useState(initialState);

  const handleUpdateValue = event => {
    const { value } = event.target;

    updateValue(value);
  };

  return [inputValue, handleUpdateValue];
};

export default useInput;
