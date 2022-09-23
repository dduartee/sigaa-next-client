import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import {
    Box, CircularProgress,
} from "@material-ui/core";
import Head from "next/head";
import useTabHandler from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Absences from "@components/Absences/Content";
import useAbsencesEvents from "@hooks/courses/useAbsencesEvents";

function InitializeHooks({ registration }: { registration: string }) {
    const [valid, setValid] = useState(true);
    useTokenHandler(setValid);
    const { user, setUser } = useUserHandler();
    const [loading, setLoading] = useState(false);
    useAPIHandler();
    const { tab, setTab } = useTabHandler({
        order: 2,
        registration,
        valid,
    });
    const { bond, partialLoading, setPartialLoading } = useAbsencesEvents();
    return {
        bond,
        partialLoading,
        setPartialLoading,
        loading,
        setLoading,
        user,
        setUser,
        setValid,
        valid,
        tab,
        setTab,
    };
}
export default function GradesPage({ registration }: { registration: string }) {
    const socket = useContext(SocketContext);
    const {
        bond,
        partialLoading,
        loading,
        user,
        valid,
        tab,
        setPartialLoading,
        setTab,
    } = InitializeHooks({ registration });
    useEffect(() => {
        if (valid) {
            emitUserInfo({ token: localStorage.getItem("token") }, socket);
            socket.emit("absences::list",
                {
                    registration,
                    cache: true,
                    inactive: true,
                    id: "absences",
                    token: localStorage.getItem("token"),
                },
            );
            setPartialLoading(true);
        } else window.location.href = "/";
    }, [registration, setPartialLoading, socket, valid]);
    return (
        <>
            <Head>
                <title>Frequência | sigaa-next</title>
            </Head>
            <HomeProvider
                loading={loading}
                registration={registration}
                user={user}
                setTab={setTab}
                tab={tab}
            >
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Absences bond={bond} />
                    {
                        partialLoading ? (
                            <Box display={"flex"} justifyContent={"center"}>
                                <CircularProgress style={{ margin: "1rem" }} />
                            </Box>
                        ) : null
                    }
                </Box>
            </HomeProvider>
        </>
    );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: context.query,
    };
}

