import { Socket } from "socket.io-client";
import events from "@events";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setBonds } from "@redux/reducers/bonds/bonds.reducer";
import { bondArgs, bondResponse, credentialsWithUnique } from "@types";
import { useEffect } from "react";

export default (socket: Socket) => {
  const dispatch = useAppDispatch();
  const storeState = useAppSelector((state) => state);

  useEffect(() => {
    socket.on(events.bonds.list, (response: bondResponse) => {
      const { error, bonds } = response;
      if (bonds && !error) {
        dispatch(setBonds(bonds));
      } else {
        console.error(error);
      }
    });
  }, [socket]);
  const emitGetBonds = (credentials: credentialsWithUnique) => {
    socket.emit(events.bonds.list, {
      credentials,
      query: { type: "student" },
    } as bondArgs);
  };
  return { emitGetBonds, storeState };
};
