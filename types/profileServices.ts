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