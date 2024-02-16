export interface UserLoginDeatils {
  email: string;
  password: string;
}

export interface UserUpdateDto {
  fullname: string;
  imageUrl?: string;
}

export type UserRegister = UserUpdateDto & UserLoginDeatils;

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
