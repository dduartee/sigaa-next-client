import React, { useEffect, useState } from "react";
import Head from "next/head";
import useTabHandler, { BondTab } from "@hooks/useTabHandler";
import HomeProvider from "@components/HomeProvider";
import Absences from "@components/Absences/Content";
import { bondTabs } from "@components/Home/CustomDrawer";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { IBondDTOProps } from "@DTOs/BondDTO";
import { ICourseDTOProps } from "@DTOs/CourseDTO";
import { storeBond } from "@hooks/useCachedBond";
import { fetchLogin, fetchCourses, fetchCourseAbsences } from "@hooks/useHomeFetch";
import { UserData } from "@types";

export default function GradesPage() {
  const router = useRouter();
  const registration = router.query.registration as string | undefined;

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [bond, setBond] = useState<IBondDTOProps | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [partialLoading, setPartialLoading] = useState(false);
  const { tab, setTab } = useTabHandler({
    order: BondTab.ABSENCES,
    registration,
  });
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    if (username && token) {
      const credentials = { username, token, session: "", institution: "IFSC" }
      setPartialLoading(true);
      fetchLogin(credentials).then((res) => {
        if (!res.error && res.data) {
          const { emails, fullName, profilePictureURL, token: newToken } = res.data;
          sessionStorage.setItem("token", newToken);
          setToken(newToken);
          setUser({ username, emails, fullName, profilePictureURL });
          if (registration) {
            fetchData(newToken);
          }
        }
      })
    }
  }, [registration, setPartialLoading]);
  const fetchData = (newToken: string) => {
    const username = sessionStorage.getItem("username");
    if (registration && username) {
      const credentials = { username, token: newToken, session: "", institution: "IFSC" }
      fetchCourses(credentials, registration).then(async ({ data: coursesList }) => {
        const courses: ICourseDTOProps[] = [];
        for (const course of coursesList) {
          await fetchCourseAbsences(credentials, registration, course.id).then(({ data: courseWithAbsences }) => {
            courses.push(courseWithAbsences);
            const newBond: IBondDTOProps = {
              courses,
              program: "",
              registration,
              type: "student",
              period: "",
              active: true,
              campus: ""
            }
            storeBond(newBond);
            setBond(newBond);
            return newBond;
          })
        }
      })
      setPartialLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Frequência | sigaa-next</title>
      </Head>
      {registration ? (

        <HomeProvider
          loading={partialLoading}
          registration={registration}
          user={user}
          setTab={setTab}
          tab={tab}
          tabs={bondTabs}
        >
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Absences bond={bond} />
            <Loading value={partialLoading} />
          </Box>
        </HomeProvider>
      ) : null}
    </>
  );
}
