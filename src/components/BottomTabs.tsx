import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import ScheduleIcon from "@mui/icons-material/Schedule";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import InboxIcon from "@mui/icons-material/Inbox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
type TabData = {
  label: string;
  icon: React.ReactElement;
  value: number;
  to: string;
};
export type PageIndexTab =
  | "bonds"
  | "home"
  | "courses"
  | "schedules"
  | "grades"
  | "news"
  | "activities";
type ITabOrder = {
  [key in PageIndexTab]: number;
};
export const TabOrder: ITabOrder = {
  bonds: 0,
  home: 1,
  courses: 2,
  schedules: 3,
  grades: 4,
  news: 5,
  activities: 6,
};
export default function BottomTabs(props: {
  currentBond: string;
  tab: number;
  setTab: (tab: number) => void;
}) {
  const { currentBond, tab, setTab } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [onHoverValue, setOnHoverValue] = React.useState(tab);
  const tabs: TabData[] = [
    {
      label: "Início",
      icon: <HomeIcon />,
      value: TabOrder.home,
      to: `/bond/${currentBond}`,
    },
    {
      label: "Vínculos",
      icon: <GroupsIcon />,
      value: TabOrder.bonds,
      to: `/bonds`,
    },
    {
      label: "Matérias",
      icon: <LibraryBooksIcon />,
      value: TabOrder.courses,
      to: `/bond/${currentBond}/courses`,
    },
    {
      label: "Horários",
      icon: <ScheduleIcon />,
      value: TabOrder.schedules,
      to: `/bond/${currentBond}/schedules`,
    },
    {
      label: "Notas",
      icon: <EqualizerIcon />,
      value: TabOrder.grades,
      to: `/bond/${currentBond}/grades`,
    },
    {
      label: "Notícias",
      icon: <InboxIcon />,
      value: TabOrder.news,
      to: `/bond/${currentBond}/news`,
    },
    {
      label: "Atividades",
      icon: <AssignmentIcon />,
      value: TabOrder.activities,
      to: `/bond/${currentBond}/activities`,
    },
  ];
  return (
    <Box sx={{ pb: 7, display: "flex", justifyContent: "center" }} ref={ref}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          maxWidth: "720px",
          width: "100%",
          borderRadius: "9px",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={tab}
          onChange={(_event, newValue) => {
            setTab(newValue);
          }}
          
          sx={{
            borderRadius: "9px",
            justifyContent: "flex-start",
            overflowX: "auto",
            overflowY: "hidden",
            height: "fit-content",
          }}
        >
          {tabs.map((tab, index) => (
            <BottomNavigationAction
              key={index}
              label={tab.label}
              icon={tab.icon}
              value={tab.value}
              component={Link}
              showLabel={tab.value === onHoverValue}
              to={tab.to}
              onMouseOver={() => setOnHoverValue(tab.value)}
              onMouseLeave={() => setOnHoverValue(-1)}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
