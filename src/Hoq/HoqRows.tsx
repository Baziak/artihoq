import React, { useState } from "react";
import { TableCell, TableRow, TextField, styled } from "@mui/material";
import QfdState from "./QfdState";
import RelationshipLevelSelector from "./Inputs/RelationshipLevelSelector";
import HoqRequirementCell from "./HoqRequirementCell";
import NumericSelector from "./Inputs/NumericSelector";
import { baseColor, controlCellStyling, focusColor, highlightColor } from "./styles";
import { Settings } from "../SettingsDialog";

interface HoqRowsProps {
  qfdState: QfdState;
  setRequirementValue: (modifiedRowIndex: number, newValue: string) => void;
  setRelationshipValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
  addRequirementAt: (modifiedRowIndex: number) => void;
  setRequirementImportance: (modifiedRowIndex: number, newValue: number) => void;
  removeRequirementAt: (rowIndex: number) => void;
  settings: Settings;
}

const TransparentTextField = styled(TextField)(({ theme }) => ({
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

const HoqRows = ({
  qfdState,
  setRequirementValue,
  setRelationshipValue,
  addRequirementAt,
  setRequirementImportance,
  removeRequirementAt,
  settings,
}: HoqRowsProps) => {
  const RelationshipLevelControl = ({ initialValue, onChange }: { initialValue: number; onChange: (newValue: number) => void }) => {
    const [inputValue, setInputValue] = useState<string>(initialValue.toString());

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = e.target.value;
      // Allow only numbers and one decimal point
      if (/^(\d+(\.\d*)?|\.\d*)?$/.test(newInputValue) || newInputValue === "") {
        setInputValue(newInputValue);
      }
    };

    const handleBlur = () => {
      if (inputValue === "" || inputValue === ".") {
        onChange(0);
        setInputValue("0");
      } else {
        const parsedValue = parseFloat(inputValue);
        if (!isNaN(parsedValue)) {
          onChange(parsedValue);
        }
      }
    };

    if (settings.relationshipLevelControl === "input") {
      return (
        <TransparentTextField
          value={inputValue}
          onChange={handleTextFieldChange}
          onBlur={handleBlur}
          size="small"
          sx={{ width: "100%" }}
        />
      );
    } else {
      return <RelationshipLevelSelector selectedValue={initialValue} onChange={onChange} />;
    }
  };

  const ImportanceControl = ({ initialValue, onChange }: { initialValue: number; onChange: (newValue: number) => void }) => {
    const [inputValue, setInputValue] = useState<string>(initialValue.toString());

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = e.target.value;
      if (/^(\d+(\.\d*)?|\.\d*)?$/.test(newInputValue) || newInputValue === "") {
        setInputValue(newInputValue);
      }
    };

    const handleBlur = () => {
      if (inputValue === "" || inputValue === ".") {
        onChange(0);
        setInputValue("0");
      } else {
        const parsedValue = parseFloat(inputValue);
        if (!isNaN(parsedValue)) {
          onChange(parsedValue);
        }
      }
    };

    if (settings.importanceLevelControl === "input") {
      return (
        <TransparentTextField
          value={inputValue}
          onChange={handleTextFieldChange}
          onBlur={handleBlur}
          size="small"
          sx={{ width: "100%" }}
        />
      );
    } else {
      return <NumericSelector selectedValue={initialValue} onChange={onChange} />;
    }
  };

  return (
    <>
      {qfdState.relationshipValues.map((cellValues, rowIndex) => {
        return (
          <TableRow key={qfdState.requirements[rowIndex].id}>
            <HoqRequirementCell
              requirement={qfdState.requirements[rowIndex]}
              onChange={(newValue) => setRequirementValue(rowIndex, newValue)}
              onAddRequirement={() => addRequirementAt(rowIndex + 1)}
              onRemoveRequirement={() => removeRequirementAt(rowIndex)}
            />
            <TableCell sx={{ ...controlCellStyling, ...baseColor }}>
              <ImportanceControl
                initialValue={qfdState.requirements[rowIndex].importance}
                onChange={(newValue) => setRequirementImportance(rowIndex, newValue)}
              />
            </TableCell>
            {cellValues.map((value, colIndex) => {
              const id = qfdState.requirements[rowIndex].id + qfdState.measures[colIndex].id;
              return (
                <TableCell key={id} sx={{ ...controlCellStyling, ...focusColor }}>
                  <RelationshipLevelControl
                    initialValue={value}
                    onChange={(selectedValue) => setRelationshipValue(rowIndex, colIndex, selectedValue)}
                  />
                </TableCell>
              );
            })}
            {[...Array(5)].map((_, index) => (
              <TableCell key={index} sx={{ ...controlCellStyling, ...highlightColor }}></TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export default HoqRows;
