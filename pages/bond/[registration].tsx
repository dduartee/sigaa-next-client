import { Bond, UserInfo } from "@types";
import React, { useContext, useEffect, useState } from "react";
import Home from "@templates/_home";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
function Page({ registration }: any) {
  const socket = useContext(SocketContext);
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
    socket.emit("auth::valid", { token: localStorage.getItem("token") });

    socket.on("auth::valid", (valid: boolean) => {
      if (!valid) {
        localStorage.setItem("user", "");
        return router.push("/");
      } else {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
          setUser(JSON.parse(userInfo as string));
        } else {
          socket.emit("user::info", { token: localStorage.getItem("token") });
        }
        const coursesList = localStorage.getItem("json");
        if (!coursesList) {
          socket.emit("courses::list", {
            token: localStorage.getItem("token"),
            registration,
          });
        } else {
          setData(JSON.parse(localStorage.getItem("json") as string));
        }
      }
    });
    socket.on("courses::list", (received: string) => {
      setData(JSON.parse(received));
    });
    socket.on("user::info", (received: string) => {
      const { fullName, profilePictureURL } = JSON.parse(received);
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, profilePictureURL })
      );
      setUser({ fullName, profilePictureURL });
    });
  }, []);
  return <Home data={data} user={user} />;
}
export async function getServerSideProps(context: any) {
  const { registration } = context.query;
  return {
    props: { registration },
  };
}

export default Page;
