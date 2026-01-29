import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

import Snackbar from "./snackbar";

import styles from "./style.module.scss";
import { mergeClassNames } from "@utils/common";

const DefaultSettings: SnackbarSettings = {
  position: "top-center",
  stackLimit: 5,
  terminateDuration: 300,
};

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type SnackbarSettings = {
  position?: Position;
  stackLimit?: number;
  terminateDuration?: number;
};

type MessageContent = string | React.ReactNode | React.ReactNode[];

type SnackbarStoreItem = {
  id: string;
  onRequestClose: () => void;
  terminate?: boolean;
};

type SnackbarData = SnackbarProps & SnackbarStoreItem;

type SnackbarProps = {
  message: MessageContent;
  duration?: number;
  autoHide?: boolean;
  onClose?: () => void;
  classes?: {
    root?: string;
    snackbarBox?: string;
  };
};

type SnackbarProviderProps = {
  children: React.ReactNode;
  settings?: SnackbarSettings;
};

type SnackbarContextType = {
  open: (props?: SnackbarProps) => void;
  close: (id?: string) => void;
  updateSettings?: (settings: SnackbarSettings) => void;
};

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  settings = DefaultSettings,
}) => {
  const [stack, setStack] = useState<Array<SnackbarData>>([]);
  const [settingsData, setSettings] = useState<SnackbarSettings>({
    position: settings.position || DefaultSettings.position,
    stackLimit: settings.stackLimit || DefaultSettings.stackLimit,
    terminateDuration:
      settings.terminateDuration || DefaultSettings.terminateDuration,
  });

  useEffect(() => {
    stack.forEach((snackbar, index) => {
      if (snackbar.terminate) {
        terminate(index, settingsData.terminateDuration);
      }
    });
  }, [stack]);

  const positionClass = useMemo(() => {
    switch (settingsData.position) {
      case "top-left":
        return styles.topLeft;
      case "top-center":
        return styles.topCenter;
      case "top-right":
        return styles.topRight;
      case "bottom-left":
        return styles.bottomLeft;
      case "bottom-center":
        return styles.bottomCenter;
      case "bottom-right":
        return styles.bottomRight;
      default:
        return "";
    }
  }, [settingsData.position]);

  const openSnackbar = (data?: SnackbarData) => {
    const id = Math.random().toString(36);

    setStack((prevStack) => {
      if (prevStack.length >= settingsData.stackLimit) {
        prevStack.shift();
        return [...prevStack, { id, ...data }];
      }
      return [...prevStack, { id, ...data }];
    });
  };

  const closeSnackbar = (id?: string) => {
    if (id) {
      setStack((prevStack) => {
        return prevStack.map((item) => {
          if (item.id === id) {
            return { ...item, terminate: true };
          }
          return item;
        });
      });
      return;
    }
    setStack((prevStack) => {
      if (prevStack.length === 0) {
        return prevStack;
      }
      prevStack[0].terminate = true;
      return [...prevStack];
    });
  };

  const updateSettings = (newSettings: SnackbarSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  const terminate = (index: number, duration: number) => {
    setTimeout(() => {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        const item = newStack[index];

        newStack.splice(index, 1);
        return newStack;
      });
    }, duration);
  };

  const renderSnackbar = (snackbar: SnackbarData) => {
    return (
      <Snackbar
        key={snackbar.id}
        {...snackbar}
        onRequestClose={() => closeSnackbar(snackbar.id)}
      />
    );
  };

  return (
    <SnackbarContext.Provider
      value={{
        open: openSnackbar,
        close: closeSnackbar,
        updateSettings,
      }}
    >
      {children}
      <div className={mergeClassNames([styles.SnackbarStack, positionClass])}>
        {stack.map(renderSnackbar)}
      </div>
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
  type SnackbarData,
  type SnackbarStoreItem,
  type SnackbarContextType,
};

export default SnackbarProvider;
