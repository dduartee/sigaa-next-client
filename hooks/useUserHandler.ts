

import { Bond, UserInfo, UserStatus } from '@types'
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

export default function useUserHandler({ valid }: { valid: boolean }) {
  const [status, setStatus] = useState<UserStatus>("Deslogado");
  const [user, setUser] = useState<UserInfo>({
    fullName: "",
    profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png",
  });
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("user::status", (status: UserStatus) => {
      setStatus(status);
    });
    socket.on("user::login", (data: string) => {
      const { logado } = JSON.parse(data);
      if (logado) {
        socket.emit("user::info", { token: localStorage.getItem("token") });
        socket.emit("bonds::list", {
          token: localStorage.getItem("token"),
          inactive: false,
        });
      }
    });
    socket.on("user::info", (data: string) => {
      const { fullName, profilePictureURL } = JSON.parse(data);
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, profilePictureURL })
      );
      setUser({ fullName, profilePictureURL });
    });
  }, [valid, setUser, setStatus]);
  return { user, status, setUser, setStatus };
}
