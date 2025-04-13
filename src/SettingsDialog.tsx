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
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
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
  complexityLevelControl: "select" | "input";
  importanceMaxValue: number;
  complexityMaxValue: number;
}

export const defaultSettings: Settings = {
  relationshipLevelControl: "select",
  correlationLevelControl: "select",
  importanceLevelControl: "select",
  complexityLevelControl: "select",
  importanceMaxValue: 5,
  complexityMaxValue: 5,
};

export default function SettingsDialog({
  open,
  handleClose,
  settings,
  setSettings,
}: SettingsDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSettingsChange = (event: SelectChangeEvent<"select" | "input">) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleImportanceMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        importanceMaxValue: parsedValue,
      }));
    }
  };

  const handleComplexityMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        complexityMaxValue: parsedValue,
      }));
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="settings-dialog-title"
    >
      <DialogTitle id="settings-dialog-title">{"Settings"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6">Relationship Settings</Typography>
              <FormControl fullWidth>
                <InputLabel id="relationship-level-control-label">Notation</InputLabel>
                <Select
                  labelId="relationship-level-control-label"
                  id="relationship-level-control"
                  name="relationshipLevelControl"
                  value={settings.relationshipLevelControl}
                  label="Notation"
                  onChange={handleSettingsChange}
                  size="small"
                >
                  <MenuItem value="select">Standard notation</MenuItem>
                  <MenuItem value="input">Custom numeric value</MenuItem>
                </Select>
                {settings.relationshipLevelControl === "select" && (
                  <FormHelperText>
                    <Typography variant="caption">
                      (None=0, Slight=1, Moderate=3, Strong=9)
                    </Typography>
                  </FormHelperText>
                )}
                <Box mt={1}></Box>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6">Correlation Settings</Typography>
              <FormControl fullWidth>
                <InputLabel id="correlation-level-control-label">Notation</InputLabel>
                <Select
                  labelId="correlation-level-control-label"
                  id="correlation-level-control"
                  name="correlationLevelControl"
                  value={settings.correlationLevelControl}
                  label="Notation"
                  onChange={handleSettingsChange}
                  size="small"
                >
                  <MenuItem value="select">Standard notation</MenuItem>
                  <MenuItem value="input">Custom numeric value</MenuItem>
                </Select>
                {settings.correlationLevelControl === "select" && (
                  <FormHelperText>
                    <Typography variant="caption">
                      (None=0, Negative=-1, Positive=1)
                    </Typography>
                  </FormHelperText>
                )}
                <Box mt={1}></Box>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6">Importance Settings</Typography>
              <FormControl fullWidth>
                <InputLabel id="importance-level-control-label">Notation</InputLabel>
                <Select
                  labelId="importance-level-control-label"
                  id="importance-level-control"
                  name="importanceLevelControl"
                  value={settings.importanceLevelControl}
                  label="Notation"
                  onChange={handleSettingsChange}
                  size="small"
                >
                  <MenuItem value="select">Select (1 to N grade)</MenuItem>
                  <MenuItem value="input">Custom numeric value</MenuItem>
                </Select>
                {settings.importanceLevelControl === "select" && (
                  <Box mt={1}>
                    <TextField
                      label="Max Value"
                      type="number"
                      value={settings.importanceMaxValue}
                      onChange={handleImportanceMaxValueChange}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mb: 2 }}> {/* Added margin-bottom */}
            <Box>
              <Typography variant="h6">Complexity Settings</Typography>
              <FormControl fullWidth>
                <InputLabel id="complexity-level-control-label">Notation</InputLabel>
                <Select
                  labelId="complexity-level-control-label"
                  id="complexity-level-control"
                  name="complexityLevelControl"
                  value={settings.complexityLevelControl}
                  label="Notation"
                  onChange={handleSettingsChange}
                  size="small"
                >
                  <MenuItem value="select">Select (1 to N grade)</MenuItem>
                  <MenuItem value="input">Custom numeric value</MenuItem>
                </Select>
                {settings.complexityLevelControl === "select" && (
                  <Box mt={1}>
                    <TextField
                      label="Max Value"
                      type="number"
                      value={settings.complexityMaxValue}
                      onChange={handleComplexityMaxValueChange}
                      size="small"
                      sx={{ width: "100%"}}
                    />
                  </Box>
                )}
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
