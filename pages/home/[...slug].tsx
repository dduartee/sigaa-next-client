import { Bond, UserInfo } from "@types";
import React, { useContext, useEffect, useState } from "react";
import Home from "@templates/_home";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useValidToken from "@hooks/useValidToken";
import { Box } from "@material-ui/core";
import { UserContext } from "@context/user";
import useUserLogin from "@hooks/useUserLogin";
import useUserCourses from "@hooks/useUserCourses";
import parseSlugPattern from "@util/parseSlugPattern";
import { DataContext } from "@context/data";
import getAction from "@util/getAction";
import Courses from "@components/Home/Courses";
import { useDebugValue } from "react";
import Schedules from "@components/Home/Schedules";

function Page({ slug }: { slug: string[] }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const valid = useValidToken();
  const { user, setUser } = useUserLogin();
  const { data } = useUserCourses();
  const [action, setAction] = useState<string | undefined>();
  const [tab, setTab] = useState(-1);
  const [children, setChildren] = useState(<div></div>);
  const [loading, setLoading] = useState(true);

  const { registration, actionPrimary, code, actionSecondary } =
    parseSlugPattern(slug);
  const actionSlug = getAction({
    registration,
    actionPrimary,
    code,
    actionSecondary,
  });

  useEffect(() => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("user") as string);
    if (valid && userInfo) {
      setUser(userInfo);
    } else router.push("/");
  }, [valid]);

  useEffect(() => {
    switch (actionSlug) {
      case "getCourses":
        setTab(0);
        socket.emit("courses::list", { token: localStorage.getItem("token"), registration })
        break;
      case "getBonds":
        setTab(1);
        break;
      case "getSchedulesOfBond":
        setTab(2);
        socket.emit("courses::list", { token: localStorage.getItem("token"), registration })
        break;
      default:
        break;
    }
  }, [actionSlug]);
  useEffect(() => {
    let redirectURL = `/home/${registration}`;
    setLoading(true);
    switch (tab) {
      case 0:
        redirectURL = `/home/${registration}`;
        setChildren(<Courses data={data} />)
        break;
      case 1:
        redirectURL = `/`;
        break;
      case 2:
        redirectURL = `/home/${registration}/schedules`;
        setChildren(<Schedules data={data} />)
        break;
      default:
        break;
    }
    console.log(`Redirecionando para ${redirectURL}`);
    router.push(redirectURL);
  }, [tab, data]);
  useEffect(() => {
    setLoading(false);
  }, [data])
  return (
    <UserContext.Provider value={user}>
      <DataContext.Provider value={data}>
        <Home setTab={setTab} tab={tab} loading={loading} setLoading={setLoading}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </Home>
      </DataContext.Provider>
    </UserContext.Provider>
  );
}
export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  return {
    props: { slug },
  };
}
export default Page;
