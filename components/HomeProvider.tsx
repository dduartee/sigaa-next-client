import { RegistrationContext } from "@context/registration";
import { LoadingContext } from "@context/loading";
import { UserContext } from "@context/user";
import HomeTemplate from "@templates/Home";
import { Tab, UserData } from "@types";
import React from "react";
import NoSSR from "react-no-ssr";

export default function HomeProvider(props: {
  children: React.ReactNode;
  loading: boolean;
  user?: UserData;
  registration?: string;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  tabs: Tab[];
}) {
  return (
    <NoSSR>
      <UserContext.Provider value={props.user}>
        <RegistrationContext.Provider value={props.registration}>
          <LoadingContext.Provider value={props.loading}>
            <HomeTemplate setTab={props.setTab} tab={props.tab} tabs={props.tabs}>
              {props.children}
            </HomeTemplate>
          </LoadingContext.Provider>
        </RegistrationContext.Provider>
      </UserContext.Provider>
    </NoSSR>
  );
}
