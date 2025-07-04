import { create } from 'zustand';

type Modal = {
  key: string|number,
  content: JSX.Element,
  hide?: boolean;
}

type State = {
  modals: Array<Modal>,
  open: (data: Modal) => void;
  close: (key: string|number) => void;
}

export const ANIMATION_DURATION = 500;

export const useModal = create<State>((set, get) => ({
  modals: [],
  open: (modalData) => {
    const modal = get().modals.find(({key}) => key === modalData.key);

    if (!modal) {
      set({
        modals: [
          ...get().modals,
          modalData,
        ],
      })
    }
  },
  close: (key) => {
    set({
      modals: get().modals.map((item) => {
        if (item.key !== key) {
          return item;
        }
        return {
          hide: true,
          ...item,
        };
      }),
    });
    setTimeout(() => {
      set({modals: get().modals.filter((item) => item.key !== key)});
    }, ANIMATION_DURATION);
  },
}));
