import {
  initiateSocket,
  sendEvent,
  subscribeEvent,
} from "@services/api/socket";
import { Bond, UserInfo } from "@types";
import React, { useEffect, useState } from "react";
import Home from "@templates/_home";
import { useRouter } from "next/router";
const Page = ({ registration }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<UserInfo>({
    fullName: "",
    profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png",
  });
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
    },
  ]);
  useEffect(() => {
    initiateSocket();
    sendEvent("auth::valid", { token: localStorage.getItem("token") });

    subscribeEvent("auth::valid", (valid: boolean) => {
      if (!valid) {
        localStorage.setItem("user", "")
        return router.push("/");
      } else {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
          setUser(JSON.parse(userInfo as string));
        } else {
          sendEvent("user::info", { token: localStorage.getItem("token") });
        }
        const coursesList = localStorage.getItem("json");
        if (!coursesList) {
          sendEvent("courses::list", {
            token: localStorage.getItem("token"),
            registration,
          });
        } else {
          setData(JSON.parse(localStorage.getItem("json") as string));
        }
      }
    });
    subscribeEvent("courses::list", (received: string) => {
      localStorage.setItem("json", received);
      setData(JSON.parse(received));
    });
    subscribeEvent("user::info", (received: string) => {
      const { fullName, profilePictureURL } = JSON.parse(received);
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, profilePictureURL })
      );
      setUser({ fullName, profilePictureURL });
    });
  }, []);
  return <Home data={data} user={user} />;
};

export async function getServerSideProps(context: any) {
  const { registration } = context.query;
  return {
    props: { registration },
  };
}

export default Page;
