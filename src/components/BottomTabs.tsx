/* eslint-disable @next/next/no-img-element */
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import ScheduleIcon from '@mui/icons-material/Schedule'
import HomeIcon from '@mui/icons-material/Home'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import InboxIcon from '@mui/icons-material/Inbox'
import AssignmentIcon from '@mui/icons-material/Assignment'
import GroupsIcon from '@mui/icons-material/Groups'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from '@mui/material'
import { PageIndexTab } from '@hooks/useTabHandler'
import { ReactElement, useRef, useState } from 'react'
type TabData = {
  label: string;
  icon: ReactElement;
  value: number;
  to: string;
};

type ITabOrder = {
  // eslint-disable-next-line no-unused-vars
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
  course: 8
}
export const primaryActionTabs = (registration: string): TabData[] => [
  {
    label: 'Início',
    icon: <HomeIcon />,
    value: TabOrder.home,
    to: `/bond/${registration}`
  },
  {
    label: 'Vínculos',
    icon: <GroupsIcon />,
    value: TabOrder.bonds,
    to: '/bonds'
  },
  {
    label: 'Matérias',
    icon: <LibraryBooksIcon />,
    value: TabOrder.courses,
    to: `/bond/${registration}/courses`
  },
  {
    label: 'Horários',
    icon: <ScheduleIcon />,
    value: TabOrder.schedules,
    to: `/bond/${registration}/schedules`
  },
  {
    label: 'Notas',
    icon: <EqualizerIcon />,
    value: TabOrder.grades,
    to: `/bond/${registration}/grades`
  },
  {
    label: 'Notícias',
    icon: <InboxIcon />,
    value: TabOrder.news,
    to: `/bond/${registration}/news`
  },
  {
    label: 'Atividades',
    icon: <AssignmentIcon />,
    value: TabOrder.activities,
    to: `/bond/${registration}/activities`
  }
]
export const secondaryActionTabs = (
  registration: string,
  courseID: string
): TabData[] => [
  {
    label: 'Voltar',
    icon: <ArrowBackIcon />,
    value: TabOrder.back,
    to: `/bond/${registration}`
  },
  {
    label: 'Matéria',
    icon: <LibraryBooksIcon />,
    value: TabOrder.course,
    to: `/bond/${registration}/course/${courseID}`
  },
  {
    label: 'Notas',
    icon: <EqualizerIcon />,
    value: TabOrder.grades,
    to: `/bond/${registration}/course/${courseID}/grades`
  },
  {
    label: 'Notícias',
    icon: <InboxIcon />,
    value: TabOrder.news,
    to: `/bond/${registration}/course/${courseID}/news`
  },
  {
    label: 'Atividades',
    icon: <AssignmentIcon />,
    value: TabOrder.activities,
    to: `/bond/${registration}/course/${courseID}/activities`
  }
]

export default function BottomTabs (props: {
  tabHook: {
    tab: number;
    setTab: (tab: number) => void;
  },
  tabsData: TabData[],
  profilePictureURL: string,
}) {
  const { tabHook, tabsData, profilePictureURL } = props
  const { tab, setTab } = tabHook
  const ref = useRef<HTMLDivElement>(null)
  const [onHoverValue, setOnHoverValue] = useState(tab)

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '5rem' }}
      ref={ref}
    >
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          maxWidth: '720px',
          width: '100%',
          borderRadius: '9px',
          margin: '1rem',
          marginBottom: '0'
        }}
        elevation={3}
      >
        <BottomNavigation
          value={tab}
          onChange={(_event, newValue) => {
            setTab(newValue)
          }}
          sx={{
            borderRadius: '10px',
            justifyContent: 'flex-start',
            overflowX: 'auto',
            overflowY: 'hidden',
            height: 'fit-content'
          }}
        >
          <BottomNavigationAction
            label={'Perfil'}
            icon={
              <img
                src={profilePictureURL}
                alt="profilePictureURL"
                style={{
                  borderRadius: '50%',
                  userSelect: 'none',
                  width: '1.5rem',
                  height: '1.5rem'
                }}
                />
            }
            value={33}
            component={Link}
            showLabel={onHoverValue === 33}
            href={'/profile'}
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
              href={tab.to}
              onMouseOver={() => setOnHoverValue(tab.value)}
              onMouseLeave={() => setOnHoverValue(-1)}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
