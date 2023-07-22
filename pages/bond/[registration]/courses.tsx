import React, { useEffect, useState } from "react";
import Head from "next/head";
import { UserData } from "@types";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Courses from "@components/Courses/Content";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { IBondDTOProps } from "@DTOs/BondDTO";
import { fetchCourses, fetchLogin } from "@hooks/useHomeFetch";
import { fetchCachedBond, storeBond } from "@hooks/useCachedBond";

const sigaaURL = "https://sigrh.ifsc.edu.br"

export default function CoursesPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [bond, setBond] = useState<IBondDTOProps | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const { tab, setTab } = useTabHandler({
    order: BondTab.COURSES,
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
      const credentials = { username, token, session: "", sigaaURL }
      setCoursesLoading(true);
      fetchLogin(credentials).then((res) => {
        if (!res.error && res.data) {
          const { emails, fullName, profilePictureURL, token: newToken } = res.data;
          sessionStorage.setItem("token", newToken);
          setToken(newToken);
          setUser({ username, emails, fullName, profilePictureURL });
        }
      })
    }
  }, [registration, setCoursesLoading]);
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (user?.fullName && registration && username && token) {
      const credentials = { username, token, session: "", sigaaURL }
      fetchCourses(credentials, registration).then(async ({ data: courses }) => {
        setCoursesLoading(false);
        setBond(() => {
          const newBond: IBondDTOProps = {
            courses, // terá que refatorar as tipagens de resposta dos endpoints,
            program: "",
            registration,
            type: "student",
            period: "",
            active: true,
            campus: {
              name: "IFSC",
              institution: "IFSC",
              acronym: "IFSC",
            }
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
        <title>Turmas | sigaa-next</title>
      </Head>
      {registration ? (
        <HomeProvider
          loading={coursesLoading}
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
            <Courses bond={bond} />
            <Loading value={coursesLoading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}
