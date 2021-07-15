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
import useAPIHandler from "@hooks/useAPIHandler";
import { LoadingContext } from "@context/loading";

function Page({ slug }: { slug: string[] }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user, setUser } = useUserHandler({ valid });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(-1);
  const { data, partialLoading } = useCoursesHandler({ valid });
  const [children, setChildren] = useState(<div></div>);

  useAPIHandler();
  useSlugHandler({ setTab, slug, setLoading });
  useTabHandler({ slug, data, valid, tab, setLoading, setChildren, partialLoading });

  useEffect(() => {
    if (valid) {
      socket.emit("user::info", { token: localStorage.getItem("token") });
    } else window.location.href = "/";
  }, [valid]);

  return (
    <UserContext.Provider value={user}>
      <DataContext.Provider value={data}>
        <LoadingContext.Provider value={loading}>
          <Home setTab={setTab} tab={tab}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
          </Home>
        </LoadingContext.Provider>
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
