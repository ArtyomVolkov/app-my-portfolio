export type TAuth = {
  uid: string,
  email: string,
  displayName: string,
  emailVerified: boolean,
  photoURL?: string,
  phoneNumber?: string,
}

export type TUser = TAuth & {
  createdAt: string,
  lastLoginAt: string,
  settings?: {
  }
}

export type TWine = {
  id: string,
  brand: string,
  fullName: string,
  color: string,
  country: string
  year: string|number,
  rate: number,
  grape: string,
  imageURL?: string,
  region?: string,
  alcohol?: string,
  agedInBarrel?: string,
  match?: string,
  aroma?: string,
  taste?: string,
  price?: string,
  description?: string
}