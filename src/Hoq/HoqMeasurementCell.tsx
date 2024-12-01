import React from "react";
import { ButtonGroup, IconButton, Paper, Popper, TableCell, Theme } from "@mui/material";
import MeasureInputField from "./Inputs/VerticalInputField";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { verticalCellStyling } from "./styles";

const measuresCellStyling = {
  ...verticalCellStyling,
  minHeight: 128,
  maxHeight: 256,
};

interface HoqMeasurementCellProps {
  measure: { name: string; id: string };
  rowSpan: number;
  onChange: (newValue: string) => void;
  onAddMeasure: () => void;
  onRemoveMeasure: () => void;
}

const HoqMeasurementCell = ({ measure, rowSpan, onChange, onAddMeasure, onRemoveMeasure }: HoqMeasurementCellProps) => {
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
    <TableCell rowSpan={rowSpan} sx={measuresCellStyling} onMouseOver={handleHoverToolbarOpen} onMouseLeave={handleHoverToolbarClose}>
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
