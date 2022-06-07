import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box, Typography } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import useCourseEvents, {
  emitCourseList,
} from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import useTabHandler from "@hooks/useTabHandler";
import HomeProviders from "@components/homeProvider";

function InitializeHooks({ registration }: { registration: string }) {
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user } = useUserHandler({ valid });
  const [loading, setLoading] = useState(false);
  const { data } = useCourseEvents(setLoading);
  const { tab, setTab } = useTabHandler({
    order: 4,
    setLoading,
    registration,
    valid,
  });
  useAPIHandler();
  return { valid, loading, user, data, tab, setValid, setLoading, setTab };
}
export default function RegistrationPage({
  registration,
}: {
  registration: string;
}) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { valid, data, loading, user, tab, setLoading, setTab } =
  InitializeHooks({
      registration,
    });
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitCourseList(
        { token: localStorage.getItem("token"), registration },
        socket
      );
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
    }
  }, [valid]);

  return (
    <>
      <Head>
        <title>Matérias | sigaa-next-client</title>
      </Head>
      <HomeProviders
        data={data}
        loading={loading}
        user={user}
        setTab={setTab}
        tab={tab}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1">
              ainda não implementado &gt;:(
          </Typography>
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

