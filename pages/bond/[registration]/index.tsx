import React, { useEffect, useState } from "react";
import useCourseEvents from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import { Bond, UserData } from "@types";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import Activities from "@components/Activities/Content";
import HomeProvider from "@components/HomeProvider";
import { bondTabs } from "@components/Home/CustomDrawer";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { fetchCourses, fetchLogin } from "@pages/nuncamais";

export default function RegistrationPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [bond, setBond] = useState<Bond | undefined>(undefined);
  useEffect(() => {
    const bondCached = JSON.parse(
      sessionStorage.getItem(`bond@${registration}`) || "{}"
    );
    if (bondCached) {
      setBond(bondCached);
    } else {
      sessionStorage.removeItem(`bond@${registration}`);
    }
  }, [registration]);
  const { activitiesLoading, setActivitiesLoading } = useCourseEvents(setBond);
  const { tab, setTab } = useTabHandler({
    order: BondTab.ACTIVITIES,
    registration,
  });
  const sigaaURL = "https://sigaa.ifsc.edu.br"
  const getUserInfo = async (username: string, token: string) => {
    const credentials = { username, token, sigaaURL, session: "" }
    const res = await fetchLogin(credentials)
    if (!res.error && res.data) {
      const { emails, fullName, profilePictureURL, token: newToken } = res.data
      sessionStorage.setItem("token", newToken)
      setUser({ username, emails, fullName, profilePictureURL })
    }
  }
  const getCourses = async (username: string, token: string, registration: string) => {
    const credentials = { username, token, sigaaURL, session: "" }
    const res = await fetchCourses(credentials, registration);
    if (!res.error && res.data) {
      setBond({program: "", registration, active: true, activities: [], courses: res.data, period: "", type: "student"})
    }
  }
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    if (username && token) {
      getUserInfo(username, token)
      setActivitiesLoading(true);
    }
  }, [registration, setActivitiesLoading]);
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    if (user?.fullName && registration && username && token) {
      getCourses(username, token, registration).then(() => {
        // getActivities()
      })
      
    }
  }, [registration, user?.fullName]);
  return (
    <>
      <Head>
        <title>Inicio | sigaa-next</title>
      </Head>
      {registration ? (
        <HomeProvider
          loading={activitiesLoading}
          user={user}
          registration={registration}
          setTab={setTab}
          tab={tab}
          tabs={bondTabs}
        >
          <Box
            sx={{ flexGrow: 1, p: 1 }}
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            maxWidth={"100%"}
          >
            <Activities bond={bond} loading={activitiesLoading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}