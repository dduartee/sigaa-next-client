import { useParams } from "react-router-dom";
import { ActionRouterParams } from "./action.router";

export default function CoursesPage() {
  const params = useParams() as ActionRouterParams;
  const { registration } = params;
  return (
    <div>
      <h1>CoursesPage</h1>
      <p>{registration}</p>
    </div>
  );
}
