import { create } from 'zustand';

export type Variant = 'default' | 'success' | 'warning' | 'error' | 'info';

type Snackbar = {
  key: string|number,
  content: string|JSX.Element,
  variant?: Variant,
  autoHide?: number,
  closeButton?: boolean,
  hide?: boolean,
  autoCloseTimerId?: NodeJS.Timeout,
}

type State = {
  stack: Array<Snackbar>,
  open: (data: Snackbar) => void;
  close: (key: string|number) => void;
}

export const ANIMATION_DURATION = 300;

export const useSnackbar = create<State>((set, get) => ({
  stack: [],
  open: (message) => {
    const snackbar = get().stack.find(({key}) => key === message.key);

    if (snackbar) {
      return;
    }
    const messageData = {
      ...message
    };

    if (message.autoHide > 0) {
      messageData.autoCloseTimerId = setTimeout(() => {
        get().close(message.key);
      }, message.autoHide)
    }

    set({
      stack: [
        ...get().stack,
        messageData,
      ],
    });
  },
  close: (key) => {
    const snackbar = get().stack.find((item) => item.key === key);

    if (snackbar.autoCloseTimerId) {
      clearTimeout(snackbar.autoCloseTimerId);
    }
    set({
      stack: get().stack.map((item) => {
        if (item.key !== key) {
          return item;
        }
        return {
          ...item,
          hide: true,
        };
      }),
    });
    setTimeout(() => {
      set({stack: get().stack.filter((item) => item.key !== key)});
    }, ANIMATION_DURATION);
  },
}));
