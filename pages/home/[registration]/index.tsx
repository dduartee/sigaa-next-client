import React, { useContext, useEffect, useState } from "react";
import Home from "@templates/Home";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import { UserContext } from "@context/user";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import useCoursesHandler from "@hooks/useCoursesHandler";
import parseSlugPattern from "@util/parseSlugPattern";
import { DataContext } from "@context/data";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIHandler";
import { LoadingContext } from "@context/loading";
import useCourseEvents, {
  emitCourseList,
} from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import AccordionCourse from "@components/Home/AccordionCourse";
import { Bond } from "@types";
import useTabHandler from "@hooks/useTabHandler";

function RegistrationPage({ registration }: { registration: string }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user, setUser } = useUserHandler({ valid });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const { data } = useCourseEvents();
  useTabHandler({tab, setLoading, registration, valid})
  useAPIHandler();
  console.log("Registration: " + registration);
  useEffect(() => {
    if (valid) {
      emitCourseList(
        { token: localStorage.getItem("token"), registration },
        socket
      );
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
    } else window.location.href = "/";
  }, [valid]);

  return (
    <>
      <Head>
        <title>Matérias | sigaa-next-client</title>
      </Head>
      <UserContext.Provider value={user}>
        <DataContext.Provider value={data}>
          <LoadingContext.Provider value={loading}>
            <Home setTab={setTab} tab={tab}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Courses data={data} />
              </Box>
            </Home>
          </LoadingContext.Provider>
        </DataContext.Provider>
      </UserContext.Provider>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}
export default RegistrationPage;

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
