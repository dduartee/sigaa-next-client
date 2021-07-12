import { Bond } from "@types";
import parseSlugPattern from "@util/parseSlugPattern";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Courses from "@templates/Courses";
import Schedules from "@templates/Schedules";
import Grades from "@templates/Grades";
import Homeworks from "@templates/Homeworks";
import News from "@templates/News";

export default function useTabHandler({
  slug,
  tab,
  data,
  setChildren,
  valid,
  setLoading,
  partialLoading,
}: {
  slug: string[];
  tab: number;
  data: Bond[];
  setChildren: React.Dispatch<React.SetStateAction<JSX.Element>>;
  valid: boolean;
  setLoading: React.Dispatch<boolean>;
  partialLoading: boolean;
}) {
  const { registration, actionPrimary, code, actionSecondary } =
    parseSlugPattern(slug);
  const router = useRouter();

  useEffect(() => {
    let defaultRoute = `/home/${registration}`;
    let route = "";
    let tabChildren = null as unknown as JSX.Element;
    switch (tab) {
      case 0:
        route = "/";
        tabChildren = Courses({ data });
        break;
      case 1:
        route = `/schedules`;
        tabChildren = Schedules({ data });
        break;
      case 2:
        route = `/grades`;
        tabChildren = Grades({ data, partialLoading });
        break;
      case 3:
        route = `/homeworks`;
        tabChildren = Homeworks({ data });
        break;
      case 4:
        route = `/news`;
        tabChildren = News({ data });
        break;
    }
    router.push(defaultRoute + route);
    setChildren(tabChildren);
    setLoading(false);
  }, [tab, data, valid, setChildren]);
  return;
}
