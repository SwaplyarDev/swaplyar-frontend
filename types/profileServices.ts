export interface ProfileResponse {
  id: string;
  user: EditUser;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  identification: string | null;
  phone: string | null;
  birthday: string | null;
  age: number | null;
  gender: string;
  lastActivity: string | null;
  socials: {
    id: string;
    whatsappNumber: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    twitterX: string;
    snapchat: string;
    linkedin: string;
    youtube: string;
    pinterest: string;
  };
  profilePictureUrl: string | null;
}

export interface UpdatePictureResponse {
  message: string;
  result: {
    imgUrl: string;
  };
}

export interface UpdateNicknameResponse {
  id: string;
  user: {
    id: string;
    role: string;
    termsAccepted: boolean;
    createdAt: string;
    validatedAt: string | null;
    isActive: boolean;
    isValidated: boolean;
    userValidated: boolean;
    refreshToken: string;
  };
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  identification: string | null;
  phone: string | null;
  birthday: string | null;
  age: number | null;
  gender: string;
  lastActivity: string | null;
  profilePictureUrl: string;
}

export interface UpdatePhoneResponse {
  id: string;
  user: {
    id: string;
    role: string;
    termsAccepted: boolean;
    createdAt: string;
    validatedAt: string | null;
    isActive: boolean;
    isValidated: boolean;
    userValidated: boolean;
    refreshToken: string;
  };
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  identification: string | null;
  phone: string | null;
  birthday: string | null;
  age: number | null;
  gender: string;
  lastActivity: string | null;
  profilePictureUrl: string;
}

export interface UpdateProfileResponse {
  id: string;
  user: EditUser;
  firstName: string;
  lastName: string;
  nickName?: string;
  nickname?: string;
  email: string;
  identification: string | null;
  phone: string | null;
  birthday: string | null;
  age: number | null;
  gender: string | null;
  lastActivity: string | null;
  profilePictureUrl: string | null;
}

export interface EditUser {
  id: string;
  locations?: EditUserLocation[];
  role: string;
  termsAccepted: boolean;
  createdAt: string;
  validatedAt: string | null;
  isActive: boolean;
  isValidated: boolean;
  userValidated: boolean;
}

export interface EditUserLocation {
  id: string;
  country: string;
  department: string;
  postalCode: string;
  date: string;
}