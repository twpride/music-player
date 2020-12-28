
import { useState } from "react"
export const useTextField = (name, initValue='', readOnly=false) => {
  const [value, setValue] = useState(initValue);
  const onChange = event => {
    if (readOnly) return;
    setValue(event.target.value);
  };
  return { name, value, onChange };
}

export const useLegacyState = initialState => {
  const [state, setState] = useReducer(
    (state, update) => ({ ...state, ...update }),
    initialState
  );
  return [state, setState];
}


const update = field => e => setState({
  [field]: e.currentTarget.value
});