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
      localStorage.setItem("json", data);
      const bondsJSON = JSON.parse(data);
      console.log("RECEBIDO");
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

    return () => {};
  }, [valid, setData]);

  return { data, setData, partialLoading, setPartialLoading };
}
