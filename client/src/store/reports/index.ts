import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { IReport } from '../../models'
import { fakeData } from './fakeData'
import { selectUserId } from '../user'

// Define a type for the slice state
interface ReportsState {
  reports: IReport[]
}

// Define the initial state using that type
const initialState: ReportsState = {
   reports : fakeData,
}

export const reportsSlice = createSlice({
  name: 'reports',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setReports: (state,action: PayloadAction<IReport[]> ) => ({
     ...state,
     reports: action.payload
    }),
  },
});

export const { setReports } = reportsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllReports = (state: RootState) => state.reports.reports;
export const selectReportsofLoggedUser = createSelector(
  [selectAllReports, selectUserId], 
  (reports: IReport[], userId: string) => reports.filter(report => report.ownerId === userId));

export default reportsSlice.reducer;