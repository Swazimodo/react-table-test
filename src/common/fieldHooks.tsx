import React, { useState } from 'react';

export function useTextField(initialValue?: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    handleChange,
    setValue
  };
}

export function useNumberField(initialValue?: number) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setValue(value);
    }
  }

  return {
    value,
    handleChange,
    setValue
  };
}
