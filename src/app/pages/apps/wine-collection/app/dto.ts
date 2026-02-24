import { type User } from 'firebase/auth';

export type TAuth = {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  photoURL?: string;
  phoneNumber?: string;
  metadata: {
    createdAt: string;
    lastLoginAt: string;
  };
};

export type TUserMetaData = {
  metadata: { createdAt: string; lastLoginAt: string };
};

export type TUser = User &
  TUserMetaData & {
    photoURL: string;
    displayName: string;
    createdAt: string;
    lastLoginAt: string;
    settings: {};
  };

export type TWine = {
  id: string;
  brand: string;
  fullName: string;
  color: string;
  country: string;
  year: string | number;
  rate: number;
  grape: string;
  imageURL?: string;
  region?: string;
  alcohol?: string;
  agedInBarrel?: string;
  match?: string;
  aroma?: string;
  taste?: string;
  price?: string;
  description?: string;
  index?: number;
  updatedAt: string;
};

export type TWineData = {
  id: string;
  brand: string;
  fullName: string;
  imageURL: string;
  color: string;
  rate: number;
  grape: string;
  year: string;
  alcohol: string;
  match: string;
  aroma: string;
  taste: string;
  price: string;
  description: string;
  country: string;
};
