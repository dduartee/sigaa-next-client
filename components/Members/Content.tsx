import { Course } from "@types";
import { useEffect } from "react";

export default function MembersContent(props: {
    course: Course;
    loading: boolean;
}) {
    useEffect(() => {
        console.debug(props.course.members)
    }, [course])
}