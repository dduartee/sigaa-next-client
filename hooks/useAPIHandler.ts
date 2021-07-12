
import { Bond, UserInfo, UserStatus } from '@types'
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";

export default function useAPIHandler() {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("api::info", (data: string) => {
            console.log(JSON.parse(data))
        });
    }, []);
}


