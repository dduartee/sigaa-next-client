import { SocketContext } from "@context/socket";
import { useEffect, useContext } from "react";

export default function useAPIHandler() {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("api::info", (data: string) => {
      //console.info(data);
    });
    socket.on("api::error", (data: string) => {
      //console.error(data);
    });
    return () => {
      socket.off("api::info");
      socket.off("api::error");
    }
  }, [socket]);
}
