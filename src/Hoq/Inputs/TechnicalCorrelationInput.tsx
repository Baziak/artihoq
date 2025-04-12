import React, { useState } from "react";
import { TextField, styled } from "@mui/material";

const TransparentTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
    },
    "&.Mui-focused fieldset": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "& input": {
      textAlign: "center",
      fontSize: "0.75rem",
      padding: "0.3rem 0",
      transform: "rotate(45deg)",
      transformOrigin: "center",
      width: "4rem",
    },
  },
}));

interface TechnicalCorrelationInputProps {
  initialValue: number;
  onChange: (newValue: number) => void;
}

const TechnicalCorrelationInput = ({
  initialValue,
  onChange,
}: TechnicalCorrelationInputProps) => {
  const [inputValue, setInputValue] = useState<string>(initialValue.toString());

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    // Allow only numbers, one decimal point, and optional negative sign
    if (/^-?(\d+(\.\d*)?|\.\d*)?$/.test(newInputValue) || newInputValue === "") {
      setInputValue(newInputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || inputValue === "." || inputValue === "-") {
      onChange(0);
      setInputValue("0");
    } else {
      const parsedValue = parseFloat(inputValue);
      if (!isNaN(parsedValue)) {
        onChange(parsedValue);
      }
    }
  };

  return (
    <TransparentTextField
      value={inputValue}
      onChange={handleTextFieldChange}
      onBlur={handleBlur}
      size="small"
      sx={{ width: "100%" }}
    />
  );
};

export default TechnicalCorrelationInput;
