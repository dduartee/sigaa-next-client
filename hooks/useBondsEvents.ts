import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";

export default function useBondsHandler() {
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
    },
  ]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("bonds::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
    });
  }, []);
  return { data };
}

export function emitBondList(params: {
  token: string | null;
  inactive: boolean;
}, socket: Socket) {
  socket.emit("bonds::list", params);
}
