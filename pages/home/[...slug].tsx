import React, { useContext, useEffect, useState } from "react";
import Home from "@templates/_home";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import { UserContext } from "@context/user";
import useUserHandler from "@hooks/useUserHandler";
import useCoursesHandler from "@hooks/useCoursesHandler";
import parseSlugPattern from "@util/parseSlugPattern";
import { DataContext } from "@context/data";
import { GetServerSidePropsContext } from "next";
import useTabHandler from "@hooks/useTabHandler";
import useSlugHandler from "@hooks/useSlugHandler";

function Page({ slug }: { slug: string[] }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const valid = useTokenHandler();
  const { user, setUser } = useUserHandler({ valid });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(-1);
  const { data } = useCoursesHandler({ valid });
  const [children, setChildren] = useState(<div></div>);

  useSlugHandler({ setTab, slug })
  useTabHandler({ slug, data, valid, setChildren, tab })

  useEffect(() => {
    setLoading(true);
    if (valid) {
      socket.emit("user::info", { token: localStorage.getItem("token") })
    } else window.location.href = "/";
  }, [valid]);

  useEffect(() => setLoading(false), [data]);

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
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  return {
    props: { slug },
  };
}

export default Page;
