import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box, Typography } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import useCourseEvents from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import useTabHandler from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import { Bond } from "@types";
import { emitCourseList } from "@hooks/useBondsEvents";

function InitializeHooks({ registration }: { registration: string }) {
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user } = useUserHandler();
  const [loading, setLoading] = useState(false);
  const [bond, setBond] = useState<Bond | null>(null);
  useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: 4,
    registration,
    valid,
  });
  useAPIHandler();
  return { valid, loading, user, bond, tab, setValid, setLoading, setTab };
}
export default function RegistrationPage({
  registration,
}: {
  registration: string;
}) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { valid, bond, loading, user, tab, setLoading, setTab } =
    InitializeHooks({
      registration,
    });
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitCourseList(
        { token: localStorage.getItem("token"), registration, allPeriods: false, cache: true, inactive: false },
        socket
      );
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
    }
  }, [registration, socket, valid]);

  return (
    <>
      <Head>
        <title>Notícias | sigaa-next-client</title>
      </Head>
      <HomeProvider
        loading={loading}
        user={user}
        registration={registration}
        setTab={setTab}
        tab={tab}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1">
            ainda não implementado &gt;:(
          </Typography>
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

