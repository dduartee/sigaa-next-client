import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import useCourseEvents from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import { Bond } from "@types";
import "moment/locale/pt-br";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Schedules from "@components/Schedules/Content";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import { emitCourseList } from "@hooks/useBondsEvents";

export default function SchedulesPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;
  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const [loading] = useState(false);
  const [bond, setBond] = useState<Bond | undefined>(undefined);
  useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: BondTab.SCHEDULES,
    registration,
    valid,
  });
  useEffect(() => {
    if (valid && registration) {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
    } else window.location.href = "/";
  }, [registration, socket, valid]);
  useEffect(() => {
    if (user?.fullName && registration) {
      emitCourseList(
        { token: sessionStorage.getItem("token"), registration, allPeriods: false, cache: true, inactive: true, id: "schedules" },
        socket
      );
    }
  }, [registration, socket, user?.fullName]);
  return (
    <>
      <Head>
        <title>Horários | sigaa-next</title>
      </Head>
      {registration ? (

        <HomeProvider
          loading={loading}
          user={user}
          registration={registration}
          setTab={setTab}
          tab={tab}
          tabs={bondTabs}
        >
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Schedules bond={bond} />
            <Loading value={loading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}