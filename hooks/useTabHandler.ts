import { Bond } from "@types";
import parseSlugPattern from "@util/parseSlugPattern";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function useTabHandler({
  tab,
  valid,
  setLoading,
  registration,
}: {
  tab: number;
  valid: boolean;
  setLoading: React.Dispatch<boolean>;
  registration: string;
}) {
  const router = useRouter();

  useEffect(() => {
    let defaultRoute = `/home/${registration}`;
    let route = "";
    switch (tab) {
      case 0:
        route = `/home/${registration}/`;
        break;
      case 1:
        route = `/home/${registration}/schedules`;
        break;
      case 2:
        route = `/home/${registration}/grades`;
        break;
      case 3:
        route = `/home/${registration}/homeworks`;
        break;
      case 4:
        route = `/home/${registration}/news`;
        break;
      default:
        route = "/";
        break;
    }
    router.push(route);
    setLoading(false);
  }, [tab, valid]);
  return;
}
