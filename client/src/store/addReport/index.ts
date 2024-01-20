import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

// Define a type for the slice state
interface AddReportsState {
  isOpen: boolean;
  selectedReportId?: string;
}

// Define the initial state using that type
const initialState: AddReportsState = {
  isOpen: false,
};

export const addReportsSlice = createSlice({
  name: "addReports",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openAdd: () => ({
      ...initialState,
      isOpen: true,
    }),
    openUpdate: (state, action: PayloadAction<string>) => ({
      ...state,
      isOpen: true,
      selectedReportId: action.payload,
    }),
    closeDialog: () => ({
      ...initialState,
    }),
  },
});

export const { openAdd, openUpdate, closeDialog } = addReportsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReportDialogStatus = (state: RootState): boolean =>
  state.reportDialog.isOpen;
export const selectReportDialogSelectedId = (
  state: RootState
): string | undefined => state.reportDialog.selectedReportId;

export default addReportsSlice.reducer;
