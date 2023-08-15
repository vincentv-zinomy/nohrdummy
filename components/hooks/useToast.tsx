// hooks/useToast.ts

import { createContext, useContext, useEffect, useState } from "react";

interface Toast {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastContextData {
  toasts: Toast[];
  addToast: (type: "success" | "error" | "info", message: string) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const ToastProvider = ({ children }: any) => {
  // Toast
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let clearToast = setTimeout(() => {
      setToasts(toasts.filter((toast) => toast.id > Date.now() - 5000));
    }, 5000);
    return () => {
      clearTimeout(clearToast);
    };
  }, [toasts]);
  const addToast = (type: "success" | "error" | "info", message: string) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id: Date.now(),
        type,
        message,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
