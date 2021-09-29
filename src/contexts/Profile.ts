import React from "react";
export type IProfileSchema = {
  profilePictureURL: string;
  fullName: string;
  emails: string[];
};

export const profileInitialState: IProfileSchema = {
  emails: [],
  fullName: "",
  profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png",
};

export const ProfileContext = React.createContext<{
  Profile: IProfileSchema;
  setProfile: React.Dispatch<React.SetStateAction<IProfileSchema>>;
}>({ Profile: profileInitialState, setProfile: () => ({}) });
