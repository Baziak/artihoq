import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

type NotificationSeverity = "error" | "warning" | "info" | "success";

interface Notification {
  message: string;
  severity: NotificationSeverity;
  open: boolean;
}

interface NotificationContextProps {
  showNotification: (message: string, severity?: NotificationSeverity) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
  notification: Notification;
  setNotification: Dispatch<SetStateAction<Notification>>;
}

const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => {},
  showError: () => {},
  showWarning: () => {},
  showInfo: () => {},
  showSuccess: () => {},
  notification: { message: "", severity: "info", open: false },
  setNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps): JSX.Element => {
  const [notification, setNotification] = useState<Notification>({
    message: "",
    severity: "info",
    open: false,
  });

  const showNotification = (message: string, severity: NotificationSeverity = "info") => {
    setNotification({ message, severity, open: true });
  };

  const showError = (message: string) => {
    showNotification(message, "error");
  };

  const showWarning = (message: string) => {
    showNotification(message, "warning");
  };

  const showInfo = (message: string) => {
    showNotification(message, "info");
  };

  const showSuccess = (message: string) => {
    showNotification(message, "success");
  };

  return (
    <NotificationContext.Provider value={{ showNotification, showError, showWarning, showInfo, showSuccess, notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
