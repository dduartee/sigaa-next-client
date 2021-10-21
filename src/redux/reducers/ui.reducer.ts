import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  loading: boolean;
  progress: number;
  error: boolean;
  errorMessage: string;
};

const initialState: UIState = {
  loading: false,
  progress: 0,
  error: false,
  errorMessage: "",
};

export const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    updateProgress: (state, action: PayloadAction<UIState["progress"]>) => {
      state.progress = action.payload;
    },
    setError: (state, action: PayloadAction<UIState>) => {
      state.error = true;
      state.errorMessage = action.payload.errorMessage;
    },
    reset: () => initialState,
  },
});

export const { startLoading, stopLoading, updateProgress, setError, reset } =
  UISlice.actions;

export default UISlice.reducer;
