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
import { Home } from "@material-ui/icons";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Avatar, IconButton } from "@material-ui/core";
import { UserContext } from "@context/user";
function ResponsiveDrawer({
  handler,
  open,
  width,
  tab,
  tabChanger,
}: {
  handler: () => void;
  tabChanger: (event: any, newValue: number) => void;
  open: boolean;
  width: number;
  tab: number;
}) {
  const user = React.useContext(UserContext);
  const drawer = (
    <div>
      <Toolbar sx={{ height: "90px", display: "flex", justifyContent: "center" }}>
        <IconButton>
          <Avatar src={user?.profilePictureURL} sx={{ width: "60px", height: "60px" }} variant="circular" />
        </IconButton>
      </Toolbar>
      <List sx={{ padding: "0px" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          indicatorColor="primary"
          textColor="inherit"
          value={tab}
          onChange={tabChanger}
        >
          <Tab label="Inicio" icon={<Home />} />
          <Tab label="Notas" icon={<EqualizerIcon />} />
          <Tab label="Horários" icon={<CalendarTodayIcon />} />
          {
            /*
            <Tab label="Tarefas" icon={<AssignmentIcon />} disabled/>
            <Tab label="Noticias" icon={<InboxIcon />} disabled />
            */
          }
            <Tab label="Voltar" icon={<ArrowBackIcon />} />
        </Tabs>
      </List>
    </div>
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
