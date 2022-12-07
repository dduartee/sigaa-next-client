import { courseTabs } from "@components/Home/CustomDrawer";
import HomeProvider from "@components/HomeProvider";
import { SocketContext } from "@context/socket";
import useAPIHandler from "@hooks/useAPIEvents";
import useTabHandler from "@hooks/useTabHandler";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { Bond, Course } from "@types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
export default function MembersPage({
  registration,
  id,
}: {
  registration: string;
  id: string;
}) {
  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user } = useUserHandler();
  const [bond, setBond] = useState<Bond | null>(null);
  useEffect(() => {
    const bondCached = JSON.parse(
      localStorage.getItem(`bond@${registration}`) || "{}"
    );
    if (bondCached) {
      setBond(bondCached);
    } else {
      localStorage.removeItem(`bond@${registration}`);
    }
  }, [registration]);
  const [loading, setLoading] = useState(true);
  useAPIHandler();
  useEffect(() => {
    if (!valid) window.location.href = "/";
    else {
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
      setLoading(true);
    }
  }, [registration, setLoading, socket, valid]);
  const [course, setCourse] = useState<Course>();
  useEffect(() => {
    if (user?.fullName) {
      socket.on("members::list", (course: Course) => {
        setCourse(course);
        setLoading(false);
      });
      socket.emit("members::list", {
        token: localStorage.getItem("token"),
        registration,
        inactive: true,
        cache: true,
        courseId: id,
        identifier: `members@${registration}@${id}`,
      });
    }
    return () => {
      socket.off("members::list");
    };
  }, [id, registration, setLoading, socket, user?.fullName]);
  const { tab, setTab } = useTabHandler({
    order: 1,
    registration,
    courseId: id,
    valid,
  });
  return (
    <>
      <Head>
        <title>Membros | {id} | sigaa-next</title>
      </Head>
      <HomeProvider
        loading={false}
        registration={registration}
        user={user}
        setTab={setTab}
        tab={tab}
        tabs={courseTabs}
      >
        <Members course={course} loading={loading} />
      </HomeProvider>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}
