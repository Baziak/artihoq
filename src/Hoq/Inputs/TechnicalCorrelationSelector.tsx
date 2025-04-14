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
  Typography,
} from "@mui/material";
import React from "react";

interface TechnicalCorrelationSelectorProps {
  selectedValue?: number;
  onChange?: (newValue: number) => void;
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

  const directionIconMap = new Map<TechnicalCorrelationType, TechnicalCorrelationSelectorItem>([
    [TechnicalCorrelationType.None, { icon: <SvgIcon />, text: "None" }],
    [TechnicalCorrelationType.Positive, { icon: <AddOutlined />, text: "Positive" }],
    [TechnicalCorrelationType.Negative, { icon: <RemoveOutlined />, text: "Negative" }],
  ]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, selectedValue: number) => {
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

  const valuePresentation =
    selectedValue !== undefined && directionIconMap.has(selectedValue as TechnicalCorrelationType) ? (
      directionIconMap.get(selectedValue as TechnicalCorrelationType)?.icon
    ) : (
      <Typography sx={{ fontSize: "0.75rem", minWidth: "1.5rem", lineHeight: "1.5rem", textAlign: "center" }}>
        {selectedValue}
      </Typography>
    );

  return (
    <>
      <Button sx={{ ...buttonStyling }} onClick={showSelector}>
        {/* // TODO: better rotation way? */}
        <span style={{ transform: "rotate(45deg)", lineHeight: "1em" }}>{valuePresentation}</span>
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
              {Array.from(directionIconMap.entries()).map(([key, item]) => (
                <MenuItem
                  key={key}
                  selected={key === selectedValue}
                  onClick={(event) => handleMenuItemClick(event, key)}
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
