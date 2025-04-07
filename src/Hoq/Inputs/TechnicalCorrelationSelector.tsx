import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
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

interface TechnicalCorrelationSelectorProps {
  selectedValue?: number;
  onChange?: (newValue: TechnicalCorrelationType) => void;
}

const buttonStyling = {
  minWidth: 0,
  padding: 0,
};

export const enum TechnicalCorrelationType {
  None = 0,
  Negative = -1,
  Positive = 1,
}

export default function TechnicalCorrelationSelector({
  selectedValue,
  onChange,
}: TechnicalCorrelationSelectorProps): React.JSX.Element {
  interface TechnicalCorrelationSelectorItem {
    icon: React.JSX.Element;
    text: String;
  }

  const directionIconMap = new Map<number, TechnicalCorrelationSelectorItem>([
    [TechnicalCorrelationType.None, { icon: <SvgIcon />, text: "None" }],
    [TechnicalCorrelationType.Positive, { icon: <AddOutlined />, text: "Positive" }],
    [TechnicalCorrelationType.Negative, { icon: <RemoveOutlined />, text: "Negative" }],
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
        {/* // TODO: better rotation way? */}
        <span style={{ transform: "rotate(45deg)", lineHeight: "1em" }}>{icon}</span>
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
