import React from "react";
import {
  Button,
  Box,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TableCell,
  ClickAwayListener,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Competitor } from "./QfdState";
import { getCompetitorIconElement } from "./competitorUtils";
import { controlCellStyling, highlightColor } from "./styles";

interface HoqRequirementRatingCellProps {
  competitors: Competitor[];
  ratingValueForCell: number; 
  currentRatingsForThisRequirement: number[];
  onSetRating: (competitorIndex: number, newRatingForCompetitor: number) => void;
  id?: string;
}

const HoqRequirementRatingCell = ({
  competitors,
  ratingValueForCell,
  currentRatingsForThisRequirement,
  onSetRating,
  id,
}: HoqRequirementRatingCellProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCompetitorSelect = (competitorIndex: number) => {
    const currentRatingOfSelectedCompetitor = currentRatingsForThisRequirement[competitorIndex];
    if (currentRatingOfSelectedCompetitor === ratingValueForCell) {
      onSetRating(competitorIndex, 0); 
    } else {
      onSetRating(competitorIndex, ratingValueForCell);
    }
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <TableCell
      id={id}
      sx={{ ...controlCellStyling, ...highlightColor }}
    >
      <Button
        ref={buttonRef}
        onClick={handleClick}
        sx={{
          width: "100%",
          height: "100%",
          minWidth: "auto",
          padding: "6px 8px",
          textTransform: "none",
          justifyContent: "center",
          color: "inherit", 
          backgroundColor: "transparent", 
          '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          }
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2px", minHeight: '24px', flexWrap: 'wrap' }}>
          {competitors.map((competitor, index) => {
            if (currentRatingsForThisRequirement && currentRatingsForThisRequirement[index] === ratingValueForCell) {
              return getCompetitorIconElement(index, { fontSize: "medium" });
            }
            return null;
          })}
          {(!competitors || competitors.length === 0 || competitors.every((_, idx) => !currentRatingsForThisRequirement || currentRatingsForThisRequirement[idx] !== ratingValueForCell)) && (<Box sx={{width: '1em', height: '1em', display: 'inline-block'}} />)}
        </Box>
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom" sx={{ zIndex: 1300 }}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open}>
              {competitors.map((competitor, index) => (
                <MenuItem key={competitor.id} onClick={() => handleCompetitorSelect(index)}>
                  <ListItemIcon sx={{minWidth: '32px'}}>
                    {getCompetitorIconElement(index, { fontSize: "medium" })}
                  </ListItemIcon>
                  <ListItemText primary={competitor.name} />
                </MenuItem>
              ))}
              {competitors.length === 0 && <MenuItem disabled>No competitors defined</MenuItem>}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </TableCell>
  );
};

export default HoqRequirementRatingCell;