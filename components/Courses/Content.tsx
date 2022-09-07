import React, { useContext } from "react";
import { Bond, Course } from "@types";
import { Accordion, AccordionSummary, Box, CircularProgress, Paper, Typography } from "@material-ui/core";
import { RegistrationContext } from "@context/registration";
import { useRouter } from "next/router";

export default function Courses({ bond, loading }: { bond: Bond | null, loading: boolean }) {
  const router = useRouter();
  const registration = useContext(RegistrationContext)
  const [courses, setCourses] = React.useState<Course[] | null>(null);
  React.useEffect(() => {
    if (bond?.courses) {
      setCourses(bond.courses);
    }
  }, [bond, registration]);

  React.useEffect(() => {
    const coursesCached = JSON.parse(localStorage.getItem(`courses-${registration}`) || "{}");
    if (coursesCached) {
      const timestamp = new Date(coursesCached.timestamp);
      const now = new Date();
      if (now.getTime() - timestamp.getTime() < 1000 * 60 * 60 * 24) {
        setCourses(coursesCached.courses);
      } else {
        localStorage.removeItem(`courses-${registration}`);
      }
    }
  }, [registration]);
  const accessCourse = (course: Course) => {
    router.push(`/bond/${registration}/course/${course.id}`);
  }
  return (
    <Box padding={2} minWidth={"50%"}>
      <Typography textAlign="center" fontWeight="500" fontSize={"1.5em"} whiteSpace="break-spaces" mb={2}>
        Matérias
      </Typography>
      {loading || !courses ? (
        <Box display={"flex"} justifyContent={"center"} borderRadius={"10px"} padding={1}>
          <CircularProgress style={{ margin: "1rem" }} />
        </Box>
      ) : (
        <Box>
          {courses?.map((course, key) => {
            return <CourseContent key={key} course={course} accessCourse={accessCourse} />
          })
          }
        </Box>
      )}
    </Box>

  );
}

function CourseContent(props: { course: Course, accessCourse: (course: Course) => void }) {
  return (
    <Accordion sx={{
      marginBottom: ".8rem",
      border: 0,
      ":first-of-type": {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      },
      borderRadius: "10px",
      "::before": {
        height: "0px"
      }
    }} elevation={2}
      expanded={false}
      onChange={() => {
        //props.accessCourse(props.course);
      }}
    >
      <AccordionSummary
        color="primary"
      >
        <Typography>{props.course.title}</Typography>
      </AccordionSummary>
    </Accordion>
  )
}