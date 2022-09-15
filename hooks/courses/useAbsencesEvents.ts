import { SocketContext } from "@context/socket";
import { Bond } from "@types";
import { useState, useContext, useEffect } from "react";


export default function useAbsencesEvents() {
    const [bond, setBond] = useState<Bond | null>(null);
    const [partialLoading, setPartialLoading] = useState(false);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("absences::list", (bond: Bond) => {
            setPartialLoading(false);
            setBond(bond);
        });
        socket.on("absences::listPartial", (bond: Bond) => {
            setPartialLoading(true);
            setBond(bond);
        });
        return () => {
            socket.off("absences::list");
            socket.off("absences::listPartial");
        };
    }, [socket]);

    return { bond, setBond, partialLoading, setPartialLoading };
}