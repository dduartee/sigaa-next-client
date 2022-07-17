import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useTabHandler({
  order,
  valid,
  registration,
}: {
  order: number;
  valid: boolean;
  registration: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState(order);
  useEffect(() => {
    let route = "";
    switch (tab) {
      case 0:
        route = `/bond/${registration}/`;
        break;
      case 1:
        route = `/bond/${registration}/grades`;
        break;
      case 2:
        route = `/bond/${registration}/schedules`;
        break;
      /*case 3:
        route = `/bond/${registration}/homeworks`;
        break;
      case 4:
        route = `/bond/${registration}/news`;
        break;*/
      default:
        route = "/";
        break;
    }
    if(route === "/") {
      window.location.href = "/";
    } else {
      router.push(route);
    }
  }, [registration, tab]);
  return { tab, setTab, order, valid, registration };
}
