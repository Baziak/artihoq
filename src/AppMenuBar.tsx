import { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
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
import QfdState, { generateInitialQfdState } from "./QfdState";

interface AppMenuBarProps {
  qfdState: QfdState;
  setQfdState: Function;
}

const AppMenuBar = ({ qfdState, setQfdState }: AppMenuBarProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  async function getFile() {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
          },
        ],
        multiple: false,
      });
    
      return await fileHandle.getFile();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const saveFile = async (name: string, blob: Blob) => {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: name,
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return handle;
    } catch (e) {
      console.error(e);
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
      const qfdState = JSON.parse(e.target?.result as string);
      setQfdState(qfdState);
    };
    reader.readAsText(file);
  };


  const exportQfdState = () => {
    saveFile(qfdState.id + '.json', new Blob([JSON.stringify(qfdState, null, 2)], { type: 'application/json' }));
  }

  const resetQfdState = () => {
    setQfdState(generateInitialQfdState());
  }

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
          <ListItemButton>
            <ListItemIcon>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText primary="Print" />
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
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ArtiHOQ
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppMenuBar;
