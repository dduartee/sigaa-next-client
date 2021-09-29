import { Bond } from "@types"
import React from "react"

export const defaultValue: Bond[] = [
  {
    program: "",
    registration: "",
    courses: [],
    activities: []
  },
]

export const DataContext = React.createContext<Bond[]>( defaultValue )