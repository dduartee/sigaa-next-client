import { UserInfo } from "@types"
import React from "react"

export const defaultValue: UserInfo = {
  fullName: "",
  profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png"
}

export const UserContext = React.createContext<UserInfo>( defaultValue )