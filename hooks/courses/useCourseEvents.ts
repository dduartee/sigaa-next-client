import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
export default function useCourseEvents() {
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
    },
  ]);
  const [partialLoading, setPartialLoading] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("courses::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
    });
    return () => {};
  }, [setData]);

  return { data, setData, partialLoading, setPartialLoading };
}

export function emitCourseList(
  params: {
    token: string | null;
    registration: string;
  },
  socket: Socket
) {
  socket.emit("courses::list", params);
}
