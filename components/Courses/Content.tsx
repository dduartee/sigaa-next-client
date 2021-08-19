import React, {  } from "react";
import Head from "next/head";
import AccordionCourse from "@components/Home/AccordionCourse";
import { Bond } from "@types";

export default function Courses({ data }: { data: Bond[] }) {
    return (
      <>
        <Head>
          <title>Matérias | sigaa-next-client</title>
        </Head>
        {data?.map(({ courses }) =>
          courses?.map((course, key) => (
            <AccordionCourse key={key} title={course.title} ></AccordionCourse>
          ))
        )}
      </>
    );
  }