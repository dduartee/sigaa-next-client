import { Bond } from "@types";
import React from "react";
import AccordionCourse from "../components/Home/AccordionCourse";

export default function Courses({ data }: { data: Bond[] }) {
  return (
    <>
      {data?.map(({ courses }) =>
        courses?.map((course, key) => (
          <AccordionCourse key={key} title={course.title}>
            {course.code}
            {course.id}
            {course.period}
          </AccordionCourse>
        ))
      )}
    </>
  );
}
