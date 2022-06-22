import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import {
  Box,
} from "@material-ui/core";
import Head from "next/head";
import useGradesEvents, {
  emitGradesList,
} from "@hooks/courses/useGradesEvents";
import useTabHandler from "@hooks/useTabHandler";
import HomeProviders from "@components/homeProvider";
import Grades from "@components/Grades/Content";

function InitializeHooks({ registration }: { registration: string }) {
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user, setUser } = useUserHandler({ valid });
  const [loading, setLoading] = useState(false);
  useAPIHandler();
  const { tab, setTab } = useTabHandler({
    order: 1,
    setLoading,
    registration,
    valid,
  });
  const { data, partialLoading, setPartialLoading } = useGradesEvents();
  return {
    data,
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
  const router = useRouter();
  const socket = useContext(SocketContext);
  const {
    data,
    partialLoading,
    loading,
    user,
    valid,
    tab,
    setUser,
    setValid,
    setLoading,
    setPartialLoading,
    setTab,
  } = InitializeHooks({ registration });
  useEffect(() => {
    if (valid) {
      emitGradesList(
        {
          registration,
          id: "grades",
          cache: true,
          token: localStorage.getItem("token"),
        },
        socket
      );
      setPartialLoading(true);
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
    } else window.location.href = "/";
  }, [valid]);
  const bond = data[0]
  return (
    <>
      <Head>
        <title>Notas | sigaa-next-client</title>
      </Head>
      <HomeProviders
        data={data}
        loading={loading}
        user={user}
        setTab={setTab}
        tab={tab}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grades bond={bond} partialLoading={partialLoading} />
        </Box>
      </HomeProviders>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}

