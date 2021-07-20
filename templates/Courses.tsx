import { Bond } from "@types";
import Head from "next/head";
import React from "react";
import AccordionCourse from "../components/Home/AccordionCourse";

export default function Courses({ data }: { data: Bond[] }) {
  return (
    <>
      <Head>
        <title>Matérias | sigaa-next-client</title>
      </Head>
      {data?.map(({ courses }) =>
        courses?.map((course, key) => (
          <AccordionCourse key={key} title={course.title}></AccordionCourse>
        ))
      )}
    </>
  );
}
