import { UserData } from "@types"
import React from "react"

export const UserContext = React.createContext<UserData | undefined>(undefined)