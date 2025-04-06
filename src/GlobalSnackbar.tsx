import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotification } from "./NotificationContext";

const GlobalSnackbar = (): JSX.Element => {
  const { notification, setNotification } = useNotification();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  useEffect(() => {
    if (notification.open) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, open: false });
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        sx={{ width: "100%" }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
