import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
export default function useCoursesHandler({ valid }: { valid: boolean }) {
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
    socket.on("homeworks::listPartial", (data) => {
      const bondsJSON = JSON.parse(data);
      setPartialLoading(true);
      setData(bondsJSON);
    });
    socket.on("homeworks::list", (data) => {
      const bondsJSON = JSON.parse(data);
      setPartialLoading(false);
      setData(bondsJSON);
      console.log(bondsJSON);
    });
    return () => {};
  }, [valid, setData]);

  return { data, setData, partialLoading, setPartialLoading };
}
