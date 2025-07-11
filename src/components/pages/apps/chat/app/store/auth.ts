import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { FBAuth } from '../firebase';

import { getErrorMessage } from '@utils/common';

const AUTH_ERROR = {
  'auth/email-already-in-use': 'Email already in use',
  'auth/invalid-credential': 'Invalid credentials'
}

type User = {
  uid: string,
  email: string,
  displayName: string,
  emailVerified: boolean,
  createdAt: string,
  lastLoginAt: string,
  photoURL?: string,
  phoneNumber?: string,
}

type TActions = {
  subscribeAuthStateChanged: () => Function;
  onSignUp: (email: string, password: string) => Promise<string | null>,
  onSignIn: (email: string, password: string) => Promise<string | null>,
  onSignOut: () => Promise<void>,
  onSignInWithGoogle: () => Promise<string | null>,
  onSendEmailVerification: () => Promise<string|null>,
  cleanUp: () => void,
}

type State = {
  loading: boolean,
  user: User,
  actions: TActions,
}

export const useAuthStore = create<State>((set) => ({
  loading: true,
  user: null,
  actions: {
    subscribeAuthStateChanged: () => {
      return onAuthStateChanged(FBAuth, (user) => {
        if (!user) {
          set({ user: null, loading: false });
          return;
        }
        set({
          loading: false,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            createdAt: user.metadata.creationTime,
            lastLoginAt: user.metadata.lastSignInTime,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
          }
        });
      }, () => set({ user: null, loading: false }));
    },
    onSignUp: async (email, password) => {
      try {
        const resp = await createUserWithEmailAndPassword(FBAuth, email, password);

        if (!resp.user.emailVerified) {
          await sendEmailVerification(resp.user);
        }
      } catch (e) {
        return getErrorMessage(e, AUTH_ERROR);
      }
    },
    onSignIn: async (email, password) => {
      try {
        await signInWithEmailAndPassword(FBAuth, email, password);
      } catch (e) {
        return getErrorMessage(e, AUTH_ERROR);
      }
    },
    onSignOut: async () => {
      await signOut(FBAuth);
    },
    onSignInWithGoogle: async () => {
      try {
        await signInWithPopup(FBAuth, new GoogleAuthProvider());
      } catch (e) {
        return getErrorMessage(e, AUTH_ERROR);
      }
    },
    onSendEmailVerification: async () => {
      try {
        await sendEmailVerification(FBAuth.currentUser);
      } catch (e) {
        return getErrorMessage(e, AUTH_ERROR);
      }
    },
    cleanUp: () => {
      set({
        loading: true,
        user: null,
      });
    }
  },
}));
