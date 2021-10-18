import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSchema, statusResponse } from "@types";

type UserState = IUserSchema & {
  status: statusResponse;
  isLoggedIn: boolean;
  unique: string;
};

const initialState: UserState = {
  username: "",
  status: "Deslogado",
  isLoggedIn: false,
  unique: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: function setUser(state, action: PayloadAction<UserState>) {
      state.username = action.payload.username;
      state.status = action.payload.status;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.unique = action.payload.unique;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export type userActions = typeof userSlice.actions;
export default userSlice.reducer;
