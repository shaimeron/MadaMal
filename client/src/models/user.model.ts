export interface UserLoginDeatils {
    email: string;
    password: string;
}

export interface UserRegister extends UserLoginDeatils {
    fullname: string;

    imageUrl?: string;
}

