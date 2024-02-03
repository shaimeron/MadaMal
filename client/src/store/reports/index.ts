import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IReport } from "@/models";
import { selectUserId } from "../user";

// Define a type for the slice state
interface ReportsState {
  reports: IReport[];
}

// Define the initial state using that type
const initialState: ReportsState = {
  reports: [],
};

export const reportsSlice = createSlice({
  name: "reports",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<IReport[]>) => ({
      ...state,
      reports: action.payload,
    }),
  },
});

export const { setReports } = reportsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllReports = (state: RootState) => state.reports.reports;
export const selectReportsofLoggedUser = createSelector(
  [selectAllReports, selectUserId],
  (reports: IReport[], userId: string): IReport[] =>
    reports.filter((report) => report.ownerId === userId)
);
export const selectReportById = (reportId: string) =>
  createSelector(
    [selectAllReports],
    (reports: IReport[]): IReport | undefined =>
      reports.find((report) => report._id === reportId)
  );

export default reportsSlice.reducer;
