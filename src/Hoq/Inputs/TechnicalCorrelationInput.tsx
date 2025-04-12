import React from "react";
import NumericTextField, { StyledTextField } from "./NumericTextField"; 
import { StandardTextFieldProps, styled } from "@mui/material";

interface TechnicalCorrelationInputProps {
  initialValue: number;
  onChange: (newValue: number) => void;
}

const StyledTechnicalCorrelationInput = styled(StyledTextField)<StandardTextFieldProps>(({ theme }) => ({ 
  '& .MuiOutlinedInput-root': {
    '& input': {
      textAlign: "center",
      fontSize: "0.75rem",
      padding: "0.3rem 0",
      transform: "rotate(45deg)",
      transformOrigin: "center",
      width: "4rem",
    },
    '& fieldset': {
      border: 'none',
    },
  },
}));

const TechnicalCorrelationInput = ({
  initialValue,
  onChange,
}: TechnicalCorrelationInputProps) => {
  return (
    <NumericTextField
      value={initialValue}
      onChange={onChange}
      allowNegative={true}
      customInput={StyledTechnicalCorrelationInput}
    />
  );
};

export default TechnicalCorrelationInput;
