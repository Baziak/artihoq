import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface SettingsDialogProps {
  open: boolean;
  handleClose: () => void;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export interface Settings {
  relationshipLevelControl: "select" | "input";
  correlationLevelControl: "select" | "input";
  importanceLevelControl: "select" | "input";
  complexityControl: "select" | "input";
}

export const defaultSettings: Settings = {
  relationshipLevelControl: "select",
  correlationLevelControl: "select",
  importanceLevelControl: "select",
  complexityControl: "select",
};

export default function SettingsDialog({
  open,
  handleClose,
  settings,
  setSettings,
}: SettingsDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="settings-dialog-title"
    >
      <DialogTitle id="settings-dialog-title">{"Settings"}</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl>
            <FormLabel id="relationship-level-radio-buttons-group-label">
              Relationship Level Control
            </FormLabel>
            <RadioGroup
              aria-labelledby="relationship-level-radio-buttons-group-label"
              name="relationshipLevelControl"
              value={settings.relationshipLevelControl}
              onChange={handleSettingsChange}
            >
              <FormControlLabel
                value="select"
                control={<Radio />}
                label="Standard notation (None=0, Slight=1, Moderate=3, Strong=9)"
              />
              <FormControlLabel
                value="input"
                control={<Radio />}
                label="Custom numeric value"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="correlation-level-radio-buttons-group-label">
              Correlation Level Control
            </FormLabel>
            <RadioGroup
              aria-labelledby="correlation-level-radio-buttons-group-label"
              name="correlationLevelControl"
              value={settings.correlationLevelControl}
              onChange={handleSettingsChange}
            >
              <FormControlLabel
                value="select"
                control={<Radio />}
                label="Standard notation (None=0, Negative=-1, Positive=1)"
              />
              <FormControlLabel
                value="input"
                control={<Radio />}
                label="Custom numeric value"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="importance-control-radio-buttons-group-label">
              User Importance Level Control
            </FormLabel>
            <RadioGroup
              aria-labelledby="importance-control-radio-buttons-group-label"
              name="importanceLevelControl"
              value={settings.importanceLevelControl}
              onChange={handleSettingsChange}
            >
              <FormControlLabel value="select" control={<Radio />} label="Select (1 to 5 grade)" />
              <FormControlLabel value="input" control={<Radio />} label="Custom numeric value" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="complexity-control-radio-buttons-group-label">
              Implementation Complexity Level Control
            </FormLabel>
            <RadioGroup
              aria-labelledby="complexity-control-radio-buttons-group-label"
              name="complexityControl"
              value={settings.complexityControl}
              onChange={handleSettingsChange}
            >
              <FormControlLabel value="select" control={<Radio />} label="Select (1 to 5 grade)" />
              <FormControlLabel value="input" control={<Radio />} label="Custom numeric value" />
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
