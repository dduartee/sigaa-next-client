import { socketContext } from "@contexts/Socket";
import { useContext, useEffect, useState } from "react";
import events from "@events.json";
export const useLoadingAPI = () => {
  const socket = useContext(socketContext);
  const [loadingPercent, setLoadingPercent] = useState(0);
  useEffect(() => {
    socket.on(events.api.loading, (percent) => {
      setLoadingPercent(percent);
      if (percent === 100) {
        setTimeout(() => {
          setLoadingPercent(0);
        }, 500);
      }
    });
    return () => {
      socket.close();
    };
  }, []);
  return { loadingPercent };
};
