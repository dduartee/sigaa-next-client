import React from "react";
import { io, Socket } from "socket.io-client";
import config from "@config.json"
export const socketInstance = io(config.BACKEND_URL);
export const socketContext = React.createContext<Socket>(socketInstance);
