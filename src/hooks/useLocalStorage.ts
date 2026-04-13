import { useEffect, useState } from 'react';

interface UseLocalStorageOptions<T> {
  hydrate?: (storedValue: unknown, initialValue: T) => T;
}

export function useLocalStorage<T>(key: string, initialValue: T, options?: UseLocalStorageOptions<T>) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      const parsedValue = stored ? JSON.parse(stored) : undefined;
      return options?.hydrate ? options.hydrate(parsedValue, initialValue) : ((parsedValue as T | undefined) ?? initialValue);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write failures
    }
  }, [key, value]);

  return [value, setValue] as const;
}
