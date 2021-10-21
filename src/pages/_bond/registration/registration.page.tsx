import BottomTabs, { primaryActionTabs } from "@components/BottomTabs";
import CustomLink from "@components/CustomLink";
import useTabHandler from "@hooks/useTabHandler";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { BondRouterParams } from "../bond.router";

export default function RegistrationPage() {
  const params = useParams() as BondRouterParams;
  const registration = params.registration;
  const { tab, setTab } = useTabHandler({ page: "home" });
  return (
    <div>
      <h1>Bond Registration</h1>
      <p>{registration}</p>
      <CustomLink to={`${registration}/courses/`}>
        <Button>Courses</Button>
      </CustomLink>
      <CustomLink to={`${registration}/course/343`}>
        <Button>Course</Button>
      </CustomLink>
      <CustomLink to={`${registration}/news`}>
        <Button>News</Button>
      </CustomLink>
      <CustomLink to={`${registration}/grades`}>
        <Button>Grades</Button>
      </CustomLink>
      <CustomLink to={`${registration}/activities`}>
        <Button>Activities</Button>
      </CustomLink>
      <CustomLink to={`${registration}/schedules`}>
        <Button>Schedules</Button>
      </CustomLink>
      <BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={primaryActionTabs(params.registration)}
      />
    </div>
  );
}
