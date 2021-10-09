import { socketContext } from "@contexts/Socket";
import { useContext, useEffect, useState } from "react";
import events from "@events.json";
import { IProfileSchema, ProfileContext } from "@contexts/Profile";
import { IUserSchema, UserContext } from "@contexts/User";
import { Socket } from "socket.io-client";

export const LoginHook = (
  setError: (value: boolean) => void,
  setCredentials: (value: credentialsArgs) => void,
  setCredentialsMerge: ({ name, value }: { name: string; value: any }) => void,
  setRetryLogin: (value: boolean) => void,
  cb: (unique: string, username: string) => void
) => {
  const socket = useContext(socketContext);

  const { User, setUser } = useContext(UserContext);
  const { Profile, setProfile } = useContext(ProfileContext);
  const [status, setStatus] = useState<statusResponse>("Deslogado");
  const eventAuth = events.auth;
  const authEmitter = AuthEmitter(socket, eventAuth);
  useEffect(() => {
    socket.onAny((event, data) => {
      console.debug(event, data);
    });

    socket.on(eventAuth.login, (data: loginResponse) => {
      const { error, isLoggedIn } = data;
      if (error === undefined && isLoggedIn === true) {
        const { Profile, Unique, User } = data;
        const { username } = User;

        // tratamento do Usuário
        setUser({ username });
        localStorage.setItem("username", data.User.username);
        console.debug("Usuário setado");

        // tratamento do Perfil
        const { emails, fullName, profilePictureURL } = Profile;
        setProfile({
          emails,
          fullName,
          profilePictureURL,
        });
        console.debug("Perfil setado");

        // tratamento do Unique
        localStorage.setItem("unique", Unique);
        console.debug("Unique setado");

        setCredentials({
          username: data.User.username,
          unique: data.Unique,
          password: undefined,
        });

        // executa callback definido na função, getBonds, etc
        cb(data.Unique, data.User.username);
      } else {
        setStatus("Deslogado");
        errorHandler();
      }

      function errorHandler() {
        if (error === "SIGAA: Invalid credentials.") {
          setError(true);
        } else if (
          error ===
            "SIGAA: Invalid homepage, the system behaved unexpectedly." ||
          error === "SIGAA: Unknown homepage format."
        ) {
          setRetryLogin(true);
        } else if (error === "SessionError: Session not found, verify unique") {
          localStorage.removeItem("unique");
          setCredentialsMerge({ name: "unique", value: "" });
          setRetryLogin(true);
        }
      }
    });
    socket.on(eventAuth.status, (data: statusResponse) => {
      setStatus(data);
    });
    socket.on(eventAuth.logout, (data: logoutResponse) => {
      const { error, isLoggedOut } = data;
      if (error === undefined && isLoggedOut === true) {
        localStorage.removeItem("unique");
        localStorage.removeItem("username");
        setUser({ username: "" });
        setProfile({
          emails: [],
          fullName: "",
          profilePictureURL: "",
        });
        setCredentials({
          username: "",
          unique: "",
          password: undefined,
        });
        setStatus("Deslogado");
      } else {
        console.error(data.error);
      }
    });
    return () => {
      socket.close();
    };
  }, []);
  return {
    User,
    Profile,
    status,
    setStatus,
    authEmitter,
  };
};
const AuthEmitter = (
  socket: Socket,
  eventAuth: { login: string; logout: string }
) => {
  const emitLogin = (options: optionsArgs, credentials: credentialsArgs) => {
    socket.emit(eventAuth.login, {
      options,
      credentials,
    } as loginArgs);
  };
  const emitLogout = (
    options: optionsArgs,
    credentials: credentialsWithUnique
  ) => {
    socket.emit(eventAuth.logout, {
      options,
      credentials,
    } as logoutArgs);
  };

  return { login: emitLogin, logout: emitLogout };
};

export const useSessionCredentials = () => {
  const [sessionCredentials, setSessionCredentials] = useState<{
    unique: string;
    username: string;
    options: optionsArgs;
  }>({
    options: {
      institution: "",
      url: "",
    },
    unique: "",
    username: "",
  });
  useEffect(() => {
    const unique = localStorage.getItem("unique") ?? "";
    const username = localStorage.getItem("username") ?? "";
    const options =
      localStorage.getItem("options") ?? '{ institution: "", url: "" }';
    setSessionCredentials({
      unique,
      username,
      options: JSON.parse(options) as optionsArgs,
    });
  }, []);
  return sessionCredentials;
};

export interface optionsArgs {
  institution: string;
  url: string;
}

export type credentialsWithoutUnique = {
  username: string;
  password: string;
  unique: undefined;
};
export type credentialsWithUnique = {
  username: string;
  password: undefined;
  unique: string;
};
export type credentialsArgs = credentialsWithoutUnique | credentialsWithUnique;

export type loginArgs = {
  options: optionsArgs;
  credentials: credentialsArgs;
};

export type loginResponse = loginResponseError | loginResponseSuccess;
export type loginResponseError = {
  error: ErrorKnownleadge;
  isLoggedIn: false;
};

export type loginResponseSuccess = {
  User: IUserSchema;
  isLoggedIn: true;
  error: undefined;
  Profile: IProfileSchema;
  Unique: string;
};

export type statusResponse = "Logado" | "Deslogado" | "Logando" | "Deslogando";
export type logoutArgs = {
  options: optionsArgs;
  credentials: credentialsWithUnique;
};

export type logoutResponse = logoutResponseError | logoutResponseSuccess;
export type logoutResponseError = {
  isLoggedOut: false;
  error: string;
};
export type logoutResponseSuccess = {
  User?: IUserSchema;
  Unique?: string;
  isLoggedOut: boolean;
  error: string | undefined;
};
export type ErrorKnownleadge =
  | "SIGAA: Invalid credentials."
  | "SIGAA: Unknown homepage format."
  | "SIGAA: Invalid homepage, the system behaved unexpectedly."
  | "SessionError: Session not found, verify unique";
