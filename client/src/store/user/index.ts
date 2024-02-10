import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { StoreUser } from "@/models";

// Define a type for the slice state
interface UserState extends StoreUser {}

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
    upadteUser: (state, action: PayloadAction<Partial<StoreUser>>) => {
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

export const { upadteUser, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState): string => state.user.userId;
export const selectUserName = (state: RootState): string => state.user.fullname;
export const selectUser = (state: RootState): StoreUser => state.user;

export default userSlice.reducer;
