import { Bond } from "@types";
import { SocketContext } from "@context/socket";
import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
export default function useCourseEvents(setBond: React.Dispatch<React.SetStateAction<Bond | null>>) {
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("courses::list", (bondReceived: Bond) => {
      sessionStorage.setItem(`courses-${bondReceived.registration}`, JSON.stringify({
        courses: bondReceived.courses,
        timestamp: Date.now()
      }));
      setBond((prevBond) => {
        if (prevBond) {
          return { ...prevBond, courses: bondReceived.courses };
        } else {
          return bondReceived;
        }
      });
      setCoursesLoading(false);
    });
    socket.on("activities::list", (bondReceived: Bond) => {
      sessionStorage.setItem(`activities-${bondReceived.registration}`, JSON.stringify({
        activities: bondReceived.activities,
        timestamp: Date.now()
      }));
      setBond((prevBond) => {
        if (prevBond) {
          return { ...prevBond, activities: bondReceived.activities };
        } else {
          return bondReceived;
        }
      });
      setActivitiesLoading(false);
    });
    return () => {
      socket.off("courses::list");
      socket.off("activities::list");
    }
  }, [setBond, socket]);

  return { coursesLoading, activitiesLoading, setCoursesLoading, setActivitiesLoading };
}