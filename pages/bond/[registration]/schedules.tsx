import React, { useEffect, useState } from "react";
import Head from "next/head";
import { UserData } from "@types";
import "moment/locale/pt-br";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Schedules from "@components/Schedules/Content";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { IBondDTOProps } from "@DTOs/BondDTO";
import { fetchCachedBond, storeBond } from "@hooks/useCachedBond";
import { fetchLogin, fetchCourses } from "@hooks/useHomeFetch";

export default function SchedulesPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [bond, setBond] = useState<IBondDTOProps | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { tab, setTab } = useTabHandler({
    order: BondTab.SCHEDULES,
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
      setLoading(true);
      fetchLogin(credentials).then((res) => {
        if (!res.error && res.data) {
          const { emails, fullName, profilePictureURL, token: newToken } = res.data;
          sessionStorage.setItem("token", newToken);
          setToken(newToken);
          setUser({ username, emails, fullName, profilePictureURL });
        }
      })
    }
  }, [registration, setLoading]);
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (user?.fullName && registration && username && token) {
      const credentials = { username, token, session: "", institution: "IFSC" }
      fetchCourses(credentials, registration).then(async ({ data: courses }) => {
        setLoading(false);
        setBond(() => {
          const newBond: IBondDTOProps = {
            courses, // terá que refatorar as tipagens de resposta dos endpoints,
            program: "",
            registration,
            type: "student",
            period: "",
            active: true,
            campus: ""
          }
          storeBond(newBond)
          return newBond;
        })
      })
    }
  }, [registration, token, user?.fullName]);
  return (
    <>
      <Head>
        <title>Horários | sigaa-next</title>
      </Head>
      {registration ? (

        <HomeProvider
          loading={loading}
          user={user}
          registration={registration}
          setTab={setTab}
          tab={tab}
          tabs={bondTabs}
        >
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Schedules bond={bond} />
            <Loading value={loading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}