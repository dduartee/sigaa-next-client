import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
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
import { useRouter } from "next/router";

export default function CoursesPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;

  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const [bond, setBond] = useState<Bond | null>(null);
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
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
      setCoursesLoading(true);
    }
  }, [registration, setCoursesLoading, socket, valid]);
  useEffect(() => {
    if (user?.fullName && registration) {
        emitCourseList(
            {
          token: sessionStorage.getItem("token"),
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
      {registration ? (
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
      ) : null}
    </>
  );
}
