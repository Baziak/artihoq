import React from "react";
import { Box, ButtonGroup, IconButton, Paper, Popper } from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { Competitor } from "./QfdState";
import VerticalInputField from "./Inputs/VerticalInputField";
import { cellStyling, highlightColor, competitorColors } from "./styles";
import CircleIcon from '@mui/icons-material/Circle';
import StarIcon from '@mui/icons-material/Star';
import SquareIcon from '@mui/icons-material/Square';
import PentagonIcon from '@mui/icons-material/Pentagon';
import FilledTriangleIcon from "./Inputs/FilledTriangleIcon";

const competitorIcons = [<CircleIcon />, <FilledTriangleIcon />, <SquareIcon />, <PentagonIcon />, <StarIcon />];

const competitorCellStyling = {
  ...cellStyling,
  ...highlightColor,
  minWidth: "1.5em",
  transform: "rotate(180deg)",
  writingMode: "vertical-rl",
};

interface HoqCompetitorCellProps {
  competitor: Competitor;
  onChange: (newValue: string) => void;
  onAddCompetitor: () => void;
  onRemoveCompetitor: () => void;
  sx?: any;
  canAddMore?: boolean;
  iconIndex: number;
}

const HoqCompetitorCell = ({
  competitor,
  onChange,
  onAddCompetitor,
  onRemoveCompetitor,
  sx,
  canAddMore = true,
  iconIndex,
}: HoqCompetitorCellProps) => {
  const [hoverBarAnchorEl, setHoverBarAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleHoverToolbarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHoverBarAnchorEl(event.currentTarget);
  };

  const handleHoverToolbarClose = (e: React.MouseEvent<HTMLElement>) => {
    setHoverBarAnchorEl(null);
  };

  const handleAddCompetitor = () => {
    onAddCompetitor();
  };

  const handleRemoveCompetitor = () => {
    onRemoveCompetitor();
  };

  const SelectedIcon = competitorIcons[iconIndex % competitorIcons.length];
  const iconColor = competitorColors[iconIndex % competitorColors.length];

  return (
    <Box sx={{ ...competitorCellStyling, ...sx, display: 'flex', alignItems: 'center' }} 
        onMouseOver={handleHoverToolbarOpen} onMouseLeave={handleHoverToolbarClose}>
      {React.cloneElement(SelectedIcon, { sx: { color: iconColor, transform: 'rotate(180deg)' } })}
      <VerticalInputField sx={{ height: "120px", textAlign: "center" }} value={competitor.name} onChange={(newValue) => onChange(newValue)} />
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
          <ButtonGroup size="small" aria-label="competitors control">
            <IconButton aria-label="add" size="small" color="primary" onClick={handleAddCompetitor} disabled={!canAddMore}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="small" color="default" onClick={handleRemoveCompetitor}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ButtonGroup>
        </Paper>
      </Popper>
    </Box>
  );
};

export default HoqCompetitorCell;