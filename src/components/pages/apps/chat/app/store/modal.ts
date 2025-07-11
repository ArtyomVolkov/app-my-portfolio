import { create } from 'zustand';

type Snack = {
  key: string|number,
  content: JSX.Element,
  hide?: boolean;
}

type State = {
  stack: Array<Snack>,
  open: (data: Snack) => void;
  close: (key: string|number) => void;
}

export const ANIMATION_DURATION = 500;

export const useSnackbar = create<State>((set, get) => ({
  stack: [],
  open: (data) => {
    const modal = get().stack.find(({key}) => key === data.key);

    if (!modal) {
      set({
        stack: [
          ...get().stack,
          data,
        ],
      })
    }
  },
  close: (key) => {
    set({
      stack: get().stack.map((item) => {
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
      set({stack: get().stack.filter((item) => item.key !== key)});
    }, ANIMATION_DURATION);
  },
}));
