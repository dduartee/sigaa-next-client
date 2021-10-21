import { Socket } from "socket.io-client";
import events from "@events";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { resetProfile, setProfile } from "@redux/reducers/profile.reducer";
import { resetUser, setUser } from "@redux/reducers/user.reducer";
import {
  credentialsArgs,
  credentialsWithUnique,
  loginArgs,
  loginResponse,
  logoutArgs,
  logoutResponse,
  optionsArgs,
  statusResponse,
} from "@types";
import { useEffect } from "react";
import { resetOptions } from "@redux/reducers/options.reducer";
import { resetBonds } from "@redux/reducers/bonds/bonds.reducer";

export default (
  socket: Socket,
  next?: (credentials: credentialsWithUnique, options: optionsArgs) => void
) => {
  const dispatch = useAppDispatch();
  const storeState = useAppSelector((state) => state);
  let credentials: credentialsArgs;
  useEffect(() => {
    socket.onAny((event, data) => {
      console.debug(event, data);
    });
    socket.on(events.auth.login, (response: loginResponse) => {
      const { error, isLoggedIn } = response;
      if (error === undefined && isLoggedIn) {
        const { Profile, User, Unique } = response;
        const { username } = User;
        dispatch(
          setUser({
            ...storeState.user,
            username,
            unique: Unique,
            isLoggedIn: true,
          })
        );

        const { emails, fullName, profilePictureURL } = Profile;
        dispatch(setProfile({ emails, fullName, profilePictureURL }));

        next
          ? next(
              { username, unique: Unique, password: undefined },
              storeState.options
            )
          : null;
      } else {
        if (
          error === "SessionError: Session not found, verify unique" ||
          error === "SessionError: Session expired"
        ) {
          dispatch(
            setUser({
              ...storeState.user,
              isLoggedIn: false,
              status: "Delete session",
              unique: "",
            })
          );
        }
        console.error(error);
      }
    });
    socket.on(events.auth.logout, (response: logoutResponse) => {
      const { error, isLoggedOut } = response;
      if (!error && isLoggedOut) {
        dispatch(resetUser());
        dispatch(resetOptions());
        dispatch(resetBonds());
        dispatch(resetProfile());
      } else {
        console.error(error);
      }
    });
    socket.on(events.auth.status, (status: statusResponse) => {
      console.log(status);
      dispatch(setUser({ ...storeState.user, status }));
    });
    loginByRememberMe();
    return () => {
      socket.off(events.auth.login);
      socket.off(events.auth.logout);
      socket.off(events.auth.status);
    };
  }, [socket]);
  useEffect(() => {
    if (credentials && credentials.password && credentials.username) {
      if (storeState.user.status === "Tentando novamente") {
        console.debug("Tentando novamente");
        emitLogin(credentials);
      } else if (storeState.user.status === "Delete session") {
        console.debug("Sessão deletada, faça login");
      } else {
        console.debug(storeState.user.status);
        dispatch(setUser({ ...storeState.user, status: "Erro" }));
      }
    }
  }, [storeState.user.status]);
  const emitLogin = (credentials: credentialsArgs) => {
    credentials = { ...credentials };
    socket.emit(events.auth.login, {
      credentials,
      options: storeState.options,
    } as loginArgs);
  };
  const emitLogout = () => {
    const credentials = {
      username: storeState.user.username,
      unique: storeState.user.unique,
      password: undefined,
    };
    socket.emit(events.auth.logout, {
      credentials,
      options: storeState.options,
    } as logoutArgs);
  };
  const loginByRememberMe = () => {
    // se o status do usuario for logado
    if (storeState.user.isLoggedIn) {
      // e ele querer ser lembrado
      if (storeState.options.rememberMe) {
        // realiza login
        dispatch(setUser({ ...storeState.user, status: "Deslogado" }));
        emitLogin({
          password: undefined,
          unique: storeState.user.unique,
          username: storeState.user.username,
        });
      } else {
        // se não, realiza logout
        dispatch(
          setUser({
            isLoggedIn: false,
            status: "Deslogado",
            username: "",
            unique: "",
          })
        );
        dispatch(
          setProfile({ emails: [], fullName: "", profilePictureURL: "" })
        );
      }
    }
  };

  return { storeState, emitLogin, emitLogout };
};
