import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { optionsArgs } from "@types";

export type optionsState = optionsArgs & {
  rememberMe: boolean;
};

const initialState: optionsState = {
  institution: "",
  url: "",
  rememberMe: false,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setOptions: function setOptions(
      state,
      action: PayloadAction<optionsState>
    ) {
      state.institution = action.payload.institution;
      state.url = action.payload.url;
      state.rememberMe = action.payload.rememberMe;
    },
  },
});

export const { setOptions } = optionsSlice.actions;
export type optionsActions = typeof optionsSlice.actions;
export default optionsSlice.reducer;
