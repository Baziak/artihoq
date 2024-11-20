import { useState, useEffect } from "react";

function getStorageValue<Type>(key: string, defaultValue: Type) : Type {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial: Type = saved ? JSON.parse(saved) : defaultValue;
  return initial || defaultValue;
}

function useLocalStorage<Type>(key: string, defaultValue: Type) : [Type, Function] {
  const [value, setValue] = useState(() => {
    return getStorageValue<Type>(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;