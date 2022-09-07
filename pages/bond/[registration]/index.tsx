import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import Courses from "@components/Courses/Content";
function InitializeHooks({ registration }: { registration: string }) {
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user } = useUserHandler();
  const [bond, setBond] = useState<Bond | null>(null);
  useEffect(() => {
    const bondCached = JSON.parse(localStorage.getItem(`bond@${registration}`) || "{}");
    if (bondCached) {
      setBond(bondCached);
    } else {
      localStorage.removeItem(`bond@${registration}`);
    }
  }, [registration]);
  const { activitiesLoading, coursesLoading, setCoursesLoading, setActivitiesLoading } = useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: 0,
    registration,
    valid,
  });
  useAPIHandler();
  return { valid, user, bond, tab, activitiesLoading, coursesLoading, setCoursesLoading, setActivitiesLoading, setValid, setTab };
}
export default function RegistrationPage({
  registration,
}: {
  registration: string;
}) {
  const socket = useContext(SocketContext);
  const { valid, bond, user, tab, activitiesLoading, coursesLoading, setActivitiesLoading, setCoursesLoading, setTab } =
    InitializeHooks({
      registration,
    });
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
      emitActivitiesList(
        { token: localStorage.getItem("token"), registration, inactive: false, cache: false },
        socket
      );
      setActivitiesLoading(true)
    }
  }, [registration, setActivitiesLoading, setCoursesLoading, socket, valid]);
  useEffect(() => {
    if (bond?.activities) {
      emitCourseList(
        { token: localStorage.getItem("token"), registration, inactive: false, allPeriods: false, cache: false },
        socket
      )
      setCoursesLoading(true)
    }
  }, [bond?.activities, registration, setCoursesLoading, socket]);
  useEffect(() => {
    if (bond?.courses) {
      setCoursesLoading(false)
    }
  }, [bond?.activities, bond?.courses, registration, setCoursesLoading, socket]);
  return (
    <>
      <Head>
        <title>Inicio | sigaa-next-client</title>
      </Head>
      <HomeProvider
        loading={false}
        user={user}
        registration={registration}
        setTab={setTab}
        tab={tab}
      >
        <Box sx={{ flexGrow: 1, p: 1 }}  display={"flex"} flexDirection="column" alignItems={"center"} maxWidth={"80%"}>
          <Activities bond={bond} loading={activitiesLoading} />
          <Courses bond={bond} loading={coursesLoading} />
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
