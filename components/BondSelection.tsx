import React from "react";
import { Bond } from "@types";
import { Typography, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTheme } from "@mui/system";

export function BondSelection(props: { registrationSelected: string; setRegistrationSelected: (registration: string) => void; bonds: Bond[]; }) {
  const { registrationSelected, setRegistrationSelected, bonds } = props;
  const handleChangeRegistration = (
    _: React.MouseEvent<HTMLElement>,
    nextVinculo: string
  ) => {
    setRegistrationSelected(nextVinculo);
  };
  const activeBonds = bonds.filter(bond => bond.active);
  const inactiveBonds = bonds.filter(bond => !bond.active);
  const {palette} = useTheme();
  return (<>
    <Typography textAlign={"center"} margin={2}>
      Escolha um vínculo para acessar
    </Typography>
    <Box sx={{
      maxHeight: "310px",
      overflowX: "hidden",
    }}>
      <ToggleButtonGroup
        exclusive
        aria-label=""
        value={registrationSelected}
        onChange={handleChangeRegistration}
        orientation="vertical"
      >
        {activeBonds.length > 0 ?
          <Typography
            variant="caption"
            color={"gray"}
            textAlign={"left"}
            sx={{
              marginLeft: "1rem",
              marginTop: ".5rem",
              mb: ".2rem",
            }}
          >
            Ativos:
          </Typography>
          : null}
        {activeBonds.map((bond, index) => {
          return (
            <ToggleButton
              key={index}
              value={bond.registration}
              sx={{
                marginLeft: "1rem",
                marginRight: "1rem",
                marginBottom: ".5rem",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              {bond.program}<br />Matrícula: {bond.registration}
            </ToggleButton>
          );
        })}
        {inactiveBonds.length > 0 ?
          <Typography
            variant="caption"
            color={"gray"}
            textAlign={"left"}
            sx={{
              marginLeft: "1rem",
              marginTop: "1rem",
              mb: ".2rem",
            }}
          >
            Inativos:
          </Typography>
          : null}
        {inactiveBonds.map((bond, index) => {
          return (
            <ToggleButton
              key={index}
              value={bond.registration}
              style={{
                marginLeft: "1rem",
                marginRight: "1rem",
                marginBottom: ".5rem",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              {bond.program}<br />Matrícula: {bond.registration}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  </>);
}
