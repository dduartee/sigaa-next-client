import React from "react";
import { io, Socket } from "socket.io-client";
import config from "@config.json";
export const SocketInstance = () => io(config.BACKEND_URL);
export const SocketContext = React.createContext<Socket>(SocketInstance());
