export type AsyncData<T> = {
  loading: boolean;
  updating?: boolean;
  error?: boolean;
  data: T;
};

export type User = {
  uid: string;
  createdAt: string;
  email: string;
  emailVerified: true;
  lastLoginAt: string;
  displayName?: string;
  phoneNumber?: string
  photoURL?: string;
  settings?: {}
}

export type SearchUser = Omit<User, 'uid'|'emailVerified'|'lastLoginAt'|'phoneNumber'|'settings'>;

export type UserChat = {
  chatId: string;
  receiver: string;
  lastMessage: string;
  updatedAt: number;
  user: User;
}

export type Message = {
  text: string;
  sender: string;
  createdAt: number;
  avatar?: string;
  image?: string;
}

export type Chat = UserChat & {
  createdAt: string;
  messages: Array<Message>;
}