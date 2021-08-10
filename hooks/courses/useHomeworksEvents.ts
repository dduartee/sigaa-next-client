import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
export default function useHomeworksEvents() {
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
    },
  ]);
  const [partialLoading, setPartialLoading] = useState(false);
  const [partialLoadingDescription, setPartialLoadingDescription] =
    useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("homeworks::listPartial", (data) => {
      const bondsJSON = JSON.parse(data);
      setPartialLoading(true);
      setData(bondsJSON);
    });
    socket.on("homeworks::list", (data) => {
      const bondsJSON = JSON.parse(data);
      setPartialLoading(false);
      setData(bondsJSON);
    });
    return () => {};
  }, [setData]);

  return {
    data,
    setData,
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
