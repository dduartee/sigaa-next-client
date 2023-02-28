import { Bond, UserData, UserStatus } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { emitBondList } from "./useBondsEvents";

export default function useUserHandler() {
  const [status, setStatus] = useState<UserStatus>("Deslogado");
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState("");
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("user::status", (status: UserStatus) => {
      setStatus(status);
    });
    socket.on("user::login", ({ logado, error }) => {
      if (logado) {
        emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
        emitBondList(
          {
            token: sessionStorage.getItem("token"),
            inactive: true,
            cache: false
          },
          socket
        );
      } else {
        if (error === "Credenciais inválidas") {
          setErrorFeedback("Credenciais inválidas");
        } else if (error === "eita, alguma coisa aconteceu!") {
          setErrorFeedback("Alguma coisa não deu certo");
        } else {
          console.error(error);
        }
      }
    });
    socket.on("user::info", ({ fullName, emails, profilePictureURL, username }: UserData) => {
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
  return { user, status, setUser, setStatus, setErrorFeedback, errorFeedback };
}

export function emitUserInfo(params: { token: string | null }, socket: Socket) {
  socket.emit("user::info", params);
}
