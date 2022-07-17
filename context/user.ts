import { UserData } from "@types"
import React from "react"

export const defaultValue: UserData = {
  fullName: "",
  profilePictureURL: "",
  emails: [],
  username: ""
}

export const UserContext = React.createContext<UserData | null>(null)