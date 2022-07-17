import { RegistrationContext } from "@context/registration";
import { LoadingContext } from "@context/loading";
import { UserContext } from "@context/user";
import HomeTemplate from "@templates/Home";
import { UserData } from "@types";
import React from "react";

export default function HomeProvider({
  children,
  loading,
  user,
  registration,
  tab,
  setTab,
}: {
  children: React.ReactNode;
  loading: boolean;
  user: UserData | null;
  registration: string;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <UserContext.Provider value={user}>
      <RegistrationContext.Provider value={registration}>
        <LoadingContext.Provider value={loading}>
          <HomeTemplate setTab={setTab} tab={tab}>
            {children}
          </HomeTemplate>
        </LoadingContext.Provider>
      </RegistrationContext.Provider>
    </UserContext.Provider>
  );
}
