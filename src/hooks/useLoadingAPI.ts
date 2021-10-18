import { Socket } from "socket.io-client";
import events from "@events";
import { useEffect, useState } from "react";

export default (socket: Socket) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    socket.on(events.api.loading, (progress: number) => {
      if (progress < 100) {
        setProgress(progress);
        setLoading(true);
      } else {
        setLoading(false);
        setProgress(0);
      }
    });
  }, []);
  return {
    progress,
    loading,
  };
};
