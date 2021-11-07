import { createContext } from "react";

type UIState = {
  tabs: {
    setTab: (tab: number) => void;
    tab: number;
  };
  registration: {
    setRegistration: (registration: string) => void;
    value: string;
  };
};

const initialState: UIState = {
  tabs: {
    setTab: () => {},
    tab: 0,
  },
  registration: {
    setRegistration: (_value: string) => {},
    value: "",
  },
};

export const UIContext = createContext(initialState);
