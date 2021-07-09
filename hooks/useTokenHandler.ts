import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

export default function useTokenHandler() {
  const [valid, setValid] = useState(true);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("auth::store", (token: string) => {
      localStorage.setItem("token", token);
    });
    socket.emit("auth::valid", { token: localStorage.getItem("token") });
    socket.on("auth::valid", (valid: boolean) => {
      if (valid) {
        setValid(true);
      } else {
        setValid(false);
      }
    });
  }, []);
  return valid;
}