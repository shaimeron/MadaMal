import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { UserDto } from '../../models';

// Define a type for the slice state
interface UserState {
  userId: string;
  email: string;
  fullname: string;
  
  imageUrl?: string;
}

// Define the initial state using that type
const initialState: UserState = {
  userId: '',
  email: '',
  fullname: '',
  
  imageUrl: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state,action: PayloadAction<UserDto> ) => ({
     ...state,
     userId: action.payload._id,
     email: action.payload.email,
     fullname: action.payload.fullname,
     imageUrl: action.payload.imageUrl ?? '',
    }),
  },
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.user.userId

export default userSlice.reducer