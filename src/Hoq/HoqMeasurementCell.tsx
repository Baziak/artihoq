import React from "react";
import { ButtonGroup, IconButton, Paper, Popper, TableCell, Theme } from "@mui/material";
import MeasureInputField from "./Inputs/MeasureInputField";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

const measuresCellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
  transform: "rotate(180deg)",
  minHeight: 128,
  maxHeight: 256,
  writingMode: "vertical-rl",
};

interface HoqMeasurementCellProps {
  measure: { name: string; id: string };
  onChange: (newValue: string) => void;
  onAddMeasure: () => void;
  onRemoveMeasure: () => void;
}

const HoqMeasurementCell = ({ measure, onChange, onAddMeasure, onRemoveMeasure }: HoqMeasurementCellProps) => {
  const [hoverBarAnchorEl, setHoverBarAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleHoverToolbarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHoverBarAnchorEl(event.currentTarget);
  };
  const handleHoverToolbarClose = (e: React.MouseEvent<HTMLElement>) => {
    setHoverBarAnchorEl(null);
  };

  const handleAddMeasurement = () => {
    onAddMeasure();
  };
  const handleRemoveMeasurement = () => {
    onRemoveMeasure();
  };

  return (
    <TableCell sx={measuresCellStyling} onMouseOver={handleHoverToolbarOpen} onMouseLeave={handleHoverToolbarClose}>
      <MeasureInputField value={measure.name} onChange={(newValue) => onChange(newValue)} />
      <Popper
        open={Boolean(hoverBarAnchorEl)}
        anchorEl={hoverBarAnchorEl}
        placement="right-end"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, -5],
            },
          },
        ]}
      >
        <Paper>
          <ButtonGroup size="small" aria-label="measures control" orientation="vertical">
            <IconButton aria-label="add" size="small" color="primary" onClick={handleAddMeasurement}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="small" color="default" onClick={handleRemoveMeasurement}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ButtonGroup>
        </Paper>
      </Popper>
    </TableCell>
  );
};

export default HoqMeasurementCell;
