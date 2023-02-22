import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import useCourseEvents, {
} from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import { Bond } from "@types";
import "moment/locale/pt-br";
import useTabHandler from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Schedules from "@components/Schedules/Content";
import { emitCourseList } from "@hooks/useBondsEvents";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";
function InitializeHooks({ registration }: { registration: string }) {
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const [loading] = useState(false);
  const [bond, setBond] = useState<Bond | null>(null);
  useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: 4,
    registration,
    valid,
  });
  useAPIHandler();
  return {
    valid,
    user,
    loading,
    bond,
    tab,
    setTab,
  };
}
export default function SchedulesPage({ registration }: { registration: string }) {
  const socket = useContext(SocketContext);
  const { valid, user, loading, bond, tab, setTab } = InitializeHooks({
    registration,
  });
  useEffect(() => {
    if (valid) {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
      emitCourseList(
        { token: sessionStorage.getItem("token"), registration, allPeriods: false, cache: true, inactive: true, id: "schedules" },
        socket
      );
    } else window.location.href = "/";
  }, [registration, socket, valid]);

  return (
    <>
      <Head>
        <title>Horários | sigaa-next</title>
      </Head>
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
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}