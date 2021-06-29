import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import GroupsIcon from "@material-ui/icons/Groups";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import InboxIcon from "@material-ui/icons/Inbox";
import { Home } from "@material-ui/icons";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";

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
  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          indicatorColor="primary"
          textColor="inherit"
          value={tab}
          onChange={tabChanger}
        >
          <Tab label="Inicio" icon={<Home />} />
          <Tab label="Turmas" icon={<GroupsIcon />} />
          <Tab label="Horários" icon={<CalendarTodayIcon />} />
          <Tab label="Desempenho" icon={<EqualizerIcon />} />
          <Tab label="Tarefas" icon={<AssignmentIcon />} />
          <Tab label="Noticias" icon={<InboxIcon />} />
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
