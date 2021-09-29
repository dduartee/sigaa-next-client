import { DataContext } from "@context/data";
import { LoadingContext } from "@context/loading";
import { UserContext } from "@context/user";
import HomeTemplate from "@templates/Home";
import { Bond, UserInfo } from "@types";
import React from "react";

export default function homeProvider({
  children,
  loading,
  user,
  data,
  tab,
  setTab,
}: {
  children: React.ReactNode;
  loading: boolean;
  user: UserInfo;
  data: Bond[];
  tab: number;
  setTab: any;
}) {
  return (
    <UserContext.Provider value={user}>
      <DataContext.Provider value={data}>
        <LoadingContext.Provider value={loading}>
          <HomeTemplate setTab={setTab} tab={tab}>
            {children}
          </HomeTemplate>
        </LoadingContext.Provider>
      </DataContext.Provider>
    </UserContext.Provider>
  );
}
