import { useParams } from "react-router-dom";
import { CourseRouterParams } from "./course.router";


export default function CourseIDPage() {
  const params = useParams() as CourseRouterParams;
  const { registration, courseID, action } = params;
  return (
    <div>
      <h1>CourseIDPage</h1>
      <p>
        <b>Registration:</b> {registration}
      </p>
      <p>
        <b>CourseID:</b> {courseID}
      </p>
    </div>
  );
}
