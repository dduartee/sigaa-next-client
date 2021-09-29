import { Bond } from "@types";
import React from "react";
export type DataState = Bond[];
export const dataInitialState: Bond[] = [
  {
    program: "",
    registration: "",
    active: false,
    activities: [],
    courses: [],
  },
];

export const DataContext = React.createContext<{
  Data: DataState;
  setData: React.Dispatch<React.SetStateAction<DataState>>;
}>({ Data: dataInitialState, setData: () => {} });
