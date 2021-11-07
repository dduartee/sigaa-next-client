import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";

export default function useTokenHandler(setValid: (isValid: boolean) => void) {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("auth::store", (token: string) => {
      localStorage.setItem("token", token);
    });
    emitAuthValid({ token: localStorage.getItem("token") }, socket);
    socket.on("auth::valid", (valid: boolean) => setValid(valid));
  }, []);
}

export function emitAuthValid(
  params: { token: string | null },
  socket: Socket
) {
  socket.emit("auth::valid", params);
}
