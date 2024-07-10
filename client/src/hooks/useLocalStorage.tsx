/**
 * a temporary solution
 * implement Redux Persist instead
 */
import {useState} from 'react';

export const useLocalStorage = (key: string, loginStatus: boolean) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);

      if (value) {
        return value === 'true';
      } else {
        window.localStorage.setItem(key, JSON.stringify(loginStatus));
        return loginStatus;
      }
    } catch (error) {
      return error;
    }
  });

  const setValue = (newValue: boolean) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }

    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
