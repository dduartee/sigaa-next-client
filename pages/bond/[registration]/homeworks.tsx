import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import {
  Box,
} from "@material-ui/core";
import Head from "next/head";
import useHomeworksEvents, {
  emitHomeworksList,
} from "@hooks/courses/useHomeworksEvents";
import useTabHandler from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Homeworks from "@components/Homeworks/Content";

function InitializeHooks({ registration }: { registration: string }) {
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user, setUser } = useUserHandler();
  const [loading, setLoading] = useState(false);
  const { bond, partialLoading, partialLoadingDescription, setPartialLoading } =
    useHomeworksEvents();
  useAPIHandler();
  const { tab, setTab } = useTabHandler({
    order: 3,
    registration,
    valid,
  });
  return {
    user,
    setUser,
    loading,
    setLoading,
    bond,
    partialLoading,
    setPartialLoading,
    partialLoadingDescription,
    tab,
    setTab,
    valid,
  };
}

export default function HomeworksPage({
  registration,
}: {
  registration: string;
}) {
  const socket = useContext(SocketContext);
  const {
    user,
    loading,
    bond,
    partialLoading,
    setPartialLoading,
    partialLoadingDescription,
    tab,
    setTab,
    valid,
  } = InitializeHooks({ registration });
  useEffect(() => {
    if (valid) {
      emitHomeworksList(
        {
          token: localStorage.getItem("token"),
          registration,
          fullHW: true,
          inactive: false,
          cache: true,
        },
        socket
      );
      setPartialLoading(true)
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
    } else window.location.href = "/";
  }, [registration, setPartialLoading, socket, valid]);

  return (
    <>
      <Head>
        <title>Tarefas | sigaa-next-client</title>
      </Head>
      <HomeProvider
        loading={loading}
        registration={registration}
        user={user}
        setTab={setTab}
        tab={tab}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Homeworks
            bond={bond}
            partialLoading={partialLoading}
            partialLoadingDescription={partialLoadingDescription}
          />
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