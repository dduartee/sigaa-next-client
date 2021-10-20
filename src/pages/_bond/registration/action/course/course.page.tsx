import CustomLink from "@components/CustomLink";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { CourseRouterParams } from "./course.router";

export default function CourseIDPage() {
  const params = useParams() as CourseRouterParams;
  const { registration, courseID } = params;
  return (
    <div>
      <h1>CourseIDPage</h1>
      <p>
        <b>Registration:</b> {registration}
      </p>
      <p>
        <b>CourseID:</b> {courseID}
      </p>
      <CustomLink to={`${courseID}/news`}>
        <Button>News</Button>
      </CustomLink>
      <CustomLink to={`${courseID}/grades`}>
        <Button>Grades</Button>
      </CustomLink>
      <CustomLink to={`${courseID}/activities`}>
        <Button>Activities</Button>
      </CustomLink>
    </div>
  );
}
