import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
export default function useCourseEvents(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
      activities: []
    },
  ]);
  const [partialLoading, setPartialLoading] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("courses::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
      setLoading(false)
    });
    socket.on("activities::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
      setLoading(false)
    });
    return () => {
      socket.off("courses::list");
      socket.off("activities::list");
    }
  }, [setLoading, socket]);

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
