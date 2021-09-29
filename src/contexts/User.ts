import React from "react";

export type IUserSchema = {
  username: string;
};

export const userInitialState: IUserSchema = {
  username: "",
};

export const UserContext = React.createContext<{
  User: IUserSchema;
  setUser: React.Dispatch<React.SetStateAction<IUserSchema>>;
}>({ User: userInitialState, setUser: () => {} });
