import {
  initiateSocket,
  sendEvent,
  subscribeEvent,
} from "@services/api/socket";
import { Bond } from "@types";
import React, { useEffect, useState } from "react";
const Page = ({ registration }: any) => {
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
      console.log(valid);
      if (valid) {
        sendEvent("courses::list", {
          registration,
          token: localStorage.getItem("token"),
        });
      } else {
        localStorage.removeItem("token");
      }
    });
  }, []);
  useEffect(() => {
    subscribeEvent("courses::list", (received: string) => {
      setData(JSON.parse(received));
      console.log(data);
    });
  }, []);
  return data.map((value, key) => {
    return value.program;
  });
};

export async function getServerSideProps(context: any) {
  const { registration } = context.query;
  return {
    props: { registration },
  };
}

export default Page;
