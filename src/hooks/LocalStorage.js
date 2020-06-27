import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    let parsedValue = JSON.parse(localStorage.getItem(key));
    setValue(parsedValue || defaultValue);
  }, [key, defaultValue]);

  const updateValue = data => {
    localStorage.setItem(key, JSON.stringify(data));
    return setValue(data);
  };

  return [value, updateValue];
};

export default useLocalStorage;
