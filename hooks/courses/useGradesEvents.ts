import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
export default function useGradesEvents() {
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
      activities: [],
    },
  ]);
  const [partialLoading, setPartialLoading] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("grades::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setPartialLoading(false);
      setData(bondsJSON);
    });
    socket.on("grades::listPartial", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setPartialLoading(true);
      setData(bondsJSON);
    });
    return () => {};
  }, [setData]);

  return { data, setData, partialLoading, setPartialLoading };
}

export function emitGradesList(params: {
  token: string | null;
  registration: string;
  id: string;
  cache: boolean;
}, socket: Socket) {
  console.log("grades::list")
  socket.emit('grades::list', params)
}
