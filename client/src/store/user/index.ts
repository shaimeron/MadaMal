import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

// Define a type for the slice state
interface UserState {
  userId: string
}

// Define the initial state using that type
const initialState: UserState = {
    userId: '1',
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state,action: PayloadAction<string> ) => ({
     ...state,
     userId: action.payload
    }),
  },
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.user.userId

export default userSlice.reducer