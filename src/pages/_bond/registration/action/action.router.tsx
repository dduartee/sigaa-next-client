import BottomTabs from "@components/BottomTabs";
import { BondRouterParams } from "@pages/_bond/bond.router";
import CoursesPage from "@pages/_bond/registration/action/courses.page";
import { useState } from "react";
import { useRouteMatch, Route, Switch, useParams } from "react-router-dom";
import ActivitiesPage from "./activities.page";
import CourseRouter from "./course/course.router";
import GradesPage from "./grades.page";
import NewsPage from "./news.page";
import SchedulePage from "./schedules.page";
export interface ActionRouterParams extends BondRouterParams {
  action: string;
}
export default function ActionRouter() {
  const match = useRouteMatch();
  const params = useParams() as BondRouterParams;
  return (
    <>
      <Switch>
        <Route path={`${match.path}/courses`} exact>
          <CoursesPage />
        </Route>
        <Route path={`${match.path}/course`}>
          <CourseRouter />
        </Route>
        <Route path={`${match.path}/news`} exact>
          <NewsPage />
        </Route>
        <Route path={`${match.path}/grades`} exact>
          <GradesPage />
        </Route>
        <Route path={`${match.path}/activities`} exact>
          <ActivitiesPage />
        </Route>
        <Route path={`${match.path}/schedules`} exact>
          <SchedulePage />
        </Route>
      </Switch>
    </>
  );
}
