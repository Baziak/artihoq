import { ChangeHistory, CircleOutlined, RadioButtonChecked } from "@mui/icons-material";
import { Button, ClickAwayListener, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Popper, SvgIcon, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

interface RelationshipLevelSelectorProps {
  selectedValue?: number;
  onChange?: (newValue: RelationshipType) => void;
//  onClose: React.MouseEventHandler<HTMLButtonElement>
}

const relationshipButtonStyling = {
  minWidth: 0,
}

export const enum RelationshipType {
  None = 0,
  Slight = 1,
  Moderate = 2,
  Strong = 3
}

export default function RelationshipLevelSelector({selectedValue, onChange}: RelationshipLevelSelectorProps): React.JSX.Element {

  interface RelationshipLevelSelectorItem {
    icon: React.JSX.Element;
    text: String;
  }

  const relationIconMap = new Map<number, RelationshipLevelSelectorItem>([
    [RelationshipType.None, {icon: <SvgIcon />, text: "None"}],
    [RelationshipType.Slight, {icon: <ChangeHistory />, text: "Slight"}],
    [RelationshipType.Moderate, {icon: <CircleOutlined />, text: "Moderate"}],
    [RelationshipType.Strong, {icon: <RadioButtonChecked />, text: "Strong"}]
  ]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
  };

  const [levelValue, setLevelValue] = React.useState(selectedValue);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  // const [open, setOpen] = React.useState(false);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, selectedValue: number) => {
    setLevelValue(selectedValue);
    setAnchorEl(null);
    if (onChange) {
      onChange(selectedValue);
    } 
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  function showRelationshipSelector(event: React.MouseEvent<HTMLButtonElement>) {
    // event.currentTarget.style.background = 'red';
  
    setAnchorEl(event.currentTarget);
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setAnchorEl(null);
      // setOpen(false);
    } else if (event.key === 'Escape') {
      setAnchorEl(null);
      // setOpen(false);
    }
  }

  const open = Boolean(anchorEl);

  const icon = selectedValue !== undefined && relationIconMap.has(selectedValue) ? 
    relationIconMap.get(selectedValue)?.icon : 
    <>&nbsp;</>; 

  return <>
    <Button sx={{ ...relationshipButtonStyling }} onClick={showRelationshipSelector}>
      {icon}
    </Button>
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
    >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
            >
            {Array.from(relationIconMap.entries()).map(([index, item]) => 
              
                <MenuItem selected={index === levelValue} onClick={(event) => handleMenuItemClick(event, index)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </MenuItem>

            )}
            </MenuList>
          </ClickAwayListener>
        </Paper>
    </Popper>
  </>;
}