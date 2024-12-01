import React from "react";
import { ButtonGroup, IconButton, Paper, Popper, TableCell, Theme } from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { Requirement } from "./QfdState";
import RequirementInputField from "./Inputs/RequirementInputField";

const requirementsCellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
  minWidth: 128,
  maxWidth: 256,
};

interface HoqRequirementCellProps {
  requirement: Requirement;
  onChange: (newValue: string) => void;
  onAddRequirement: () => void;
  onRemoveRequirement: () => void;
}

const HoqRequirementCell = ({
  requirement,
  onChange,
  onAddRequirement,
  onRemoveRequirement,
}: HoqRequirementCellProps) => {
  const [hoverBarAnchorEl, setHoverBarAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleHoverToolbarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHoverBarAnchorEl(event.currentTarget);
  };

  const handleHoverToolbarClose = (e: React.MouseEvent<HTMLElement>) => {
    setHoverBarAnchorEl(null);
  };

  const handleAddRequirement = () => {
    onAddRequirement();
  };

  const handleRemoveRequirement = () => {
    onRemoveRequirement();
  };

  return (
    <TableCell sx={requirementsCellStyling} onMouseOver={handleHoverToolbarOpen} onMouseLeave={handleHoverToolbarClose}>
      <RequirementInputField value={requirement.name} onChange={(newValue) => onChange(newValue)} />
      <Popper
        open={Boolean(hoverBarAnchorEl)}
        anchorEl={hoverBarAnchorEl}
        placement="right"
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
          <ButtonGroup size="small" aria-label="requirements control">
            <IconButton aria-label="add" size="small" color="primary" onClick={handleAddRequirement}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="small" color="default" onClick={handleRemoveRequirement}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ButtonGroup>
        </Paper>
      </Popper>
    </TableCell>
  );
};

export default HoqRequirementCell;
