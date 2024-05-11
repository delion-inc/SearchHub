import { useState, useEffect } from "react";

const getLocalValue = (key: string, initValue: string | boolean) => {
   if (typeof window === "undefined") return initValue;
   // if already exist
   const localValue = JSON.parse(localStorage.getItem(key)!);
   if (localValue) return localValue;

   return initValue;
};

const useLocalStorage = (key: string, initValue: string | boolean) => {
   const [value, setValue] = useState(() => {
      return getLocalValue(key, initValue);
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
   }, [key, value]);

   return [value, setValue];
};

export default useLocalStorage;
