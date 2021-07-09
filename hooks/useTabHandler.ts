import { Bond } from "@types";
import parseSlugPattern from "@util/parseSlugPattern";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Courses from "@components/Home/Courses";
import Schedules from "@components/Home/Schedules";
import Grades from "@components/Home/Grades"
import Homeworks from "@components/Home/Homeworks";
import News from "@components/Home/News";

export default function useTabHandler({ slug, tab, data, setChildren, valid }: { slug: string[], tab: number, data: Bond[], setChildren: React.Dispatch<React.SetStateAction<JSX.Element>>, valid: boolean }) {
    const { registration, actionPrimary, code, actionSecondary } =
        parseSlugPattern(slug);
    const router = useRouter()
    useEffect(() => {
        let defaultRoute = `/home/${registration}`;
        let route = "";
        let tabChildren = null as unknown as JSX.Element;
        switch (tab) {
            case 0:
                route = "/";
                tabChildren = Courses({ data })
                break;
            case 1:
                route = `/schedules`;
                tabChildren = Schedules({ data })
                break;
            case 2:
                route = `/grades`;
                tabChildren = Grades({ data })
                break;
            case 3:
                route = `/homeworks`;
                tabChildren = Homeworks({ data })
                break;
            case 4:
                route = `/news`;
                tabChildren = News({ data })
                break;
        }
        router.push(defaultRoute + route);
        setChildren(tabChildren);
    }, [tab, data, valid, setChildren]);
    return;
}