import { Bond, UserInfo } from "@types";
import React, { useContext, useEffect, useState } from "react";
import Home from "@templates/_home";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useValidToken from "@hooks/useValidToken";
import useUserEvents from "@hooks/useUserEvents";
import { UserContext } from "@context/user";
import useUserLogin from "@hooks/useUserLogin";
import useUserCourses from "@hooks/useUserCourses";
import parseSlugPattern from "@util/parseSlugPattern";
import { DataContext } from "@context/data";
import getAction from "@util/getAction";
function Page({ slug }: { slug: string[] }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const valid = useValidToken();
  const { user, setUser } = useUserLogin();
  const { data } = useUserCourses();
  const { registration, actionPrimary, code, actionSecondary } =
    parseSlugPattern(slug);
  const [action, setAction] = useState<string | undefined>(
    getAction({ registration, actionPrimary, code, actionSecondary })
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") as string);
    if (valid && userInfo) {
      setUser(userInfo);

      switch (action) {
        case "getCourses":
          socket.emit("courses::list", {
            token: localStorage.getItem("token"),
            registration,
          });
          break;
        case "getCourseDetails":
          socket.emit("courses::details", {
            token: localStorage.getItem("token"),
            registration,
          });
          break;
        default:
          break;
      }
    } else {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    }
  }, [valid]);
  return (
    <UserContext.Provider value={user}>
      <DataContext.Provider value={data}>
        <Home />
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
