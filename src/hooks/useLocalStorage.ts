'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    let timeout: number | undefined;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        timeout = window.setTimeout(() => {
          setStoredValue(JSON.parse(item) as T);
        }, 0);
      }
    } catch {
      // ignore
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  return [storedValue, setValue];
}
