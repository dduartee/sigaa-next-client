import BottomTabs, { secondaryActionTabs } from "@components/BottomTabs";
import useTabHandler from "@hooks/useTabHandler";
import { useParams } from "react-router";
import { SecondaryActionRouterParams } from "./secondaryAction.router";

export default function ActivitiesSecondaryPage() {
  const params = useParams() as SecondaryActionRouterParams;
  const { setTab, tab } = useTabHandler({ page: "activities" });
  return (
    <>
      <h3>Activities Secondary</h3>
      <BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={secondaryActionTabs(params.registration, params.courseID)}
      />
    </>
  );
}
