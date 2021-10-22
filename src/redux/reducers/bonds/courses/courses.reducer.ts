import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bond, Course } from "@types";

export type coursesState = {
  courses: Course[];
  registration: Bond["registration"];
};

const initialState: coursesState[] = [];

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<coursesState>) => {
      for (let i = 0; i < state.length; i++) {
        const bond = state[i];
        if (bond.registration === action.payload.registration) {
          state[i] = action.payload;
          return;
        }
      }
      state.push(action.payload);
    },
    resetCourses: () => initialState,
  },
});

export const { setCourses, resetCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
