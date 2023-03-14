import React, { useState } from "react";
import { Box, styled } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import CustomDrawer from "@components/Home/CustomDrawer";
import CustomNavBar from "@components/Home/CustomNavBar";
import Toolbar from "@material-ui/core/Toolbar";

const StyledContent = styled(Box)(({ theme }) => ({
  width: "90%",
  [theme.breakpoints.down(1140)]: {
    width: "100%",
  },
}));

export default function HomeTemplate({
  children,
  tab,
  setTab,
  tabs,
}: {
  children: React.ReactNode;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  tabs: {
    label: string;
    icon: JSX.Element;
    bottom?: boolean | undefined;
  }[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const tabChanger = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setTab(newValue);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 100;
  return (
    <Box sx={{ display: "flex" }}>
      <CustomNavBar handler={handleDrawerToggle} width={drawerWidth} />
      <CustomDrawer
        tabChanger={tabChanger}
        tabSelected={tab}
        tabs={tabs}
        handler={handleDrawerToggle}
        open={mobileOpen}
        width={drawerWidth}
      />
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <StyledContent>
          <Toolbar />
          <Box
            component={Paper}
            sx={{ margin: ".6rem", marginTop: "30px" }}
            elevation={1}
            display="flex"
            justifyContent={"center"}
          >
            {children}
          </Box>
        </StyledContent>
      </Box>
    </Box>
  );
}
