import React, { useContext, useState } from "react";
import { Box, styled } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import CustomDrawer from "@components/Home/CustomDrawer";
import CustomNavBar from "@components/Home/CustomNavBar";
import Toolbar from "@material-ui/core/Toolbar";
import Loading from "@components/Loading";
import { LoadingContext } from "@context/loading";

const StyledContent = styled(Box)(({ theme }) => ({
  width: "80%",
  [theme.breakpoints.down(1140)]: {
    width: "100%",
  },
}));

export default function HomeTemplate({
  children,
  tab,
  setTab
}: {
  children: React.ReactNode;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const tabChanger = (event: any, newValue: number) => {
    setTab(newValue);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 100;
  const loading = useContext(LoadingContext);
  return (
    <>
      <Loading loading={loading} />
      <Box sx={{ display: "flex" }}>
        <CustomNavBar
          handler={handleDrawerToggle}
          width={drawerWidth}
        />
        <CustomDrawer
          tabChanger={tabChanger}
          tab={tab}
          handler={handleDrawerToggle}
          open={mobileOpen}
          width={drawerWidth}
        />
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <StyledContent>
            <Toolbar />
            <Paper sx={{ margin: "1rem", marginTop: "26px" }} elevation={1}>
              {children}
            </Paper>
          </StyledContent>
        </Box>
      </Box>
    </>
  );
}
