import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { generatePath, Link } from "react-router-dom";

import ScheduleIcon from "@mui/icons-material/Schedule";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import InboxIcon from "@mui/icons-material/Inbox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  | "activities"
  | "back"
  | "course";
type ITabOrder = {
  [key in PageIndexTab]: number;
};
export const TabOrder: ITabOrder = {
  home: 0,
  bonds: 1,
  courses: 2,
  schedules: 3,
  grades: 4,
  news: 5,
  activities: 6,
  back: 7,
  course: 8,
};
export const primaryActionTabs = (registration: string): TabData[] => [
  {
    label: "Início",
    icon: <HomeIcon />,
    value: TabOrder.home,
    to: generatePath("/bond/:registration", { registration }),
  },
  {
    label: "Vínculos",
    icon: <GroupsIcon />,
    value: TabOrder.bonds,
    to: generatePath("/bonds"),
  },
  {
    label: "Matérias",
    icon: <LibraryBooksIcon />,
    value: TabOrder.courses,
    to: generatePath("/bond/:registration/courses", { registration }),
  },
  {
    label: "Horários",
    icon: <ScheduleIcon />,
    value: TabOrder.schedules,
    to: generatePath("/bond/:registration/schedules", { registration }),
  },
  {
    label: "Notas",
    icon: <EqualizerIcon />,
    value: TabOrder.grades,
    to: generatePath("/bond/:registration/grades", { registration }),
  },
  {
    label: "Notícias",
    icon: <InboxIcon />,
    value: TabOrder.news,
    to: generatePath("/bond/:registration/news", { registration }),
  },
  {
    label: "Atividades",
    icon: <AssignmentIcon />,
    value: TabOrder.activities,
    to: generatePath("/bond/:registration/activities", { registration }),
  },
];
export const secondaryActionTabs = (
  registration: string,
  courseID: string
): TabData[] => [
  {
    label: "Voltar",
    icon: <ArrowBackIcon />,
    value: TabOrder.back,
    to: generatePath("/bond/:registration", { registration }),
  },
  {
    label: "Matéria",
    icon: <LibraryBooksIcon />,
    value: TabOrder.course,
    to: generatePath("/bond/:registration/course/:courseID", {
      registration,
      courseID,
    }),
  },
  {
    label: "Notas",
    icon: <EqualizerIcon />,
    value: TabOrder.grades,
    to: generatePath("/bond/:registration/course/:courseID/grades", {
      courseID,
      registration,
    }),
  },
  {
    label: "Notícias",
    icon: <InboxIcon />,
    value: TabOrder.news,
    to: generatePath("/bond/:registration/course/:courseID/news", {
      courseID,
      registration,
    }),
  },
  {
    label: "Atividades",
    icon: <AssignmentIcon />,
    value: TabOrder.activities,
    to: generatePath("/bond/:registration/course/:courseID/activities", {
      courseID,
      registration,
    }),
  },
];

export default function BottomTabs(props: {
  tab: number;
  setTab: (tab: number) => void;
  tabsData: TabData[];
}) {
  const { tab, setTab, tabsData } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [onHoverValue, setOnHoverValue] = React.useState(tab);

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
          <BottomNavigationAction
            label={"Perfil"}
            icon={
              <img
                src="https://sig.ifsc.edu.br/sigaa/img/no_picture.png"
                style={{
                  width: "2em",
                  height: "2em",
                  objectFit: "cover",
                  borderRadius: "50%",
                  userSelect: "none",
                }}
              />
            }
            value={33}
            component={Link}
            showLabel={33 === onHoverValue}
            to={"/profile"}
            onMouseOver={() => setOnHoverValue(33)}
            onMouseLeave={() => setOnHoverValue(-1)}
          />
          {tabsData.map((tab, index) => (
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
