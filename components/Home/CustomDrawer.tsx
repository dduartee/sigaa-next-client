import * as React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { Group, Home } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Menu, Typography } from "@material-ui/core";
import { UserContext } from "@context/user";
import { Tab as TabType } from "@types";
import { LoadingContext } from "@context/loading";

export const courseTabs = [
  {
    label: "Voltar",
    icon: <ArrowBackIcon />,
  }
]
export const bondTabs = [
  {
    label: "Inicio",
    icon: <Home />,
  },
  {
    label: "Notas",
    icon: <EqualizerIcon />,
  },
  {
    label: "Frequência",
    icon: <HowToRegIcon />,
  },
  {
    label: "Turmas",
    icon: <Group />,
  },
  {
    label: "Horários",
    icon: <CalendarTodayIcon />,
  },
  {
    label: "Sair",
    icon: <ArrowBackIcon />,
    bottom: true,
  },
];

export function formatFullName(fullName: string) {
  return fullName
    .toLowerCase()
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
}
function ResponsiveDrawer({
  handler,
  open,
  width,
  tabs,
  tabSelected,
  tabChanger,
}: {
  handler: () => void;
  tabChanger: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => void;
  open: boolean;
  width: number;
  tabSelected: number;
  tabs: TabType[];
}) {
  const user = React.useContext(UserContext);
  const loading = React.useContext(LoadingContext);
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const drawer = (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Toolbar
        sx={{ height: "90px", display: "flex", justifyContent: "center" }}
      >
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <Avatar
            src={user?.profilePictureURL}
            sx={{ width: "60px", height: "60px" }}
            variant="circular"
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          <Box p={1}>
            <Typography fontSize={"1rem"}>Usuário: {user?.username}</Typography>
            <Typography fontSize={"1rem"}>
              Nome: {formatFullName(user?.fullName ?? "")}
            </Typography>
            <Typography fontSize={"1rem"}>Email: {user?.emails[0]}</Typography>
          </Box>
        </Menu>
      </Toolbar>
      <List sx={{ padding: "0px", height: "calc(100% - 90px)" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          indicatorColor="primary"
          textColor="inherit"
          value={tabSelected}
          onChange={tabChanger}
          sx={{
            height: "100%",
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={(tabSelected == index) && loading? `Carregando ${tab.label}` : tab.label} // se o tab for selecionado e estiver sendo carregado
              icon={tab.icon}
              disabled={loading}
              sx={{
                position: tab.bottom ? "absolute" : "relative",
                bottom: "0px",
                width: "99px",
              }}
            />
          ))}
        </Tabs>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={handler}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: width,
            },
          }}
          elevation={1}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: width,
              borderRadius: "4px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
