import { io, Socket } from "socket.io-client";
import config from "../config.json";
import React from "react";

export const socketInstance = io(config.SOCKET_URL);
export const SocketContext = React.createContext<Socket>(socketInstance);