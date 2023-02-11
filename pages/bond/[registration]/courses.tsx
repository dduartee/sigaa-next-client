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
import { emitCourseList } from "@hooks/useBondsEvents";
import HomeProvider from "@components/HomeProvider";
import Courses from "@components/Courses/Content";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";

function InitializeHooks({ registration }: { registration: string }) {
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
  const {
    coursesLoading,
    setCoursesLoading,
  } = useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: 3,
    registration,
    valid,
  });
  useAPIHandler();
  return {
    valid,
    user,
    bond,
    tab,
    coursesLoading,
    setCoursesLoading,
    setTab,
  };
}
export default function CoursesPage({
  registration,
}: {
  registration: string;
}) {
  const socket = useContext(SocketContext);
  const {
    valid,
    bond,
    user,
    tab,
    coursesLoading,
    setCoursesLoading,
    setTab,
  } = InitializeHooks({
    registration,
  });
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
      setCoursesLoading(true);
    }
  }, [registration, setCoursesLoading, socket, valid]);
  useEffect(() => {
    if (user?.fullName) {
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
  useEffect(() => {
    if (bond?.courses) {
      setCoursesLoading(false);
    }
  }, [
    bond?.activities,
    bond?.courses,
    registration,
    setCoursesLoading,
    socket,
  ]);
  return (
    <>
      <Head>
        <title>Turmas | sigaa-next</title>
      </Head>
      <HomeProvider
        loading={coursesLoading}
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
          <Courses bond={bond} />
          <Loading value={coursesLoading} />
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
