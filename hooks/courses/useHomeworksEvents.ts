import { Bond } from "@types";
import { SocketContext } from "@context/socket";
import { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
export default function useHomeworksEvents() {
  const [bond, setBond] = useState<Bond | null>(null);
  const [partialLoading, setPartialLoading] = useState(false);
  const [partialLoadingDescription, setPartialLoadingDescription] =
    useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("homeworks::listPartial", (bond: Bond) => {
      setPartialLoading(true);
      setBond(bond);
    });
    socket.on("homeworks::list", (bond: Bond) => {
      setPartialLoading(false);
      setBond(bond);
    });
    return () => {
      socket.off("homeworks::listPartial");
      socket.off("homeworks::list");
    };
  }, [socket]);

  return {
    bond,
    setBond,
    partialLoading,
    setPartialLoading,
    partialLoadingDescription,
    setPartialLoadingDescription,
  };
}

export function emitHomeworksList(
  params: {
    registration: string;
    fullHW: boolean;
    inactive: boolean;
    token: string | null;
    cache: boolean;
  },
  socket: Socket
) {
  socket.emit("homeworks::list", params);
}

export function emitHomeworksSpecific(
  params: {
    code: string;
    fullHW: boolean;
    inactive: boolean;
    token: string | null;
    cache: boolean;
  },
  socket: Socket
) {
  socket.emit("homeworks::specific", params);
}
