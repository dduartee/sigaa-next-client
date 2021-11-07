import { PageIndexTab, TabOrder } from "@components/BottomTabs";
import { useState } from "react";

export default function useTabHandler(params: { page: PageIndexTab }) {
  const order = TabOrder[params.page];
  const [tab, setTab] = useState(order);
  return {
    tab,
    setTab,
  };
}
