import BondActions from "@components/Bonds/BondActions";
import { BondSelector } from "@components/Bonds/BondSelector";
import { ProfileHeader } from "@components/Bonds/ProfileHeader";
import CircularProgressWithLabel from "@components/CircularProgressWithLabel";
import { SocketContext } from "@contexts/Socket";
import useAuthenticationAPI from "@hooks/useAuthenticationAPI";
import useBondsAPI from "@hooks/useBondsAPI";
import useLoadingAPI from "@hooks/useLoadingAPI";
import { Box, CardActions, CardContent, Collapse } from "@mui/material";
import React, { useContext, useEffect } from "react";

export default function BondsPage() {
  const socket = useContext(SocketContext);
  const [authenticatedDelay, setAuthenticatedDelay] = React.useState("3");

  const { emitGetBonds, storeState } = useBondsAPI(socket);
  const { emitLogout } = useAuthenticationAPI(socket);
  const handleLogout = () => {
    emitLogout();
  };
  const handleGetBonds = () => {
    const { user, options } = storeState;
    emitGetBonds(
      { password: undefined, username: user.username, unique: user.unique },
      options
    );
  };
  const [currentBond, setCurrentBond] = React.useState("");
  useEffect(() => {
    if (!currentBond && storeState.bonds.length > 0) {
      setCurrentBond(storeState.bonds[0].registration);
    }
  }, [currentBond]);
  useEffect(() => {
    if (storeState.bonds.length > 0) {
      setCurrentBond(storeState.bonds[0].registration);
    } else {
      setCurrentBond("");
    }
  }, [storeState.bonds]);
  useEffect(() => {
    setTimeout(() => {
      setAuthenticatedDelay(storeState.user.isLoggedIn ? "1" : "2");
    }, 200);
  });
  const { loading, progress } = useLoadingAPI(socket);
  const conditionals = {
    isAuthenticated: authenticatedDelay,
    isLoading:
      storeState.user.status === "Logando" ||
      storeState.user.status === "Deslogando" ||
      loading,
    error: storeState.user.status === "Erro",
  };
  useEffect(() => {
    console.debug(storeState.user);
    if (conditionals.isAuthenticated === "1") {
      handleGetBonds();
    }
  }, [conditionals.isAuthenticated]);
  return (
    <Box width={"300px"}>
      <Collapse
        in={storeState.user.isLoggedIn && storeState.bonds.length !== 0}
      >
        <CardContent>
          <ProfileHeader Profile={storeState.profile} />
          <BondSelector
            bonds={storeState.bonds}
            setCurrentBond={setCurrentBond}
            currentBond={currentBond}
          />
        </CardContent>
      </Collapse>
      <Collapse in={conditionals.isLoading}>
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgressWithLabel value={progress} size={"3rem"} />
        </Box>
      </Collapse>
      <Collapse
        in={storeState.user.isLoggedIn && storeState.bonds.length !== 0}
      >
        <CardActions>
          <BondActions handleLogout={handleLogout} currentBond={currentBond} />
        </CardActions>
      </Collapse>
    </Box>
  );
}
