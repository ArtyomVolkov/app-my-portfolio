import { create } from 'zustand';

export type TModal = {
  name: string,
  open?: boolean,
  content?: JSX.Element,
  props?: {
    onClose?: (name: string) => void
  }
}

type TState = {
  modals: Array<TModal>,
}

type TActions = {
  openModal: (data: TModal) => void,
  closeModal: (name: string) => void,
}

export const useAppModal = create<TState&TActions>((set, get) => ({
  modals: [],
  closeModal: (name) => {
    set({
      modals: get().modals.map((item) =>
        item.name === name ?  {...item, open: false } : item)
    });

    const timerId = setTimeout(() => {
      set({
        modals: get().modals.filter((item) => item.name !== name)
      });
      clearTimeout(timerId);
    }, 700);
  },
  openModal: (data) => {
    const modals = get().modals;

    if (modals.find((item) => item.name === data.name)) {
      return;
    }
    set({ modals: [...modals, { ...data, open: true }] });
  }
}));
