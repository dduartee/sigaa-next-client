import CustomLink from "@components/CustomLink";
import { useParams } from "react-router-dom";
import { BondRouterParams } from "./registration.router";

export default function RegistrationPage() {
  const params = useParams() as BondRouterParams;
  const { registration } = params;
  return (
    <div>
      <h1>Bond Registration</h1>
      <p>{registration}</p>
      <CustomLink to={`${registration}/courses/`}>Courses</CustomLink>
      <CustomLink to={`${registration}/course/343`}>Course</CustomLink>
      <CustomLink to={`${registration}/news`}>News</CustomLink>
      <CustomLink to={`${registration}/grades`}>Grades</CustomLink>
      <CustomLink to={`${registration}/activities`}>Activities</CustomLink>
      <CustomLink to={`${registration}/schedules`}>Schedules</CustomLink>
    </div>
  );
}
