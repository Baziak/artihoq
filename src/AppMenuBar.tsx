import { useState } from "react";
import { AppBar, Box, IconButton, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadIcon from "@mui/icons-material/FileOpen";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PrintIcon from "@mui/icons-material/Print";
import ClearIcon from "@mui/icons-material/Clear";
import SettingsIcon from "@mui/icons-material/Settings";
import QfdState, { generateInitialQfdState } from "./Hoq/QfdState";
import { useReactToPrint } from "react-to-print";
import { defaultSettings } from "./SettingsDialog";
import Project from "./Hoq/Project";
import { Dispatch, SetStateAction } from "react";
import { useNotification } from "./NotificationContext";

interface AppMenuBarProps {
  contentRef: React.RefObject<HTMLDivElement>;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
  setProject: Dispatch<SetStateAction<Project>>;
  currentFileName: string | null;
  setCurrentFileName: Dispatch<SetStateAction<string | null>>;
}

const AppMenuBar = ({
  contentRef,
  setSettingsOpen,
  project,
  setProject,
  currentFileName,
  setCurrentFileName,
}: AppMenuBarProps) => {
  const { showError, showInfo, showSuccess } = useNotification();
  const [openDrawer, setOpenDrawer] = useState(false);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  async function getFile() {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [{}],
        multiple: false,
      });

      return await fileHandle.getFile();
    } catch (e) {
      console.error(e);
      showError("Error opening file.");
      return null;
    }
  }

  const saveFile = async (name: string | null, blob: Blob) => {
    try {
      const suggestedName = name || project.id + ".json";
      const handle = await window.showSaveFilePicker({
        suggestedName: suggestedName,
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      showSuccess("File saved successfully.");
      return handle.name;
    } catch (e) {
      console.error(e);
      showError("Error saving file.");
      return null;
    }
  };

  const importQfdState = async () => {
    const file = await getFile();
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);

        // Check if the imported data is a Project or QfdState
        if (importedData.version === 1) {
          // If it's version 1, it's a Project
          setProject(importedData as Project);
        } else {
          // If it doesn't have a version, assume it's an old QfdState
          setProject((prevProject) => ({
            ...prevProject,
            qfdState: importedData as QfdState,
            version: 1,
            settings: defaultSettings,
            id: importedData.id || prevProject.id, // Use imported id if available, otherwise keep the old one
          }));
        }
        setCurrentFileName(file.name);
        showSuccess("File imported successfully.");
      } catch (error) {
        console.error("Error parsing or importing file:", error);
        showError("Error parsing or importing file.");
      }
      reader.onerror = () => {
        showError("Error reading file.");
      };
    };
    reader.readAsText(file);
  };

  const exportQfdState = async () => {
    const fileName = await saveFile(currentFileName, new Blob([JSON.stringify(project, null, 2)], { type: "application/json" }));
    if (fileName) {
      setCurrentFileName(fileName);
    }
  };

  const resetQfdState = () => {
    setProject((prevProject) => ({
      ...prevProject,
      qfdState: generateInitialQfdState(),
    }));
    setCurrentFileName(null);
    showInfo("QFD state reset.");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={importQfdState}>
            <ListItemIcon>
              <UploadIcon />
            </ListItemIcon>
            <ListItemText primary="Import..." />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={exportQfdState}>
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText primary="Export..." />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => reactToPrintFn()}>
            <ListItemIcon>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText primary="Print..." />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={resetQfdState}>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Reset" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setSettingsOpen(true)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Typography variant="h6" component="div">
            ArtiHoQ
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};

export default AppMenuBar;
