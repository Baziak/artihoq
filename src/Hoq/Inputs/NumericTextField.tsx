import React, { useState } from "react";
import { TextField, StandardTextFieldProps, styled } from "@mui/material";

export interface NumericTextFieldProps {
  value?: number;
  onChange: (newValue: number) => void;
  allowNegative?: boolean;
  sx?: object;
  customInput?: React.ComponentType<StandardTextFieldProps>;
}

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: '1px solid rgba(0, 0, 0, 0.23)',
    },
    '&.Mui-focused fieldset': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    '& input': {
      padding: '0.3rem 0',
      textAlign: 'center',
      fontSize: '0.875rem',
    },
  },
}));

const NumericTextField = ({ value = 0, onChange, allowNegative, sx, customInput }: NumericTextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>((value ?? 0).toString());

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    // Allow only numbers, one decimal point, and optional negative sign
    const regex = allowNegative ? /^-?(\d+(\.\d*)?|\.\d*)?$/ : /^(\d+(\.\d*)?|\.\d*)?$/;
    if (regex.test(newInputValue) || newInputValue === "") {
      setInputValue(newInputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || inputValue === "." || (allowNegative && inputValue === "-")) {
      onChange(0);
      setInputValue("0");
    } else {
      const parsedValue = parseFloat(inputValue);
      if (!isNaN(parsedValue)) {
        onChange(parsedValue);
      }
    }
  };

  const sharedInputProps: StandardTextFieldProps = { 
    value: inputValue,
    onChange: handleTextFieldChange,
    onBlur: handleBlur,
    sx,
  };

  return (
    <>
      {customInput ? (
        React.createElement(customInput, sharedInputProps)
      ) : (
        <StyledTextField {...sharedInputProps} />
      )}
    </>
  );
};

export default NumericTextField;
