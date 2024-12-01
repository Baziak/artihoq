import { Button, ClickAwayListener, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React from "react";

interface NumericSelectorProps {
  selectedValue?: number;
  onChange?: (newValue: number) => void;
}

const NumericButtonStyling = {
  minWidth: 40,
};

export default function NumericSelector({
  selectedValue,
  onChange,
}: NumericSelectorProps): React.JSX.Element {
  const [currentValue, setCurrentValue] = React.useState(selectedValue);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, selectedValue: number) => {
    setCurrentValue(selectedValue);
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

  return (
    <>
      <Button sx={{ ...NumericButtonStyling }} onClick={showSelector}>
        {currentValue}
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
              {[1, 2, 3, 4, 5].map((value) => (
                <MenuItem
                  key={value}
                  selected={value === currentValue}
                  onClick={(event) => handleMenuItemClick(event, value)}
                >
                  {value}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
