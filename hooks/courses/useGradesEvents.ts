import { Bond } from "@types";
import { SocketContext } from "@context/socket";
import { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
export default function useGradesEvents() {
  const [bond, setBond] = useState<Bond | undefined>(undefined);
  const [partialLoading, setPartialLoading] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("grades::list", (bond: Bond) => {
      setPartialLoading(false);
      setBond(bond);
    });
    socket.on("grades::listPartial", (bond: Bond) => {
      setPartialLoading(true);
      setBond(bond);
    });
    return () => {
      socket.off("grades::list");
      socket.off("grades::listPartial");
    };
  }, [socket]);

  return { bond, setBond, partialLoading, setPartialLoading };
}

export function emitGradesList(params: {
  token: string | null;
  registration: string;
  inactive: boolean;
  id: string;
  cache: boolean;
}, socket: Socket) {
  socket.emit('grades::list', params)
}
