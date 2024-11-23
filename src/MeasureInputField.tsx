import { Box, ClickAwayListener, Paper, Popper, TextField } from "@mui/material";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useRef } from "react";

interface MeasureInputFieldProps {
  value: string;
  onChange?: (newValue: string) => void;
}

// TODO add proper tab and escape key handling, and maybe other ways to finish editing

export default function MeasureInputField({
  value,
  onChange,
}: MeasureInputFieldProps): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [inputValue, setInputValue] = React.useState(value);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onChange && inputValue !== value) {
      onChange(inputValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Box sx={{ position: "relative" }}>
          <Box
            aria-describedby={id}
            onClick={handleClick}
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {value}
          </Box>

          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Paper>
              <TextField
                value={inputValue}
                onChange={handleChange}
                variant="outlined"
                size="small"
                multiline
                autoFocus // TODO set focus properly on edit, and set edit text cursor position depending on click placement
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    padding: 0,
                  },
                }}
              />
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
}
