import BottomTabs from "@components/BottomTabs";
import useTabHandler from "@hooks/useTabHandler";
import { useParams } from "react-router-dom";
import { ActionRouterParams } from "./action.router";

export default function CoursesPage() {
  const params = useParams() as ActionRouterParams;
  const { registration } = params;
  const { tab, setTab } = useTabHandler({ page: "courses" });
  return (
    <div>
      <h1>CoursesPage</h1>
      <p>{registration}</p>
      <BottomTabs currentBond={params.registration} tab={tab} setTab={setTab} />
    </div>
  );
}
