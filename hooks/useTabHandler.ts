import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function useTabHandler({
  order,
  valid,
  setLoading,
  registration,
}: {
  order: number;
  valid: boolean;
  setLoading: React.Dispatch<boolean>;
  registration: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState(order);
  useEffect(() => {
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
<<<<<<< HEAD
        route = `/home/${registration}/homeworks`;
=======
        route = `/homeworks`;
        tabChildren = Homeworks({ data, partialLoading });
>>>>>>> cc94b52c1fe5cfd5a7c580462cbaa7a874ac5258
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
  return { tab, setTab, order, valid, setLoading, registration };
}
