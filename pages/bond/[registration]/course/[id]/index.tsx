import { courseTabs } from "@components/Home/CustomDrawer";
import HomeProvider from "@components/HomeProvider";
import Lessons from "@components/Lessons/Content";
import { SocketContext } from "@context/socket";
import useAPIHandler from "@hooks/useAPIEvents";
import useTabHandler from "@hooks/useTabHandler";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { Course } from "@types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
export default function LessonsPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;
  const id = router.query.id as string;
  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const [loading, setLoading] = useState(true);
  useAPIHandler();
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
      setLoading(true);
    }
  }, [registration, setLoading, socket, valid]);
  const [course, setCourse] = useState<Course>();
  const getLessons = (cache: boolean) => {
    setCourse(undefined);
    setLoading(true);
    socket.emit("lessons::list", {
      token: sessionStorage.getItem("token"),
      registration,
      inactive: true,
      cache,
      courseId: id,
    });
  }
  useEffect(() => {
    if (user?.fullName && registration && id) {
        socket.on("lessons::list", (course: Course) => {
          setCourse(course);
          setLoading(false);
        });
        getLessons(true);
      }
    return () => {
      socket.off("lessons::list");
    };
  }, [id, registration, setLoading, socket, user?.fullName]);
  const { tab, setTab } = useTabHandler({
    order: 0,
    registration,
    courseId: id,
    valid,
  });
  return (
    <>
      <Head>
        <title>Tópicos de aula | {id} | sigaa-next</title>
      </Head>
      {registration ? (
        <HomeProvider
          loading={loading}
          registration={registration}
          user={user}
          setTab={setTab}
          tab={tab}
          tabs={courseTabs}
        >
          <Lessons course={course} getLessons={getLessons} loading={loading} />
        </HomeProvider>
      ) : null}
    </>
  );
}
