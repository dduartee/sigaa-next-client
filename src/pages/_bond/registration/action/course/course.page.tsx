import BottomTabs, { secondaryActionTabs } from "@components/BottomTabs";
import CustomLink from "@components/CustomLink";
import useTabHandler from "@hooks/useTabHandler";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { CourseRouterParams } from "./course.router";

export default function CourseIDPage() {
  const params = useParams() as CourseRouterParams;
  const { setTab, tab } = useTabHandler({ page: "course" });
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
      <BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={secondaryActionTabs(params.registration, params.courseID)}
      />
    </div>
  );
}
