import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bond } from "@types";

export type bondsState = Bond[];

const initialState: bondsState = [];

export const bondsSlice = createSlice({
  name: "bonds",
  initialState,
  reducers: {
    setBonds: (state, action: PayloadAction<Bond[]>) => {
      Object.assign(state, action.payload);
      for (let i = 0; i < action.payload.length; i++) {
        const bond = action.payload[i];
        state[i] = bond;
      }
    },
    resetBonds: () => initialState,
  },
});

export const { setBonds, resetBonds } = bondsSlice.actions;
export type bondsActions = typeof bondsSlice.actions;
export default bondsSlice.reducer;
