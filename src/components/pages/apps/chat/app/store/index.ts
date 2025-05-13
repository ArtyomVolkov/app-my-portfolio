import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';

import { FBAuth, FBStore } from '../firebase';

import { getErrorMessage } from '@utils/common';
type TActions = {
  setUser: (data) => void,
  subscribeAuthStateChanged: () => Function;
  subscribeChatsChanged: () => Function,
  onSignUp: (email: string, password: string) => Promise<string | null>,
  onSignIn: (email: string, password: string) => Promise<string | null>,
  onSignOut: () => Promise<void>,
  onSignInWithGoogle: () => Promise<string | null>
}

type State = {
  loading: boolean,
  user: any, // todo
  activeChat: [],
  chats: Array<any> // todo,
  actions: TActions,
}

export const useStore = create<State>((set, get) => ({
  loading: true,
  user: null,
  activeChat: null,
  chats: [],
  actions: {
    subscribeAuthStateChanged: () => {
      const actions = get().actions;

      return onAuthStateChanged(FBAuth, actions.setUser, () => actions.setUser(null));
    },
    subscribeChatsChanged: () => {
      const { user } = get();

      if (!user) {
        return;
      }
      const docRef = doc(FBStore, 'chats', user.uid);

      return onSnapshot(docRef, (doc) => {
        set({ chats: doc.data().data });
      });
    },
    setUser: async (authData) => {
      try {
        if (!authData) {
          set({user: null, loading: false});
          return;
        }
        const docRef = doc(FBStore, 'users', authData.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          set({user: userData, loading: false});
          return;
        }
        const userData = {
          uid: authData.uid,
          email: authData.email,
          displayName: authData.displayName,
          emailVerified: authData.emailVerified,
          createdAt: authData.metadata.createdAt,
          lastLoginAt: authData.metadata.lastLoginAt,
          photoURL: authData.photoURL,
          phoneNumber: authData.phoneNumber,
          settings: {},
        };
        // create user collection
        await setDoc(docRef, userData);
        // create chat collection
        await setDoc(doc(FBStore, 'chats', authData.uid), {
          data: []
        });
        set({user: userData, loading: false});
      } catch (e) {
        set({loading: false, user: null});
      }
    },
    onSignUp: async (email, password) => {
      try {
        await createUserWithEmailAndPassword(FBAuth, email, password);
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onSignIn: async (email, password) => {
      try {
        await signInWithEmailAndPassword(FBAuth, email, password);
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onSignOut: async () => {
      return await signOut(FBAuth);
    },
    onSignInWithGoogle: async () => {
      try {
        await signInWithPopup(FBAuth, new GoogleAuthProvider());
      } catch (e) {
        return getErrorMessage(e);
      }
    },
  },
}));