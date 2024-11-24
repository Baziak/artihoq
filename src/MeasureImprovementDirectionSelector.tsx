import { ArrowDownwardOutlined, ArrowUpwardOutlined } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SvgIcon,
} from "@mui/material";
import React from "react";

interface MeasureImprovementDirectionSelectorProps {
  selectedValue?: number;
  onChange?: (newValue: MeasureImprovementDirectionType) => void;
}

const buttonStyling = {
  minWidth: 0,
};

export const enum MeasureImprovementDirectionType {
  None = 0,
  Negative = -1,
  Positive = 1,
}

export default function MeasureImprovementDirectionSelector({
  selectedValue,
  onChange,
}: MeasureImprovementDirectionSelectorProps): React.JSX.Element {
  interface MeasureImprovementDirectionSelectorItem {
    icon: React.JSX.Element;
    text: String;
  }

  const directionIconMap = new Map<number, MeasureImprovementDirectionSelectorItem>([
    [MeasureImprovementDirectionType.None, { icon: <SvgIcon />, text: "None" }],
    [MeasureImprovementDirectionType.Negative, { icon: <ArrowUpwardOutlined />, text: "Positive" }],
    [MeasureImprovementDirectionType.Positive, { icon: <ArrowDownwardOutlined />, text: "Negative" }],
  ]);

  const [directionValue, setDirectionValue] = React.useState(selectedValue);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, selectedValue: number) => {
    setDirectionValue(selectedValue);
    setAnchorEl(null);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function showSelector(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      setAnchorEl(null);
    }
  }

  const open = Boolean(anchorEl);

  const icon =
    selectedValue !== undefined && directionIconMap.has(selectedValue) ? (
      directionIconMap.get(selectedValue)?.icon
    ) : (
      <>&nbsp;</>
    );

  return (
    <>
      <Button sx={{ ...buttonStyling }} onClick={showSelector}>
        {icon}
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="composition-menu"
              aria-labelledby="composition-button"
              onKeyDown={handleListKeyDown}
            >
              {Array.from(directionIconMap.entries()).map(([index, item]) => (
                <MenuItem
                  key={index}
                  selected={index === directionValue}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
