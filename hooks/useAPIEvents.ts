import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

export default function useAPIHandler() {
  const socket = useContext(SocketContext);
  const [error, setError] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState("");
  useEffect(() => {
    socket.on("api::info", (data: string) => {
      //console.info(data);
    });
    socket.on("api::error", (data: string) => {
      if (data === 'SIGAA: Invalid credentials.') {
        setError(true);
        setErrorFeedback(data);
      } else if(data === 'SIGAA: Session expired.') {
        setError(false);
        setErrorFeedback(data);
      }
    });
    return () => {
      socket.off("api::info");
      socket.off("api::error");
    }
  }, [socket]);
  return { error, setError, errorFeedback, setErrorFeedback };
}
