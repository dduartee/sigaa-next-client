import { SocketContext } from "@context/socket";
import { useState, useEffect, useContext } from "react";

export default function useTokenHandler() {
  const socket = useContext(SocketContext);
  const [valid, setValid] = useState(true);
  useEffect(() => {
    socket.on("auth::store", (token: string) => {
      sessionStorage.setItem("token", token);
    });
    socket.on("auth::valid", (valid: boolean) => setValid(valid));
    socket.emit("auth::valid", { token: sessionStorage.getItem("token") }); // pede para o servidor se o token é válido
    return () => {
      socket.off("auth::store");
      socket.off("auth::valid");
    }
  }, [setValid, socket]);
  return valid;
}

