import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    console.log("Debounced Value:", debouncedValue);
  }, [debouncedValue]);

  return (
    <input 
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search.."
    />
  );
};

export default SearchBar;
