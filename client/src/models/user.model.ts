export interface UserLoginDeatils {
    email: string;
    password: string;
}

export interface UserRegister extends UserLoginDeatils {
    fullname: string;

    imageUrl?: string;
}

export interface UserDto {
    _id: string;
    email: string;
    fullname: string;
    imageUrl: string;
}

