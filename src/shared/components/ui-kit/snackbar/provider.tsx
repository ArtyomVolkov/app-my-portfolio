import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

import Snackbar from "./snackbar";
import snackbarService from "./service";
import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

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

type Color = "default" | "success" | "danger" | "warning" | "info";

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
  color?: Color;
  onClose?: () => void;
  classes?: {
    root?: string;
    message?: string;
  };
};

type SnackbarProviderProps = {
  children: React.ReactNode;
  settings?: SnackbarSettings;
};

type SnackbarContextType = {
  open: (props: SnackbarProps, settings?: Partial<SnackbarSettings>) => void;
  close: (id?: string) => void;
  updateSettings?: (settings: SnackbarSettings) => void;
};

type SnackbarStack = {
  data: Array<SnackbarData>;
  settings: SnackbarSettings;
};

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  settings = DefaultSettings,
}) => {
  const [stack, setStack] = useState<SnackbarStack>({
    data: [],
    settings: {
      position: settings.position || DefaultSettings.position,
      stackLimit: settings.stackLimit || DefaultSettings.stackLimit,
      terminateDuration:
        settings.terminateDuration || DefaultSettings.terminateDuration,
    },
  });

  useEffect(() => {
    snackbarService.init({
      open: openSnackbar,
      close: closeSnackbar,
    });

    return () => {
      snackbarService.destroy();
    };
  }, []);

  useEffect(() => {
    stack.data.forEach((snackbar, index) => {
      if (snackbar.terminate) {
        terminate(index, stack.settings.terminateDuration);
      }
    });
  }, [stack]);

  const positionClass = useMemo(() => {
    switch (stack.settings.position) {
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
  }, [stack.settings.position]);

  const openSnackbar = (
    data?: SnackbarData,
    settings?: Partial<SnackbarSettings>,
  ) => {
    const id = Math.random().toString(36);

    setStack((prevStack) => {
      if (prevStack.data.length >= prevStack.settings.stackLimit) {
        prevStack.data.shift();
        return {
          data: [...prevStack.data, { id, ...data }],
          settings: {
            ...prevStack.settings,
            ...settings,
          },
        };
      }
      return {
        data: [...prevStack.data, { id, ...data }],
        settings: {
          ...prevStack.settings,
          ...settings,
        },
      };
    });
  };

  const closeSnackbar = (id?: string) => {
    if (id) {
      setStack((prevStack) => {
        return {
          ...prevStack,
          data: prevStack.data.map((item) => {
            if (item.id === id) {
              return { ...item, terminate: true };
            }
            return item;
          }),
        };
      });
      return;
    }
    setStack((prevStack) => {
      if (prevStack.data.length === 0) {
        return prevStack;
      }
      prevStack.data[0].terminate = true;
      return { ...prevStack };
    });
  };

  const terminate = (index: number, duration: number) => {
    setTimeout(() => {
      setStack((prevStack) => {
        const newStack = [...prevStack.data];

        newStack.splice(index, 1);
        return { ...prevStack, data: newStack };
      });
    }, duration);
  };

  const renderSnackbar = (snackbar: SnackbarData) => {
    return (
      <Snackbar
        key={snackbar.id}
        onRequestClose={() => closeSnackbar(snackbar.id)}
        {...snackbar}
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
      <div className={mergeClassNames([styles.SnackbarStack, positionClass])}>
        {stack.data.map(renderSnackbar)}
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
  type SnackbarSettings,
  type SnackbarStoreItem,
  type SnackbarContextType,
};

export default SnackbarProvider;
