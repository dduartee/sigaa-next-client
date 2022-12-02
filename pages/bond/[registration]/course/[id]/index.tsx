import { courseTabs } from "@components/Home/CustomDrawer";
import HomeProvider from "@components/HomeProvider";
import Lessons from "@components/Lessons/Content";
import { SocketContext } from "@context/socket";
import useAPIHandler from "@hooks/useAPIEvents";
import useTabHandler from "@hooks/useTabHandler";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { Bond, Course } from "@types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
export default function LessonsPage({
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
      socket.on("lessons::list", (course: Course) => {
        setCourse(course);
        setLoading(false);
      });
      socket.emit("lessons::list", {
        token: localStorage.getItem("token"),
        registration,
        inactive: true,
        cache: true,
        courseId: id,
        identifier: `lessons@${registration}@${id}`,
      });
    }
    return () => {
      socket.off("lessons::list");
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
        <title>Tópicos de aula | {id} | sigaa-next</title>
      </Head>
      <HomeProvider
        loading={false}
        registration={registration}
        user={user}
        setTab={setTab}
        tab={tab}
        tabs={courseTabs}
      >
        <Lessons course={course} loading={loading} />
      </HomeProvider>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}
/**
 * <AccordionDetails>
        <Box component={Paper}>
          {latestNews?.content ? (
            <Accordion sx={{
              marginBottom: ".8rem",
              border: 0,
              ":first-of-type": {
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              },
              borderRadius: "10px",
              "::before": {
                height: "0px"
              }
            }} elevation={2}
              onChange={() => loadContent()}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                color="primary"
              >
                <Typography>Última notícia: {latestNews.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {latestNews.content.split("\n").map((item, key) => {
                  return <Typography key={key} style={{
                    marginBottom: ".3rem",
                    display: "block",
                  }}>{item}<br /></Typography>
                })}
              </AccordionDetails>

            </Accordion>
          ) : (
            <Box display={"flex"} justifyContent={"center"} borderRadius={"10px"} padding={1} component={Paper} elevation={2}>
              <CircularProgress sx={{ margin: "1rem" }} />
            </Box>
          )}
        </Box>
      </AccordionDetails>
 */
