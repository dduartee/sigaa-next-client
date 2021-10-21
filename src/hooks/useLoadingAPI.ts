import { Socket } from "socket.io-client";
import events from "@events";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  startLoading,
  stopLoading,
  updateProgress,
} from "@redux/reducers/ui.reducer";

export default (socket: Socket) => {
  const progress = useAppSelector((state) => state.ui.progress);
  const loading = useAppSelector((state) => state.ui.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on(events.api.loading, (progress: number) => {
      if (progress < 100) {
        dispatch(startLoading());
        dispatch(updateProgress(progress));
      } else {
        dispatch(stopLoading());
        dispatch(updateProgress(0));
      }
    });
    return () => {
      socket.off(events.api.loading);
    };
  }, []);
  return {
    progress,
    loading,
  };
};
