import { useAppSelector } from "@redux/hooks";
import { useState, useEffect } from "react";

export default (AuthenticatedCB: () => void) => {
  const storeState = useAppSelector((state) => state);
  const [authenticatedDelay, setAuthenticatedDelay] = useState<
    "unknown" | true | false
  >("unknown");
  useEffect(() => {
    const authenticatedDelayTimeout = setTimeout(() => {
      setAuthenticatedDelay(storeState.user.isLoggedIn ? true : false);
    }, 200);
    return () => {
      clearTimeout(authenticatedDelayTimeout);
    };
  }, [storeState.user.isLoggedIn]);
  useEffect(() => {
    if (authenticatedDelay === true) {
      AuthenticatedCB();
    }
  }, [authenticatedDelay]);
  return authenticatedDelay;
};
