import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

// Define a type for the slice state
interface UserState {
  userId: string;
  email: string;
  fullname: string;
  imageUrl: string;
}

// Define the initial state using that type
const initialState: UserState = {
  userId: "",
  email: "",
  fullname: "",
  imageUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { userId, email, fullname, imageUrl } = action.payload;

      return {
        ...state,
        userId,
        email,
        fullname,
        imageUrl,
      };
    },
    upadteUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export const { upadteUser } = userSlice.actions;
export const { logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserProfileData = (state: RootState) => {
  const { email, fullname, imageUrl } = state.user;

  return { email, fullname, imageUrl };
};

export default userSlice.reducer;
