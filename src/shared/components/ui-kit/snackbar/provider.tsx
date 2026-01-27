import React, { useState, useEffect, createContext, useContext } from "react";

import Snackbar from "./snackbar";

import styles from "./style.module.scss";

const DefaultSettings = {
  duration: 3000,
};

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type MessageContent = string | React.ReactNode | React.ReactNode[];

type SnackbarStoreData = Array<SnackbarProps>;

type SnackbarProps = {
  message: MessageContent;
  duration?: number;
  position?: Position;
  stackLimit?: number;
  autoHide?: boolean;
  onClose?: () => void;
  classes?: {
    root?: string;
    snackbarBox?: string;
  };
};

type SnackbarProviderProps = {
  children: React.ReactNode;
};

type SnackbarContextType = {
  open: (props?: SnackbarProps) => void;
  close: (index?: number) => void;
};

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [stack, setStack] = useState<SnackbarStoreData>([]);

  const openSnackbar = (data?: SnackbarProps) => {
    setStack((prevStack) => [...prevStack, data]);
  };

  const closeSnackbar = (index?: number) => {
    if (index !== undefined) {
      setStack((prevStack) => prevStack.filter((_, i) => i !== index));
      return;
    }
    setStack((prevStack) => prevStack.slice(1));
  };

  const renderSnackbar = (snackbar: SnackbarProps, index: number) => {
    return (
      <Snackbar
        key={index}
        {...snackbar}
        onRequestClose={() => closeSnackbar(index)}
      />
    );
  };

  return (
    <SnackbarContext.Provider
      value={{
        open: openSnackbar,
        close: closeSnackbar,
      }}
    >
      {children}
      <div className={styles.SnackbarStack}>{stack.map(renderSnackbar)}</div>
    </SnackbarContext.Provider>
  );
};

const SnackbarContext = createContext<SnackbarContextType>({
  open: () => {},
  close: () => {},
});

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context || (!context.open && !context.close)) {
    console.error("useSnackbar must be used within a SnackbarProvider");

    return {
      open: () => {
        console.error("SnackbarContext is not available.");
      },
      close: () => {
        console.error("SnackbarContext is not available.");
      },
    };
  }
  return context;
};

export {
  useSnackbar,
  SnackbarContext,
  type SnackbarProps,
  type SnackbarStoreData,
  type SnackbarContextType,
};

export default SnackbarProvider;
