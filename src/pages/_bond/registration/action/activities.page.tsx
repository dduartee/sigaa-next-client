import BottomTabs, { primaryActionTabs } from "@components/BottomTabs";
import useTabHandler from "@hooks/useTabHandler";
import { useParams } from "react-router-dom";
import { ActionRouterParams } from "./action.router";

export default function ActivitiesPage() {
  const params = useParams() as ActionRouterParams;
  const { registration } = params;
  const { tab, setTab } = useTabHandler({ page: "activities" });
  return (
    <>
      <h3>Activities</h3>
      <p>{registration}</p>
      <BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={primaryActionTabs(params.registration)}
      />
    </>
  );
}
