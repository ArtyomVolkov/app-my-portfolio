import { type SnackbarContextType, type SnackbarSettings, type SnackbarData } from './provider';

class SnackbarService {
  snackbarContext: SnackbarContextType | null = null;

  init(snackbarContext: SnackbarContextType) {
    this.snackbarContext = snackbarContext;
  }

  destroy() {
    this.snackbarContext = null;
  }

  open(data: SnackbarData, settings?: Partial<SnackbarSettings>) {
    if (!this.snackbarContext) {
      console.error("SnackbarService is not initialized. Check if SnackbarProvider is mounted.");
      return;
    }
    this.snackbarContext.open(data, settings);
  }

  updateSettings(data: Partial<SnackbarSettings>) {
    if (!this.snackbarContext) {
      console.error("SnackbarService is not initialized. Check if SnackbarProvider is mounted.");
      return;
    }
    if (!this.snackbarContext.updateSettings) {
      console.error("SnackbarContext does not have updateSettings method.");
      return;
    }
    this.snackbarContext.updateSettings(data);
  }

  close() {
    if (!this.snackbarContext) {
      console.error("SnackbarService is not initialized. Check if SnackbarProvider is mounted.");
      return;
    }
    this.snackbarContext.close();
  }
}

export default new SnackbarService();