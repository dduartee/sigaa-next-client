import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileSchema } from "@types";

type ProfileState = IProfileSchema;

const initialState: ProfileState = {
  emails: [],
  fullName: "",
  profilePictureURL: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileState>) {
      state.emails = action.payload.emails;
      state.fullName = action.payload.fullName;
      state.profilePictureURL = action.payload.profilePictureURL;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export type ProfileActions = typeof profileSlice.actions;

export default profileSlice.reducer;
