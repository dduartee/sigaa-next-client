import { UserInfo } from "@types"
import React from "react"

export const defaultValue: UserInfo = {
  fullName: "",
  profilePictureURL: ""
}

export const UserContext = React.createContext<UserInfo>( defaultValue )