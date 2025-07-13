import { create } from 'zustand';
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  query,
  where,
  collection,
  getDocs,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { useAuthStore } from './auth';
import { useSnackbar } from './snackbar';
import { FBStore } from '../firebase';

import Cloudinary from '../services/cloudinary';
import { SearchUser, Chat, UserChat, AsyncData } from '../types/user';
import { getErrorMessage } from '@utils/common';

type State = {
  loading: boolean,
  chat: AsyncData<Chat>,
  chats: AsyncData<Array<UserChat>>,
  activeChatId: string;
  actions: {
    onInitChatData: () => Promise<void>,
    setActiveChat: (chatId: string) => void,
    subscribeActiveChat: (chatId: string) => Function,
    subscribeChatList: () => Function,
    onSearchUser: (email: string) => Promise<SearchUser | null>,
    onCreateChat: (user: SearchUser) => Promise<string|void>,
    onSendMessage: (text?: string, file?: File) => Promise<void>,
    cleanUp: () => void,
  }
}

const InitialState = {
  loading: true,
  activeChatId: '',
  chat: {
    loading: true,
    data: null,
  },
  chats: {
    loading: true,
    data: null
  },
}

const delay = (timeout = 500) => (
  new Promise((res) => setTimeout(res, timeout))
)

export const useChatStore = create<State>((set, get) => {
  return {
    ...InitialState,
    actions: {
      subscribeChatList: () => {
        const currentUser = useAuthStore.getState().user;

        return onSnapshot(
          doc(FBStore,'user-chats', currentUser.email),
          async (resp) => {
            const items = resp.data();
            const requests = items.data.map(async (item) => {
              const userDocRef = doc(FBStore, 'users', item.receiver);
              const userDocSnap = await getDoc(userDocRef);
              const user = userDocSnap.data();

              return {
                ...item,
                user
              }
            });
            const chats = await Promise.all(requests);
            const activeChatId = get().activeChatId;
            const sortedList = chats.sort((f, s) => s.updatedAt - f.updatedAt);

            set({
              activeChatId: !activeChatId ? sortedList[0].chatId : activeChatId,
              chats: {
                loading: false,
                data: sortedList
              }
            })
          }
        )
      },
      subscribeActiveChat: (chatId) => {
        return onSnapshot(
          doc(FBStore, 'chats', chatId),
          async (resp) => {
            const chatData = resp.data();
            const activeChat = get().chats.data.find((item) => item.chatId === chatId);

            await delay(300);
            set({
              chat: {
                loading: false,
                data: {
                  ...activeChat,
                  createdAt: chatData.createdAt.toDate(),
                  messages: chatData.messages,
                  lastMessage: chatData.messages[chatData.messages.length-1]?.text
                }
              }
            });
          }
        );
      },
      onInitChatData: async () => {
        const user = useAuthStore.getState().user;

        if (!user) {
          return;
        }
        try {
          const userDocRef = doc(FBStore, 'users', user.email);
          const usersDocSnap = await getDoc(userDocRef);

          if (!usersDocSnap.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              emailVerified: user.emailVerified,
              createdAt: user.createdAt,
              lastLoginAt: user.lastLoginAt,
              photoURL: user.photoURL,
              phoneNumber: user.phoneNumber,
              settings: {},
            });
          }

          const userChatsDocRef = doc(FBStore, 'user-chats', user.email);
          const userChatsDocSnap = await getDoc(userChatsDocRef);

          if (!userChatsDocSnap.exists()) {
            await setDoc(doc(FBStore, 'user-chats', user.email), {
              data: []
            });
          }
        } catch (e) {
          set({ loading: false });
          useSnackbar.getState().open({
            key: 'chat-error',
            variant: 'error',
            content: e.toString(),
            closeButton: true,
          });
        }
      },
      onSearchUser: async (email): Promise<SearchUser|null> => {
        const currentUser = useAuthStore.getState().user;

        if (currentUser.email === email) {
          return null;
        }
        const usersDocRef = collection(FBStore, 'users');
        const q = query(usersDocRef, where('email', '==', email));

        const docs = await getDocs(q);
        const data = [];

        docs.forEach((item) => {
          data.push(item.data());
        });

        return data.length > 0 ? {
          displayName: data[0].displayName,
          email: data[0].email,
          createdAt: data[0].createdAt,
          photoURL: data[0].photoURL
        }: null;
      },
      onCreateChat: async (user) => {
        const currentUser = useAuthStore.getState().user;
        const userChatsDocRef = collection(FBStore, 'user-chats');
        const chatsDocRef = collection(FBStore, 'chats');
        const newChatDocRef = doc(chatsDocRef);

        try {
          // todo: chek if exists
          await setDoc(newChatDocRef, {
            createdAt: serverTimestamp(),
            messages: []
          });
          // chat for current user
          await updateDoc(doc(userChatsDocRef, currentUser.email), {
            data: arrayUnion({
              chatId: newChatDocRef.id,
              lastMessage: '',
              receiver: user.email,
              updatedAt: Date.now()
            })
          });
          // chat for user
          await updateDoc(doc(userChatsDocRef, user.email), {
            data: arrayUnion({
              chatId: newChatDocRef.id,
              lastMessage: 'Hello, I am interested in conversing with you.',
              receiver: currentUser.email,
              updatedAt: Date.now()
            })
          });
        } catch (e) {
          return getErrorMessage(e);
        }
      },
      setActiveChat: (chatId) => {
        if (!chatId || get().activeChatId === chatId) {
          return;
        }
        set({
          activeChatId: chatId,
          chat: {
            loading: true,
            data: null,
          }
        });
      },
      onSendMessage: async (text, file) => {
        try {
          const currentUser = useAuthStore.getState().user;
          const { activeChatId, chat } = get();
          const chatsDocRef = doc(FBStore, 'chats', activeChatId);
          let imageURL = null;

          if (file) {
            const response = await Cloudinary.upload(file);

            if (response.errorMessage) {
              useSnackbar.getState().open({
                key: 'upload-image',
                variant: 'error',
                content: response.errorMessage,
                closeButton: true,
                autoHide: 3000,
              });
            }
            imageURL = response.data;
          }
          if (!text && !imageURL) {
            return;
          }
          await updateDoc(chatsDocRef, {
            messages: arrayUnion({
              text,
              sender: currentUser.email,
              avatar: currentUser.photoURL,
              createdAt: Date.now(),
              ...(imageURL ? { image: imageURL } : {})
            })
          });
          for (const item of [currentUser, chat.data.user]) {
            const userChatsRef = doc(FBStore, "user-chats", item.email);
            const userChatsSnapshot = await getDoc(userChatsRef);

            if (!userChatsSnapshot.exists()) {
              continue;
            }
            const userChatsData = userChatsSnapshot.data();
            const userChat = userChatsData.data.find((item) => item.chatId === activeChatId);

            if (!userChat) {
              continue;
            }
            userChat.lastMessage = text;
            userChat.updatedAt = Date.now();

            await updateDoc(userChatsRef, {
              data: userChatsData.data,
            });
          }
        } catch (e) {
          useSnackbar.getState().open({
            key: 'send-message-error',
            variant: 'error',
            content: e.toString(),
            closeButton: true,
            autoHide: 3000,
          });
        }
      },
      cleanUp: () => {
        set({ ...InitialState });
      }
    }
  }
});
