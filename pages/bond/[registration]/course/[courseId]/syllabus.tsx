import { courseTabs } from "@components/Home/CustomDrawer";
import HomeProvider from "@components/HomeProvider";
import Syllabus from "@components/Syllabus/Content";
import { SocketContext } from "@context/socket";
import useTabHandler, { CourseTab } from "@hooks/useTabHandler";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { Course } from "@types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";

export default function SyllabusPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;
  const courseId = router.query.courseId as string;
  const socket = useContext(SocketContext);
  const [loading, setLoading] = useState(true);
  const { user } = useUserHandler();

  const valid = useTokenHandler();
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: sessionStorage.getItem("token") }, socket);
      setLoading(true);
    }
  }, [registration, setLoading, socket, valid]);
  const { tab, setTab } = useTabHandler({
    order: CourseTab.SYLLABUS,
    registration,
    courseId,

  });
  const [course, setCourse] = useState<Course>();

  const updateSyllabus = useCallback(async (cache = true) => {
    if (user && user.fullName && registration && courseId) {
      setCourse(undefined);
      setLoading(true);
      socket.on("syllabus::content", (course: Course) => {
        setCourse(course);
        setLoading(false);
      });
      socket.emit("syllabus::content", {
        token: sessionStorage.getItem("token"),
        registration,
        inactive: true,
        cache,
        courseId,
      });
    }
  }, [user, registration, courseId, socket]);
  useEffect(() => {
    (async () => {
      await updateSyllabus();
    })()
  }, [updateSyllabus]);
  return (
    <>
      <Head>
        <title>Plano de ensino | {courseId} | sigaa-next</title>
      </Head>
      <HomeProvider
        loading={loading}
        registration={registration}
        user={user}
        setTab={setTab}
        tab={tab}
        tabs={courseTabs}
      >
        <Syllabus course={course} updateSyllabus={() => updateSyllabus(false)} loading={loading} />
      </HomeProvider>
    </>
  );
}