import { create } from 'zustand';
import { useAuthStore } from './auth';
import { useChatStore } from './chat';

type State = {
  appVersion: string,
  cleanUp: () => void,
}

export const useAppStore = create<State>(() => {
  return {
    appVersion: '0.0.1',
    cleanUp: () => {
      useAuthStore.getState().actions.cleanUp();
      useChatStore.getState().actions.cleanUp();
    }
  }
});