import React, { useContext } from "react";
import { Bond, Course } from "@types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@material-ui/core";
import { RegistrationContext } from "@context/registration";
import { useRouter } from "next/router";
import { ChevronRight } from "@material-ui/icons";

export default function Courses({
  bond,
}: {
  bond: Bond | null;
}) {
  const router = useRouter();
  const accessCourse = (registration: string, courseId: string) => {
    router.push(`/bond/${registration}/course/${courseId}`);
  };
  const registration = useContext(RegistrationContext);
  const [courses, setCourses] = React.useState<Course[] | null>(null);
  React.useEffect(() => {
    if (bond?.courses) {
      setCourses(bond.courses);
    }
  }, [bond, registration]);
  React.useEffect(() => {
    const coursesCached = JSON.parse(
      sessionStorage.getItem(`courses-${registration}`) || "{}"
    );
    if (coursesCached) {
      const timestamp = new Date(coursesCached.timestamp);
      const now = new Date();
      if (now.getTime() - timestamp.getTime() < 1000 * 60 * 60 * 24) {
        setCourses(coursesCached.courses);
      } else {
        sessionStorage.removeItem(`courses-${registration}`);
      }
    }
  }, [registration]);
  return (
    <Box padding={2} minWidth={"50%"}>
      <Typography
        textAlign="center"
        fontWeight="500"
        fontSize={"1.5em"}
        whiteSpace="break-spaces"
        mb={2}
      >
        Turmas
      </Typography>
      <Box>
        {registration &&
          courses?.map((course, key) => {
            return (
              <CourseContent
                key={key}
                course={course}
                accessCourse={() => accessCourse(registration, course.id)}
              />
            );
          })}
      </Box>
    </Box>
  );
}

function CourseContent(props: {
  course: Course;
  accessCourse: (course: Course) => void;
}) {
  return (
    <Accordion
      sx={{
        marginBottom: ".8rem",
        border: 0,
        ":first-of-type": {
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        },
        borderRadius: "10px",
        "::before": {
          height: "0px",
        },
      }}
      elevation={2}
      expanded={false}
      onChange={() => {
        props.accessCourse(props.course);
      }}
    >
      <AccordionSummary color="primary" expandIcon={<ChevronRight />}>
        <Typography>{props.course.title}</Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
}
