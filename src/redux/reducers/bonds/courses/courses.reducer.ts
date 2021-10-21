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
      state.push({
        courses: action.payload.courses,
        registration: action.payload.registration,
      });
    },
    resetCourses: () => initialState,
  },
});

export const { setCourses, resetCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
