import { type ModalContextType, type ModalProps, type ModalStoreData } from './provider';

class ModalService implements ModalContextType {
  modalContext: ModalContextType | null = null;
  modals?: ModalStoreData[];

  init(context: ModalContextType) {
    if (this.modalContext) {
      console.warn('ModalService is already initialized.');
      return;
    }
    this.modalContext = context;
    this.modals = [];
  }

  destroy() {
    this.modalContext = null;
    this.modals = [];
  }

  open(name: string, data: ModalProps) {
    if (!this.modalContext) {
      console.error(
        'ModalService is not initialized. Check if ModalProvider is mounted.'
      );
      return;
    }
    if (!this.modalContext.open) {
      console.error('ModalContext does not have an open method.');
      return;
    }
    this.modalContext.open(name, data);
  }

  updateModals(modals: ModalStoreData[]) {
    this.modals = modals;
  }

  close(name: string) {
    if (!this.modalContext) {
      console.error(
        'ModalService is not initialized. Check if ModalProvider is mounted.'
      );
      return;
    }
    if (!this.modalContext.close) {
      console.error('ModalContext does not have a close method.');
      return;
    }
    this.modalContext.close(name);
  }

  isOpen(name: string): boolean {
    if (!this.modalContext) {
      console.error(
        'ModalService is not initialized. Check if ModalProvider is mounted.'
      );
      return false;
    }
    return this.modals?.some((modal) => modal.name === name) ?? false;
  }
}

const modalService = new ModalService();

export default modalService;
