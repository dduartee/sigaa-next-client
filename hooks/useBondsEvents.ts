import { Bond } from "@types";
import { SocketContext } from "@context/socket";
import { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";

export default function useBondsHandler() {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("bonds::list", (bonds: Bond[]) => {
      // bonds can be duplicated, so we need to remove them
      setBonds(bonds.filter((bond, index) => bonds.findIndex(b => b.registration === bond.registration) === index));
    });
    return () => {
      socket.off("bonds::list");
    }

  }, [socket]);
  return { bonds };
}

export function emitBondList(query: {
  token: string | null;
  inactive: boolean;
  cache: boolean;
}, socket: Socket) {
  socket.emit("bonds::list", query);
}

export function emitActivitiesList(query: {
  token: string | null;
  inactive: boolean;
  registration: string;
  cache: boolean;
  id: string;
}, socket: Socket) {
  socket.emit("activities::list", query);
}
export function emitCourseList(
  params: {
    token: string | null;
    registration: string;
    inactive: boolean;
    allPeriods: boolean;
    id: string;
    cache: boolean;
  },
  socket: Socket
) {
  socket.emit("courses::list", params);
}
export function emitCourseDetails(
  params: {
    token: string | null;
    registration: string;
    inactive: boolean;
    allPeriods: boolean;
    id: string;
    cache: boolean;
  },
  socket: Socket
) {
  socket.emit("courses::details", params);
}
