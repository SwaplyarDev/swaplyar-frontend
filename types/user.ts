export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identification: string;
  phone: string;
  birthday: string;
  age: number;
  gender: string;
  lastActivity: string;
  profilePictureUrl: string;
  [key: string]: string | number; // Permite otras propiedades adicionales
}

export interface RewardsLedger {
  id: string;
  starsCount: number;
  progressAmount: number;
  timesGranted: number;
}

export interface User {
  id: string;
  role: string;
  termsAccepted: boolean;
  isActive: boolean;
  createdAt: string;
  validatedAt: string;
  profile: Profile;
  isValidated: boolean;
  rewardsLedger: RewardsLedger;
  refreshToken: string;
}
