import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Typography,
} from "@mui/material";
import { IProfileSchema } from "@contexts/Profile";
import { Bond } from "@types";
export interface BondsProps {
  Profile: IProfileSchema;
  Bonds: Bond[];
  conditionals: { isWaiting: boolean; isLoggedIn: boolean };
}
export function ProfileHeader(Profile: IProfileSchema) {
  let carregado = false;
  setTimeout(() => {
    carregado = true;
  }, 100);
  return (
    <CardContent
      sx={{
        overflow: "visible",
        padding: 0,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Collapse in={carregado}>
        <img
          src={Profile.profilePictureURL}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
            marginTop: "-50px",
            userSelect: "none",
          }}
        />
        <p style={{ fontSize: "1.25rem", border: 0, margin: 0 }}>
          {Profile.fullName}
        </p>
      </Collapse>
    </CardContent>
  );
}

export function bondSelector(bonds: Bond[]) {
  const [vinculo, setVinculo] = React.useState("");
  let carregado = false;
  setTimeout(() => {
    carregado = true;
  }, 200);
  return (
    <CardContent>
      <Collapse in={carregado}>
        <Box textAlign="center">
          <Typography>Escolha um vínculo para acessar</Typography>
          <ToggleButtonGroup
            exclusive
            aria-label=""
            value={vinculo}
            onChange={(
              _event: React.MouseEvent<HTMLElement, MouseEvent>,
              value: any
            ) => {
              if (!value) {
                setVinculo(bonds[0].registration);
              }
              setVinculo(value);
            }}
            orientation="vertical"
          >
            {bonds?.map((value, index) => {
              return (
                <ToggleButton
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#268E36",
                      color: "#ffffff",
                      transition:
                        "background-color .25s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms,border-color .25s cubic-bezier(.4,0,.2,1) 0ms,color .25s cubic-bezier(.4,0,.2,1) 0ms,-webkit-box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#1b7d2b90",
                    },
                  }}
                  key={index}
                  value={value.registration}
                  style={{
                    marginTop: ".5rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginBottom: ".5rem",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "4px",
                    color: "#fff",
                  }}
                >
                  {value.program}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>
      </Collapse>
    </CardContent>
  );
}
export function Loading() {
  let carregado = false;
  setTimeout(() => {
    carregado = true;
  }, 10);
  return (
    <CardContent>
      <Collapse in={carregado} sx={{ width: "100%" }}>
        <Box justifyContent="center" display="flex">
          <CircularProgress />
        </Box>
      </Collapse>
    </CardContent>
  );
}
export default function Bonds({ Profile, Bonds, conditionals }: BondsProps) {
  const { isWaiting, isLoggedIn } = conditionals;
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid item sx={{ m: 4, width: "300px" }}>
        <Card
          variant="elevation"
          sx={{ overflow: "visible", borderRadius: "9px" }}
        >
          {isLoggedIn ? (
            <>
              {ProfileHeader(Profile)}
              {bondSelector(Bonds)}
            </>
          ) : null}
          {isWaiting || !isLoggedIn ? Loading() : null}
          <CardActions></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
