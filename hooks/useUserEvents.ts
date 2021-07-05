

import { Bond, UserInfo, UserStatus } from '@types'
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

function useUserEvents() {
  const [status, setStatus] = useState<UserStatus>( "Deslogado" );
  const [user, setUser] = useState<UserInfo>( {
    fullName: "",
    profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png",
  } );
  const [data, setData] = useState<Bond[]>( [
    {
      program: "",
      registration: "",
      courses: [],
    },
  ] );
  const socket = useContext( SocketContext );

  useEffect( () => {
    socket.on( "user::status", ( status: UserStatus ) => {
      setStatus( status );
    } );
    socket.on( "user::login", ( data: string ) => {
      const { logado } = JSON.parse( data );
      if ( logado ) {
        socket.emit( "user::info", { token: localStorage.getItem( "token" ) } );
        socket.emit( "bonds::list", {
          token: localStorage.getItem( "token" ),
          inactive: false,
        } );
      }
    } );
    socket.on( "user::info", ( data: string ) => {
      const { fullName, profilePictureURL } = JSON.parse( data );
      localStorage.setItem(
        "user",
        JSON.stringify( { fullName, profilePictureURL } )
      );
      setUser( { fullName, profilePictureURL } );
      console.log( data );
    } );
    socket.on( "bonds::list", ( data: string ) => {
      const bondsJSON = JSON.parse( data );
      localStorage.setItem( "json", data )
      setData( bondsJSON );
    } );
  }, [] );
  return { user, status, data };
}

export default useUserEvents

