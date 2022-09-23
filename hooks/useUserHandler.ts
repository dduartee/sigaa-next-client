import { Bond, UserData, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { emitBondList } from "./useBondsEvents";

export default function useUserHandler() {
  const [status, setStatus] = useState<UserStatus>("Deslogado");
  const [user, setUser] = useState<UserData | null>(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    const fullName = localStorage.getItem("fullName");
    const profilePictureURL = localStorage.getItem("profilePictureURL");
    const emails = JSON.parse(localStorage.getItem("emails") || "[]") as string[];
    const username = localStorage.getItem("username");
    if (fullName && profilePictureURL && emails && username) {
      setUser({
        username,
        fullName,
        profilePictureURL,
        emails
      });
    } else {
      setUser(null)
    }
  }, [])
  useEffect(() => {
    socket.on("user::status", (status: UserStatus) => {
      setStatus(status);
    });
    socket.on("user::login", ({logado}) => {
      if (logado) {
        emitUserInfo({ token: localStorage.getItem("token") }, socket);
        emitBondList(
          {
            token: localStorage.getItem("token"),
            inactive: true,
            cache: false
          },
          socket
        );
      }
    });
    socket.on("user::info", ({ fullName, emails, profilePictureURL, username }: UserData) => {
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("profilePictureURL", profilePictureURL);
      localStorage.setItem("emails", JSON.stringify(emails));
      localStorage.setItem("username", username);
      setUser({
        username,
        fullName,
        profilePictureURL,
        emails
      })
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
