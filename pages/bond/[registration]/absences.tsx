import React, { useContext, useEffect } from "react";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { Box } from "@material-ui/core";
import Head from "next/head";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Absences from "@components/Absences/Content";
import useAbsencesEvents from "@hooks/courses/useAbsencesEvents";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";
import { useRouter } from "next/router";

export default function GradesPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;

  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const { tab, setTab } = useTabHandler({
    order: BondTab.ABSENCES,
    registration,
    valid,
  });
  const { bond, partialLoading, setPartialLoading } = useAbsencesEvents();
  useEffect(() => {
    if (valid) {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
        socket.emit("absences::list", {
          registration,
          cache: true,
          inactive: true,
          id: "absences",
          token: sessionStorage.getItem("token"),
      });
      setPartialLoading(true);
    } else window.location.href = "/";
  }, [registration, setPartialLoading, socket, valid]);
  return (
    <>
      <Head>
        <title>Frequência | sigaa-next</title>
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
            <Absences bond={bond} />
            <Loading value={partialLoading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}
