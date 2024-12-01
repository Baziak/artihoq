import { Button, ClickAwayListener, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React from "react";

interface UserImportanceSelectorProps {
  selectedValue?: number;
  onChange?: (newValue: number) => void;
}

const userImportanceButtonStyling = {
  minWidth: 0,
};

export default function UserImportanceSelector({
  selectedValue,
  onChange,
}: UserImportanceSelectorProps): React.JSX.Element {
  const [importanceValue, setImportanceValue] = React.useState(selectedValue);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, selectedValue: number) => {
    setImportanceValue(selectedValue);
    setAnchorEl(null);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function showImportanceSelector(event: React.MouseEvent<HTMLButtonElement>) {
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
      <Button sx={{ ...userImportanceButtonStyling }} onClick={showImportanceSelector}>
        {importanceValue}
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
              {[1, 2, 3, 4, 5].map((importance) => (
                <MenuItem
                  key={importance}
                  selected={importance === importanceValue}
                  onClick={(event) => handleMenuItemClick(event, importance)}
                >
                  {importance}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
