
import { useState } from "react"
export const useTextField = ([name, initValue]) => {
  const [value, setValue] = useState(initValue);
  const onChange = event => {
    setValue(event.target.value);
  };
  return { name, value, onChange };
}