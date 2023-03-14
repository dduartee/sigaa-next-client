import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import useCourseEvents from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import { Bond } from "@types";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import { emitActivitiesList, emitCourseList } from "@hooks/useBondsEvents";
import Activities from "@components/Activities/Content";
import HomeProvider from "@components/HomeProvider";
import { bondTabs } from "@components/Home/CustomDrawer";
import { useRouter } from "next/router";

export default function RegistrationPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;
  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const [bond, setBond] = useState<Bond | undefined>(undefined);
  useEffect(() => {
    const bondCached = JSON.parse(
      sessionStorage.getItem(`bond@${registration}`) || "{}"
    );
    if (bondCached) {
      setBond(bondCached);
    } else {
      sessionStorage.removeItem(`bond@${registration}`);
    }
  }, [registration]);
  const { activitiesLoading, setActivitiesLoading } = useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: BondTab.ACTIVITIES,
    registration,
    valid,
  });
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
      setActivitiesLoading(true);
    }
  }, [registration, setActivitiesLoading, socket, valid]);
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
      socket.on("courses::list", () => {
        emitActivitiesList(
          {
          token: sessionStorage.getItem("token"),
          registration,
          inactive: true,
          cache: true,
          id: "activities",
          },
          socket
        );
      })
      }
  }, [registration, socket, user?.fullName]);
  return (
    <>
      <Head>
        <title>Inicio | sigaa-next</title>
      </Head>
      {registration ? (
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
            <Activities bond={bond} loading={activitiesLoading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}