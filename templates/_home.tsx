import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import AccordionCourse from "@components/AccordionCourse";
import { Paper } from "@material-ui/core";
import CustomDrawer from "@components/CustomDrawer";
import CustomNavBar from "@components/CustomNavBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Bond, UserInfo } from "@types";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function HomeTemplate({
  data,
  user,
}: {
  data: Bond[];
  user: UserInfo;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log(data[0].courses[0] ? true : false);
  useEffect(() => {
    if (user.profilePictureURL) {
      if (data[0].courses[0]) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    console.log(data[0].courses);
  }, [data, user]);
  const tabChanger = (event: any, newValue: number) => {
    setTab(newValue);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 100;
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <Box sx={{ display: "flex" }}>
        <CustomNavBar
          handler={handleDrawerToggle}
          open={mobileOpen}
          width={drawerWidth}
          profilePictureURL={user.profilePictureURL}
        />
        <CustomDrawer
          tabChanger={tabChanger}
          tab={tab}
          handler={handleDrawerToggle}
          open={mobileOpen}
          width={drawerWidth}
        />
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div style={{ width: "80%" }}>
            <Toolbar />
            <Paper sx={{ margin: "1rem", marginTop: "2.7rem" }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {data?.map((bond, key) => {
                  return bond.courses?.map((course, key) => {
                    return (
                      <AccordionCourse key={key} title={course.title}>
                        {course.code}
                      </AccordionCourse>
                    );
                  });
                })}
              </Box>
            </Paper>
          </div>
        </Box>
      </Box>
    </>
  );
}