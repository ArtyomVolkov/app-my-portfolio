import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { enqueueSnackbar } from 'notistack';
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

import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { TUser, TWine } from '@pages/apps/wine-collection/app/dto';

import { getErrorMessage } from '@utils/common';

type TState = {
  loading: boolean,
  user: TUser | null,
  wineList: {
    loading: boolean,
    data: Array<TWine>,
    search?: string,
    filters?: {
      [key: string]: []|string|any
    }
  }
  wineDetails?: TWine,
  actions: TActions,
};

type TActions = {
  setUser: (data) => void,
  onSignUp: (email: string, password: string) => Promise<string | null>,
  onSignIn: (email: string, password: string) => Promise<string | null>,
  onSignInWithGoogle: () => Promise<string | null>,
  onResetPassword: (email: string) => Promise<string | null>,
  onSignOut: () => void,
  onSubscribeWineList?: (pathSegments: Array<string>) => () => void;
  onAddNewWine: (data) => Promise<string | null>,
  onDeleteWine: (id: string) => Promise<string | null>,
  getWine: (id: string) => Promise<string | null>,
  onUpdateWine: (data: TWine) => Promise<string | null>,
  subscribeAuthStateChanged: () => void;
  onDownloadWineList: () => void;
  onUpdateWineListFilter: (data) => void,
  onClearAllWineListFilter: () => void,
  onUploadWineList: () => Promise<string | null>;
  onSearchWine: (value: string) => void,
  onClearAppData?: () => void;
};

export const useStore = create<TState>((set, get) => ({
  loading: true,
  user: null,
  wineList: {
    loading: true,
    data: null,
    search: '',
    filters: {
    }
  },
  actions: {
    subscribeAuthStateChanged: async () => {
      const actions = get().actions;

      onAuthStateChanged(FBAuth, actions.setUser, () => actions.setUser(null));
    },
    setUser: async (authData) => {
      try {
        if (get().user && !authData) {
          set({user: null});
          return;
        }
        if (get().user) {
          set({loading: false});
          return;
        }
        const docRef = doc(FBStore, 'users', authData.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData: TUser = docSnap.data() as TUser;
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
        // create new account
        await setDoc(docRef, userData);
        set({user: userData, loading: false});
      } catch (e) {
        set({loading: false});
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

      get().actions.onClearAppData();
      set({loading: false});
    },
    onClearAppData: () => {
      set({
        loading: true,
        user: null,
        wineDetails: null,
        wineList: {
          loading: true,
          data: null,
        },
      });
    },
    onSubscribeWineList: (pathSegments) => {
      return onSnapshot(collection(FBStore, 'users', ...pathSegments), (doc) => {
        const wineList = [];

        doc.forEach((item) => wineList.push({id: item.id, ...item.data()}));
        wineList.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1);
        set({wineList: {loading: false, data: wineList}});
      });
    },
    onAddNewWine: async (data) => {
      try {
        const user = get().user;
        const docRef = doc(FBStore, 'users', user.uid);

        await addDoc(collection(docRef, 'wine-list'), {
          ...data,
          createdAt: Date.now(),
          updatedAt: null,
        });
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onUpdateWine: async (data) => {
      try {
        const user = get().user;
        const docRef = doc(FBStore, 'users', user.uid);

        await updateDoc(doc(collection(docRef, 'wine-list'), data.id), {
          ...data,
          updatedAt: Date.now(),
        });
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onDeleteWine: async (id) => {
      try {
        const user = get().user;
        const docRef = doc(FBStore, 'users', user.uid);

        await deleteDoc(doc(collection(docRef, 'wine-list'), id));
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    getWine: async (id: string) => {
      try {
        const {user, wineList} = get();
        const wineData = wineList.data?.find((item) => item.id === id);

        if (wineData) {
          set({wineDetails: wineData});
          return;
        }
        const docRef = doc(FBStore, 'users', user.uid);

        const wine = await getDoc(doc(docRef, 'wine-list', id));
        const data = wine.data();

        if (!data) {
          set({wineDetails: null});
          return 'Wine Not found';
        }
        set({wineDetails: data as TWine})
      } catch (e) {
        return getErrorMessage(e);
      }
    },
    onDownloadWineList: () => {
      const downloadAnchorNode = document.createElement('a');
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(get().wineList.data));

      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', 'wine-list.json');
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    onUploadWineList: async () => {
      return new Promise((res, rej) => {
        try {
          const fileInputNode: HTMLInputElement = document.createElement('input');

          fileInputNode.setAttribute('type', 'file');
          fileInputNode.setAttribute('accept', '.json');
          fileInputNode.addEventListener('change', async () => {
            const file = fileInputNode.files[0];
            const importData = JSON.parse(await file.text());
            const batch = writeBatch(FBStore);
            const docRef = doc(FBStore, 'users', get().user.uid);
            const collectionRef = collection(docRef, 'wine-list');
            const list = await getDocs(collectionRef);
            const ids = [];
            let itemsCount = 0;

            list.forEach((item) => ids.push(item.data().id));
            importData.forEach((item) => {
              if (ids.includes(item.id)) {
                return;
              }
              itemsCount++;
              batch.set(doc(collectionRef, item.id), {
                ...item,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              });
            });
            if (!itemsCount) {
              enqueueSnackbar({
                variant: 'info',
                message: 'There are already wines in your collection that you have imported.',
                autoHideDuration: 3000
              });
              return res(null);
            }
            await batch.commit();
            enqueueSnackbar({
              autoHideDuration: 2000,
              variant: itemsCount === importData.length ? 'success' : 'info',
              message: `Import wine success.
               ${itemsCount} wine${itemsCount > 1 ? 's' : ''} ${itemsCount > 1 ? 'were' : 'was'} added`,
            });
            res(null);
          });
          fileInputNode.click();
        } catch (e) {
          rej(e);
          enqueueSnackbar({
            variant: 'error',
            autoHideDuration: 2000,
            message: getErrorMessage(e),
          });
        }
      });
    },
    onSearchWine: (value) => {
      set({
        wineList: {
          ...get().wineList,
          search: value
        }
      });
    },
    onUpdateWineListFilter: (data) => {
      set({
        wineList: {
          ...get().wineList,
          filters: {
            ...data
          }
        }
      })
    },
    onClearAllWineListFilter: () => {
      set({
        wineList: {
          ...get().wineList,
          search: '',
          filters: {}
        }
      })
    }
  },
}));