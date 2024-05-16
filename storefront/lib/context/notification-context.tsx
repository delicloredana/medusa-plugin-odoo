'use client';

import React, { useContext, useState } from 'react';

export enum NOTIFICATION_STATUS {
  SUCCESS = 'Congratulations',
  ERROR = 'Something went wrong...',
}
interface NotificationContext {
  success: (value: string) => void;
  error: (value: string) => void;
  getNotification: () => {
    notification: NOTIFICATION_STATUS | null;
    notificationText: string | null;
  };
  clear: () => void;
}
interface NotificationProviderProps {
  children?: React.ReactNode;
}
const NotificationContext = React.createContext<NotificationContext | null>(
  null
);
export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NOTIFICATION_STATUS | null>(
    null
  );
  const [notificationText, setNotificationText] = useState<string | null>(null);

  const clear = () => {
    setNotificationText(null);
    setNotification(null);
  };
  const error = (value: string) => {
    setNotificationText(value);
    setNotification(NOTIFICATION_STATUS.ERROR);
    if (value !== 'Wrong discount code') {
      setTimeout(() => clear(), 2000);
    }
  };
  const success = (value: string) => {
    setNotificationText(value);
    setNotification(NOTIFICATION_STATUS.SUCCESS);
    setTimeout(() => clear(), 2000);
  };
  const getNotification = () => {
    return { notification, notificationText };
  };
  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        getNotification,
        clear,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === null) {
    throw new Error('Error');
  }
  return context;
};
