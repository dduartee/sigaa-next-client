import React, { useContext, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import CustomDrawer from "@components/CustomDrawer";
import CustomNavBar from "@components/CustomNavBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Bond, UserInfo } from "@types";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataContext } from "@context/data";
import { UserContext } from "@context/user";
import { useRouter } from "next/router";

export default function HomeTemplate({
  children,
  tab,
  setTab,
  loading,
  setLoading
}: {
  children: React.ReactNode;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useContext(UserContext);
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
              {children}
            </Paper>
          </div>
        </Box>
      </Box>
    </>
  );
}
