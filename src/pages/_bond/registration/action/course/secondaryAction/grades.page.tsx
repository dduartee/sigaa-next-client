import BottomTabs, { secondaryActionTabs } from "@components/BottomTabs";
import useTabHandler from "@hooks/useTabHandler";
import { useParams } from "react-router";
import { SecondaryActionRouterParams } from "./secondaryAction.router";

export default function GradesSecondaryPage() {
  const params = useParams() as SecondaryActionRouterParams;
  const { setTab, tab } = useTabHandler({ page: "grades" });
  return (
    <>
      <h3>Grades Secondary</h3>
      <BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={secondaryActionTabs(params.registration, params.courseID)}
      />
    </>
  );
}
