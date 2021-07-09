

import { Bond, UserInfo, UserStatus } from '@types'
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

export default function useBondsHandler() {
  const [data, setData] = useState<Bond[]>( [
    {
      program: "",
      registration: "",
      courses: [],
    },
  ] );
  const socket = useContext( SocketContext );

  useEffect( () => {
    socket.on( "bonds::list", ( data: string ) => {
      const bondsJSON = JSON.parse( data );
      localStorage.setItem( "json", data )
      setData( bondsJSON );
    } );
  }, [] );
  return { data };
}


