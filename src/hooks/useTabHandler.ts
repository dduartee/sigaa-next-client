import { TabOrder } from '@components/BottomTabs'
import { useState } from 'react'
export type PageIndexTab =
  | 'bonds'
  | 'home'
  | 'courses'
  | 'schedules'
  | 'grades'
  | 'news'
  | 'activities'
  | 'back'
  | 'course';

export default function useTabHandler (params: { page: PageIndexTab }) {
  const order = TabOrder[params.page]
  const [tab, setTab] = useState(order)
  return {
    tab,
    setTab
  }
}
