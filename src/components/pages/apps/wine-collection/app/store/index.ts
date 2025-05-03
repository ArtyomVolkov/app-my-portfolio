import { create } from 'zustand';
import { doc, getDoc, updateDoc, deleteDoc, setDoc, addDoc, collection, onSnapshot } from "firebase/firestore";
import { FBAuth, FBStore, DBName } from '../firebase';

import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { TWine } from '@pages/apps/wine-collection/app/dto';

import { getErrorMessage } from '@utils/common';

type TState = {
  loading: boolean,
  user: {
    name: string,
    uid: string,
    displayName: string,
    email: string,
    emailVerified: boolean,
    lastLoginAt: string,
    createdAt: string,
    phoneNumber: string,
    photoURL: string,
  },
  wineList: Array<TWine>,
  wineDetails?: TWine,
  actions: TActions
};

type TActions = {
  setUser: (data) => void,
  onSignUp: (email: string, password: string) => Promise<string|null>,
  onSignIn: (email: string, password: string) => Promise<string|null>,
  onSignInWithGoogle: () => Promise<string|null>,
  onResetPassword: (email: string) => Promise<string|null>,
  onSignOut: () => void,
  onSubscribeWineList?: (pathSegments: Array<string>) => () => void;
  onAddNewWine: (data) => Promise<string|null>,
  onDeleteWine: (id: string) => Promise<string|null>,
  getWine: (id: string) => Promise<string|null>,
  onUpdateWine: (data: TWine) => Promise<string|null>,
};

export const useStore = create<TState>((set, get) => ({
  loading: true,
  user: null,
  wineList: null,
  actions: {
    setUser: async (data) => {
      try {
        if (!get().user) {
          const docRef = doc(FBStore, DBName, data.uid);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            // create an account data in db
            await setDoc(docRef, {
              uid: data.uid,
              email: data.email,
              name: data.displayName,
            });
          }
        }
        set({ user: data, loading: false });
      } catch (e) {
        set({ loading: false });
      }
    },
    onSignIn: async (email: string, password: string) => {
      try {
        await signInWithEmailAndPassword(FBAuth, email, password);
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onSignUp: async (email, password) => {
      try {
        await createUserWithEmailAndPassword(FBAuth, email, password);
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onSignInWithGoogle: async () => {
      try {
        await signInWithPopup(FBAuth, new GoogleAuthProvider());
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onResetPassword: async (email: string) => {
      try {
        await sendPasswordResetEmail(FBAuth, email);
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onSignOut: async () => {
      await signOut(FBAuth);
    },
    onSubscribeWineList: (pathSegments) => {
      return onSnapshot(collection(FBStore, DBName, ...pathSegments), (doc) => {
        const wineList = [];

        doc.forEach((item) => wineList.push({ id: item.id, ...item.data()}));
        set({ wineList });
      });
    },
    onAddNewWine: async (data) => {
      try {
        const user = get().user;
        const docRef = doc(FBStore, DBName, user.uid);

        await addDoc(collection(docRef, 'wine-list'), data);
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onUpdateWine: async (data) => {
      try {
        const user = get().user;
        const docRef = doc(FBStore, DBName, user.uid);

        await updateDoc(doc(collection(docRef, 'wine-list'), data.id), data);
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onDeleteWine: async (id) => {
      try {
        const user = get().user;
        const docRef = doc(FBStore, DBName, user.uid);

        await deleteDoc(doc(collection(docRef, 'wine-list'), id));
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    getWine: async (id: string) => {
      try {
        const { user, wineList } = get();
        const wineData = wineList?.find((item) => item.id === id);

        if (wineData) {
          set({ wineDetails: wineData });
          return;
        }
        const docRef = doc(FBStore, DBName, user.uid);

        const wine = await getDoc(doc(docRef, 'wine-list', id));
        const data = wine.data();

        if (!data) {
          set({ wineDetails: null });
          return 'Wine Not found';
        }
        set({ wineDetails: data as TWine })
      } catch (e) {
        return getErrorMessage(e);
      }
    }
  }
}));