

import { Bond, UserInfo, UserStatus } from '@types'
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

function useUserCourses() {
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
    },
  ]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("courses::list", (data: string) => {
      localStorage.setItem("json", data);
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
    });
  }, []);
  return { data, setData };
}

export default useUserCourses

