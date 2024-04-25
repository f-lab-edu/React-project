import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const readValue = useCallback((): T => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (error) {
      //
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(() => readValue());

  const setValue = useCallback(
    (value: T | ((value: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(readValue()) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);

        window.dispatchEvent(
          new CustomEvent('local-storage', {
            detail: { key },
          }),
        );
      } catch (error) {
        //
      }
    },
    [key, readValue],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      window.dispatchEvent(
        new CustomEvent('local-storage', {
          detail: { key },
        }),
      );
    } catch (error) {
      //
    }
  }, [key, initialValue]);

  const handleStorageChange = useCallback(
    (event: Event) => {
      if (!(event instanceof StorageEvent || event instanceof CustomEvent)) {
        return;
      }

      if ('key' in event && event.key !== key) {
        return;
      }

      setStoredValue(readValue());
    },
    [key, readValue],
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, handleStorageChange]);

  return [storedValue, setValue, removeValue];
};
