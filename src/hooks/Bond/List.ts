import { useContext, useEffect } from "react";
import events from "@events.json";
import { socketContext } from "@contexts/Socket";
import { credentialsWithUnique, optionsArgs } from "@hooks/Auth/Login";
import { Bond } from "@types";
import { DataContext } from "@contexts/Data";

export type bondArgs = {
  credentials: credentialsWithUnique;
  options: optionsArgs;
  query: bondQuery;
};

export type bondQuery = {
  type: "student"; // bond do tipo teacher não foi implementado
  registration?: string;
};

export type bondResponse = {
  bonds: Bond[] | undefined;
  error: any | undefined;
};

export const BondListHook = (
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const socket = useContext(socketContext);
  const { setData } = useContext(DataContext);
  useEffect(() => {
    socket.on(events.bonds.list, (data: bondResponse) => {
      if (data.bonds && !data.error) {
        setData(data.bonds);
      } else {
        console.error(data.error);
        setError(true);
      }
    });
  }, []);
  const getBonds = (params: {
    credentials: credentialsWithUnique,
    options: optionsArgs,
    query: bondQuery
  }) => {
    
    socket.emit(events.bonds.list, params);
  };
  return { getBonds };
};
