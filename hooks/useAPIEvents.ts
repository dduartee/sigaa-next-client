import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

export default function useAPIHandler() {
  const socket = useContext(SocketContext);
  const [error, setError] = useState(false);
  useEffect(() => {
    socket.on("api::info", (data: string) => {
      //console.info(JSON.parse(data));
    });
    socket.on("api::error", (data: string) => {
      setError(true);
      console.error(data);
    });
    return () => {
      socket.off("api::info");
      socket.off("api::error");
    }
  }, [socket]);
  return { error, setError };
}
