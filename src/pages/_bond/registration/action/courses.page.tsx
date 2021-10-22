import BottomTabs, { primaryActionTabs } from "@components/BottomTabs";
import CustomLink from "@components/CustomLink";
import { SocketContext } from "@contexts/Socket";
import useCoursesAPI from "@hooks/useCoursesAPI";
import useDelayedAuthentication from "@hooks/useDelayedAuthentication";
import useTabHandler from "@hooks/useTabHandler";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ActionRouterParams } from "./action.router";

export default function CoursesPage() {
  const params = useParams() as ActionRouterParams;
  const { registration } = params;
  const { tab, setTab } = useTabHandler({ page: "courses" });

  const socket = useContext(SocketContext);
  const { emitGetCourses, storeState } = useCoursesAPI(socket);

  const handleGetCourses = () => {
    const { user, bonds } = storeState;
    emitGetCourses(
      {
        password: undefined,
        username: user.username,
        unique: user.unique,
      },
      {
        bond: {
          registration,
          inactive: !bonds.filter(
            (bond) => bond.registration === registration
          )[0].active,
        },
        type: "student",
      }
    );
  };
  useDelayedAuthentication(handleGetCourses);
  /*const conditionals = {
    isAuthenticated,
    isLoading: storeState.ui.loading,
    error: storeState.ui.error,
  };*/
  const listCourses =
    storeState.courses.filter((bond) => bond.registration === registration)[0]
      ?.courses ?? [];
  return (
    <div style={{ margin: ".5rem" }}>
      <h1>Matérias</h1>
      <Breadcrumbs separator="›" sx={{ color: "#268E36" }}>
        <CustomLink to={"/bonds"}>Vínculos</CustomLink>
        <CustomLink to={`/bond/${registration}`}>{registration}</CustomLink>
        <CustomLink to={`/bond/${registration}/courses`}>Matérias</CustomLink>
      </Breadcrumbs>
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
        {listCourses.map((course, index) => (
          <Card
            variant="outlined"
            sx={{
              width: 300,
              margin: 1,
              maxHeight: 130,
              minHeight: 100,
              display: "flex",
            }}
            key={index}
          >
            <CardContent
              sx={{
                width: "60%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              <Typography>{course.title}</Typography>
            </CardContent>
            <CardActions sx={{ width: "40%", height: "100%" }}>
              <CustomLink to={`/bond/${registration}/course/${course.id}`}>
                <Button variant="outlined">Visualizar</Button>
              </CustomLink>
            </CardActions>
          </Card>
        ))}
      </Box>

      <BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={primaryActionTabs(params.registration)}
      />
    </div>
  );
}
function setCourseHover(index: number): void {
  throw new Error("Function not implemented.");
}
