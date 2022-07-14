import { Bond, UserInfo, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { emitBondList } from "./useBondsEvents";

export default function useUserHandler({ valid }: { valid: boolean }) {
  const [status, setStatus] = useState<UserStatus>("Deslogado");
  const [user, setUser] = useState<UserInfo>({
    fullName: "",
    profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png",
  });
  const socket = useContext(SocketContext);
  useEffect(() => {
    const user = {
      fullName: localStorage.getItem("fullName") || "",
      profilePictureURL: localStorage.getItem("profilePictureURL") || "",
    }
    setUser(user);
  }, [])
  useEffect(() => {
    socket.on("user::status", (status: UserStatus) => {
      setStatus(status);
    });
    socket.on("user::login", (data: string) => {
      const { logado } = JSON.parse(data);
      if (logado) {
        emitUserInfo({ token: localStorage.getItem("token") }, socket);
        emitBondList(
          {
            token: localStorage.getItem("token"),
            inactive: false,
          },
          socket
        );
      }
    });
    socket.on("user::info", (data: string) => {
      const { fullName, profilePictureURL } = JSON.parse(data);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("profilePictureURL", profilePictureURL);
      setUser({ fullName, profilePictureURL });
    });
    return () => {
      socket.off("user::status");
      socket.off("user::login");
      socket.off("user::info");
    }

  }, [socket]);
  return { user, status, setUser, setStatus };
}

export function emitUserInfo(params: { token: string | null }, socket: Socket) {
  socket.emit("user::info", params);
}
