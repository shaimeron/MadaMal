import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "..";
import {StoreUser} from "@/models";

// Define a type for the slice state
interface UserState {
  userData: StoreUser;
}

// Define the initial state using that type
const initialState: UserState = {
  userData: { userId: "", email: "", fullname: "", imageUrl: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    upadteUser: (state, action: PayloadAction<Partial<StoreUser>>) => {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
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

export const selectUser = (state: RootState): StoreUser => state.user.userData;

export const selectUserId = createSelector(
  selectUser,
  (user: StoreUser): string => user.userId
);

export const selectIsUserLoggedIn = createSelector(
  selectUserId,
  (userId: string): boolean => !!userId
);
export const selectUserName = createSelector(
  selectUser,
  (user: StoreUser): string => user.fullname
);

export default userSlice.reducer;
