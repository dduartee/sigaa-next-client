import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import events from "@events";
import {
  courseArgs,
  courseQuery,
  courseResponse,
  credentialsWithUnique,
} from "@types";
import { setCourses } from "@redux/reducers/bonds/courses/courses.reducer";
export default (socket: Socket) => {
  const dispatch = useAppDispatch();
  const storeState = useAppSelector((state) => state);
  useEffect(() => {
    socket.on(events.courses.list, (response: courseResponse) => {
      const { bond, error } = response;
      if (bond && bond.courses && !error) {
        dispatch(
          setCourses({ courses: bond.courses, registration: bond.registration })
        );
      } else {
        console.error(error);
      }
    });
  }, [socket]);
  const emitGetCourses = (
    credentials: credentialsWithUnique,
    query: courseQuery
  ) => {
    socket.emit(events.courses.list, {
      credentials,
      query,
    } as courseArgs);
  };
  return { emitGetCourses, storeState };
};
