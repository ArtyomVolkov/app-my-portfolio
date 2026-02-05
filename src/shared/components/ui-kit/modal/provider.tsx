import React, { useState, useEffect, createContext, useContext } from "react";

import Modal from "./modal";
import modalService from "./service";

const DefaultSettings = {
  animationDuration: 500,
};

type ModalStoreData = {
  name: string;
  style?: React.CSSProperties;
  terminate?: boolean; // if true, modal will be removed from DOM on close (for animations)
} & Omit<ModalProps, "title">;

type ModalProps = {
  header?: string | React.ReactNode | React.ReactNode[];
  body?: string | React.ReactNode | React.ReactNode[];
  animationDuration?: number;
  movable?: boolean;
  backDropClose?: boolean;
  onClose?: (
    e: React.MouseEvent<HTMLDivElement>,
    reason: "backdrop" | "closeButton" | "escape",
  ) => void;
  classes?: {
    root?: string;
    overlay?: string;
    modalBox?: string;
  };
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalStoreData[]>([]);

  useEffect(() => {
    modalService.init({ open: openModal, close: closeModal });

    return () => {
      modalService.destroy();
    }
  }, []);

  useEffect(() => {
    modals.forEach((modal) => {
      if (modal.terminate) {
        terminate(
          modal.name,
          modal.animationDuration ?? DefaultSettings.animationDuration,
        );
      }
    });
  }, [modals]);

  const openModal = (name: string, data: ModalProps) => {
    setModals((prevModals) => {
      const existingModal = prevModals.find((modal) => modal.name === name);
      if (existingModal) {
        console.warn(`Modal with name "${name}" is already opened.`);
        return prevModals;
      }
      return [
        ...prevModals,
        {
          name,
          terminate: false,
          animationDuration: data.animationDuration ?? DefaultSettings.animationDuration,
          ...data,
        },
      ];
    });
  };

  const closeModal = (name: string) => {
    setModals((prevModals) => {
      return prevModals.map((modal) => {
        if (modal.name === name) {
          return { ...modal, terminate: true };
        }
        return modal;
      });
    });
  };

  const terminate = (name: string, duration: number) => {
    setTimeout(() => {
      setModals((prevModals) =>
        prevModals.filter((modal) => modal.name !== name),
      );
    }, duration);
  };

  const renderModal = (modal: ModalStoreData, index: number) => {
    return (
      <Modal
        key={modal.name}
        style={{
          zIndex: 1000 + index,
        }}
        {...modal}
      />
    );
  };

  return (
    <ModalContext.Provider value={{ open: openModal, close: closeModal }}>
      {children}
      {modals.map(renderModal)}
    </ModalContext.Provider>
  );
};

type ModalContextType = {
  open?: (name: string, data: ModalProps) => void;
  close?: (name: string) => void;
};

const ModalContext = createContext<ModalContextType>({});

const useModal = () =>  {
  const context = useContext(ModalContext);

  if (!context || (!context.open && !context.close)) {
    console.error("useModal must be used within a ModalProvider");
    return {
      open: () => {
        console.error("ModalContext is not available.");
      },
      close: () => {
        console.error("ModalContext is not available.");
      },
    };
  }
  return context;
}

export {
  useModal,
  ModalContext,
  type ModalProps,
  type ModalStoreData,
  type ModalContextType,
};

export default ModalProvider;
