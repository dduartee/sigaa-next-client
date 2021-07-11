import { SocketContext } from "@context/socket";
import getAction from "@util/getAction";
import parseSlugPattern from "@util/parseSlugPattern";
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react";
export default function useSlugHandler({ slug, setTab }: { slug: string[], setTab: (tab: number) => void }) {
    const { registration, actionPrimary, code, actionSecondary } =
        parseSlugPattern(slug);
    const action = getAction({
        registration,
        actionPrimary,
        code,
        actionSecondary,
    });
    const socket = useContext(SocketContext);
    useEffect(() => {
        switch (action) {
            case "getCourses":
                setTab(0);
                socket.emit("courses::list", { token: localStorage.getItem("token"), registration })
                break;
            case "getSchedulesOfBond":
                setTab(1);
                socket.emit("courses::list", { token: localStorage.getItem("token"), registration })
                break;
            case "getGradesOfBond":
                setTab(2);
                break;
            case "getHomeworksOfBond":
                setTab(3);
                break;
            case "getNewsOfBond":
                setTab(4);
                break;
            case "getCourseDetails":
                break;
            case "getCourseGrades":
                break;
            case "getCourseHomeworks":
                break;
            case "getCourseNews":
                break;
        }
        return (() => { })
    }, [action, socket]);
}