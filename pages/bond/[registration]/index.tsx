import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import useCourseEvents from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import { Bond } from "@types";
import useTabHandler from "@hooks/useTabHandler";
import { emitActivitiesList, emitCourseList } from "@hooks/useBondsEvents";
import Activities from "@components/Activities/Content";
import HomeProvider from "@components/HomeProvider";
import { bondTabs } from "@components/Home/CustomDrawer";
export default function RegistrationPage({
  registration,
}: {
  registration: string;
}) {
  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const [bond, setBond] = useState<Bond | null>(null);
  useEffect(() => {
    const bondCached = JSON.parse(
      localStorage.getItem(`bond@${registration}`) || "{}"
    );
    if (bondCached) {
      setBond(bondCached);
    } else {
      localStorage.removeItem(`bond@${registration}`);
    }
  }, [registration]);
  const { activitiesLoading, setActivitiesLoading } = useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: 0,
    registration,
    valid,
  });
  useAPIHandler();
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
      setActivitiesLoading(true);
    }
  }, [registration, setActivitiesLoading, socket, valid]);
  useEffect(() => {
    if (user?.fullName) {
      emitActivitiesList(
        {
          token: localStorage.getItem("token"),
          registration,
          inactive: true,
          cache: true,
          id: "activities",
        },
        socket
      );
      emitCourseList(
        {
          token: localStorage.getItem("token"),
          registration,
          inactive: true,
          allPeriods: false,
          cache: true,
          id: "courses",
        },
        socket
      );
    }
  }, [registration, socket, user?.fullName]);
  return (
    <>
      <Head>
        <title>Inicio | sigaa-next</title>
      </Head>
      <HomeProvider
        loading={activitiesLoading}
        user={user}
        registration={registration}
        setTab={setTab}
        tab={tab}
        tabs={bondTabs}
      >
        <Box
          sx={{ flexGrow: 1, p: 1 }}
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          maxWidth={"100%"}
        >
          <Activities bond={bond} loading={activitiesLoading}/>
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
