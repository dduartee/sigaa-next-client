import React, { useContext, useEffect } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import useAPIHandler from "@hooks/useAPIEvents";
import { Box } from "@material-ui/core";
import Head from "next/head";
import useGradesEvents, {
  emitGradesList,
} from "@hooks/courses/useGradesEvents";
import useTabHandler from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Grades from "@components/Grades/Content";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";
import { useRouter } from "next/router";

export default function GradesPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;

  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  useAPIHandler();
  const { tab, setTab } = useTabHandler({
    order: 1,
    registration,
    valid,
  });
  const { bond, partialLoading, setPartialLoading } = useGradesEvents();
  useEffect(() => {
    if (valid && registration) {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
      emitGradesList(
        {
          registration,
          id: "grades",
          cache: true,
          inactive: true,
          token: sessionStorage.getItem("token"),
        },
        socket
      );
      setPartialLoading(true);
    } else window.location.href = "/";
  }, [registration, setPartialLoading, socket, valid]);
  return (
    <>
      <Head>
        <title>Notas | sigaa-next</title>
      </Head>
      {registration ? (
        <HomeProvider
          loading={partialLoading}
          registration={registration}
          user={user}
          setTab={setTab}
          tab={tab}
          tabs={bondTabs}
        >
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grades bond={bond} />
            <Loading value={partialLoading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}

