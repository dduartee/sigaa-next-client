import React, { useEffect, useState } from "react";
import Head from "next/head";
import { UserData } from "@types";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import Activities from "@components/Activities/Content";
import HomeProvider from "@components/HomeProvider";
import { bondTabs } from "@components/Home/CustomDrawer";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { fetchActivities, fetchCourses, fetchLogin } from "@hooks/useHomeFetch";
import { IBondDTOProps } from "@DTOs/BondDTO";
import { fetchCachedBond, storeBond } from "@hooks/useCachedBond";

export default function RegistrationPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [bond, setBond] = useState<IBondDTOProps | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const { tab, setTab } = useTabHandler({
    order: BondTab.ACTIVITIES,
    registration,
  });
  useEffect(() => {
    if(registration) {
      const cachedBond = fetchCachedBond(registration);
      if(cachedBond) setBond(cachedBond)
    }
  }, [registration])

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    if (username && token) {
      const credentials = { username, token, session: "", institution: "IFSC" }
      setActivitiesLoading(true);
      fetchLogin(credentials).then((res) => {
        if (!res.error && res.data) {
          const { emails, fullName, profilePictureURL, token: newToken } = res.data;
          sessionStorage.setItem("token", newToken);
          setToken(newToken);
          setUser({ username, emails, fullName, profilePictureURL });
        }
      })
    }
  }, [registration, setActivitiesLoading]);
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (user?.fullName && registration && username && token) {
      const credentials = { username, token, session: "", institution: "IFSC" }
      fetchCourses(credentials, registration).then(async ({ data: courses }) => {
        const { data: activities } = await fetchActivities(credentials, registration)
        setActivitiesLoading(false);
        setBond(() => {
          const newBond: IBondDTOProps = {
            courses, // terá que refatorar as tipagens de resposta dos endpoints
            activities,
            program: "",
            registration,
            type: "student",
            period: "",
            active: true,
            campus: ""
          }
          storeBond(newBond);
          return newBond;
        })
      })
    }
  }, [registration, token, user?.fullName]);
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