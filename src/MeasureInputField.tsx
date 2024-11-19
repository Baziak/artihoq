import { Box, ClickAwayListener, Popper, TextField } from "@mui/material";
import React from "react";

interface MeasureInputFieldProps {
  value: string;
  onChange?: (newValue: string) => void;
}

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
    <Box sx={{ position: 'relative' }}>
        <Box aria-describedby={id} onClick={handleClick} sx={{ whiteSpace: "pre-wrap" }}>
            {value}
        </Box>
      
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            <TextField
              value={inputValue}
              onChange={handleChange}
              variant="outlined"
              size="small"
              multiline
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  padding: 0,
                },
              }}
            />
          </Box>
        </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
}
