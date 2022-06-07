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
import AccordionCourse from "@components/Home/AccordionCourse";
import { Bond } from "@types";
import useTabHandler from "@hooks/useTabHandler";
import HomeProviders from "@components/homeProvider";
import { emitActivitiesList } from "@hooks/useBondsEvents";
import Activities from "@components/Activities/Content";

function InitializeHooks({ registration }: { registration: string }) {
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user } = useUserHandler({ valid });
  const [loading, setLoading] = useState(false);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const { data } = useCourseEvents(setActivitiesLoading);
  const { tab, setTab } = useTabHandler({
    order: 0,
    setLoading,
    registration,
    valid,
  });
  useAPIHandler();
  return { valid, loading, user, data, tab,activitiesLoading, setActivitiesLoading, setValid, setLoading, setTab };
}
export default function RegistrationPage({
  registration,
}: {
  registration: string;
}) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { valid, data, loading, user, tab, activitiesLoading, setActivitiesLoading, setTab } =
    InitializeHooks({
      registration,
    });
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitActivitiesList(
        { token: localStorage.getItem("token"), registration, inactive: false },
        socket
      );
      setActivitiesLoading(true)
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
    }
  }, [valid]);

  return (
    <>
      <Head>
        <title>Inicio | sigaa-next-client</title>
      </Head>
      <HomeProviders
        data={data}
        loading={loading}
        user={user}
        setTab={setTab}
        tab={tab}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {
            !activitiesLoading || data ? (
              <>
                <Activities data={data} loading={activitiesLoading} />
                <Courses data={data} />
              </>
            ) : (
              null
            )}

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

function Courses({ data }: { data: Bond[] }) {
  return (
    <>
      <Head>
        <title>Matérias | sigaa-next-client</title>
      </Head>
      {data?.map(({ courses }) =>
        courses?.map((course, key) => (
          <AccordionCourse key={key} title={course.title}></AccordionCourse>
        ))
      )}
    </>
  );
}
