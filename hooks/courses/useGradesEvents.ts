import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
<<<<<<< HEAD:hooks/courses/useGradesEvents.ts
import { Socket } from "socket.io-client";
export default function useGradesEvents() {
=======
export default function useCoursesHandler({ valid }: { valid: boolean }) {
>>>>>>> cc94b52c1fe5cfd5a7c580462cbaa7a874ac5258:hooks/useCoursesHandler.ts
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
<<<<<<< HEAD:hooks/courses/useGradesEvents.ts
=======
    socket.on("courses::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
    });

>>>>>>> cc94b52c1fe5cfd5a7c580462cbaa7a874ac5258:hooks/useCoursesHandler.ts
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
<<<<<<< HEAD:hooks/courses/useGradesEvents.ts
=======
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
>>>>>>> cc94b52c1fe5cfd5a7c580462cbaa7a874ac5258:hooks/useCoursesHandler.ts
    return () => {};
  }, [setData]);

  return { data, setData, partialLoading, setPartialLoading };
}

export function emitGradesList(params: {
  token: string | null;
  registration: string;
  inactive: boolean;
  cache: boolean;
}, socket: Socket) {
  socket.emit('grades::list', params)
}
