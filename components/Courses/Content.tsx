import React, { useContext } from "react";
import AccordionCourse from "@components/Home/AccordionCourse";
import { Bond, Course } from "@types";
import { Box, CircularProgress, Paper, Typography } from "@material-ui/core";
import { RegistrationContext } from "@context/registration";

export default function Courses({ bond, loading }: { bond: Bond | null, loading: boolean }) {
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

  return (
    <Box padding={2}>
      <Typography textAlign="center" fontWeight="500" fontSize={"1.5em"} whiteSpace="break-spaces" mb={2}>
        Matérias
      </Typography>
      {loading || !courses ? (
        <Box display={"flex"} justifyContent={"center"} borderRadius={"10px"} elevation={2}
          component={Paper} padding={1}>
          <CircularProgress style={{ margin: "1rem" }} />
        </Box>
      ) : (
        <Box>
          {courses?.map((course, key) => {
            return <CourseContent key={key} course={course} />
          })
          }
        </Box>
      )}
    </Box>

  );
}

function CourseContent(props: { course: Course }) {
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const loadContent = () => {
    setContent(<div></div>);
  }
  return (
    <AccordionCourse title={props.course.title} loadContent={loadContent}>
      {content}
    </AccordionCourse>
  )
}