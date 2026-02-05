import { ModalContextType, ModalProps } from "./provider";

class ModalService implements ModalContextType {
  modalContext: ModalContextType = null;

  init(context: ModalContextType) {
    if (this.modalContext) {
      console.warn("ModalService is already initialized.");
      return;
    }
    this.modalContext = context;
  }

  destroy() {
    this.modalContext = null;
  }

  open(name: string, data: ModalProps) {
    if (!this.modalContext) {
      console.error("ModalService is not initialized. Check if ModalProvider is mounted.");
      return;
    }
    this.modalContext.open(name, data);
  }

  close(name: string) {
    if (!this.modalContext) {
      console.error("ModalService is not initialized. Check if ModalProvider is mounted.");
      return;
    }
    this.modalContext.close(name);
  }
}

const modalService = new ModalService();

export default modalService;
