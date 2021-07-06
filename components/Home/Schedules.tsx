import { Bond } from "@types";
import React from "react";
import AccordionCourse from "../AccordionCourse";

export default function Schedules({ data }: { data: Bond[] }) {
  return (
    <>
      {data?.map(({ courses }) =>
        courses?.map((course, key) => (
          <AccordionCourse key={key} title={course.title}>
            {course.schedule}
          </AccordionCourse>
        ))
      )}
    </>
  );
}
