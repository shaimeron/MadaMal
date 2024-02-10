export interface UserLoginDeatils {
  email: string;
  password: string;
}

export interface UserRegister extends UserLoginDeatils {
  fullname: string;
  imageUrl?: string;
}

interface BasicUserData {
  email: string;
  fullname: string;
  imageUrl?: string;
}

export interface StoreUser extends BasicUserData {
  userId: string;
}
export interface UserDto extends BasicUserData {
  _id: string;
}
