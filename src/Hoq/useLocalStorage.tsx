import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getStorageValue<Type>(key: string, defaultValue: Type | (() => Type)): Type {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing localStorage value for key:", key, error);
      localStorage.removeItem(key);
    }
  }
  return defaultValue instanceof Function ? defaultValue() : defaultValue;
}

function useLocalStorage<Type>(
  key: string,
  defaultValue: Type | (() => Type)
): [Type, Dispatch<SetStateAction<Type>>] {
  const [value, setValue] = useState<Type>(() => {
    return getStorageValue<Type>(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
