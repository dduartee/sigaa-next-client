import LoginForm from "@components/Login/LoginForm";
import { credentialsArgs } from "@types";
import React, { useContext } from "react";
import { Box, Card, CardActions, CardContent, Collapse, Grid } from "@mui/material";
import LoginActions from "@components/Login/LoginActions";
import { useAppSelector } from "@redux/hooks";
import useAuthenticationAPI from "@hooks/useAuthenticationAPI";
import CircularProgressWithLabel from "@components/CircularProgressWithLabel";
import useLoadingAPI from "@hooks/useLoadingAPI";
import { SocketContext } from "@contexts/Socket";
import { Redirect } from "react-router";
export default function LoginPage() {
  const socket = useContext(SocketContext);
  const { user } = useAppSelector((state) => state);
  const { emitLogin } = useAuthenticationAPI(socket);

  const [credentials, setCredentials] = React.useState<credentialsArgs>({
    password: undefined,
    username: user.username,
    unique: user.unique,
  });
  const { loading, progress } = useLoadingAPI(socket);

  const handleLogin = () => {
    emitLogin(credentials);
  };
  const conditionals = {
    isAuthenticated: user.status === "Logado",
    isLoading:
      user.status === "Logando" ||
      user.status === "Deslogando" ||
      loading ||
      user.status === "Logado",
    error: user.status === "Erro",
  };
  return (
    <Grid
      item
      sx={{ m: 4 }}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
    >
      <Card
        variant="elevation"
        sx={{
          overflow: "visible",
          borderRadius: "9px",
          width: "300px",
        }}
      >
        <CardContent>
          <Collapse
            in={!conditionals.isAuthenticated && !conditionals.isLoading}
          >
            <LoginForm
              hooks={{
                credentials,
                error: conditionals.error,
                setCredentials,
              }}
            />
          </Collapse>
          <Collapse in={conditionals.isLoading}>
            <Box display={"flex"} justifyContent={"center"}>
              <CircularProgressWithLabel value={progress} size={"3rem"} />
            </Box>
          </Collapse>
        </CardContent>
        <Collapse in={!conditionals.isAuthenticated && !conditionals.isLoading}>
          <CardActions>
            <LoginActions handleLogin={handleLogin} />
          </CardActions>
        </Collapse>
        {conditionals.isAuthenticated ? <Redirect to={"/bonds"} /> : null}
      </Card>
    </Grid>
  );
}
