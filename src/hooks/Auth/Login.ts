import { socketContext } from "@contexts/Socket";
import { useContext, useEffect, useState } from "react";
import events from "@events.json";
import { IProfileSchema, ProfileContext } from "@contexts/Profile";
import { IUserSchema, UserContext } from "@contexts/User";
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

export type loginResponse = {
  User?: IUserSchema;
  isLoggedIn?: boolean;
  error?: string | undefined;
  Profile?: IProfileSchema;
  Unique?: string;
};

export type statusResponse = "Logado" | "Deslogado" | "Logando" | "Deslogando";
export type logoutArgs = {
  options: optionsArgs;
  credentials: credentialsWithUnique;
};

export type logoutResponse = {
  User?: IUserSchema;
  Unique?: string;
  isLoggedOut: boolean;
  error: string | undefined;
};
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
  useEffect(() => {
    socket.onAny((event, data) => {
      console.info(event);
      console.info(data);
    });
    socket.on(eventAuth.login, (data: loginResponse) => {
      if (data.isLoggedIn) {
        if (data.User) {
          setUser({
            username: data.User.username,
          });
          localStorage.setItem("username", data.User.username);
          console.log("Usuário setado");

          if (data.Profile) {
            const { emails, fullName, profilePictureURL } = data.Profile;
            setProfile({
              emails,
              fullName,
              profilePictureURL,
            });
            console.log("Perfil setado");
            if (data.Unique) {
              localStorage.setItem("unique", data.Unique);
              cb(data.Unique, data.User.username);
              setCredentials({
                username: data.User.username,
                unique: data.Unique,
                password: undefined,
              });
            }
          }
        }
      } else {
        if (data.error === "SIGAA: Invalid credentials.") {
          setError(true);
        } else if (
          data.error === "SIGAA: Unknown homepage format." ||
          data.error ===
            "SIGAA: Invalid homepage, the system behaved unexpectedly."
        ) {
          setRetryLogin(true);
        } else if (
          data.error === "SessionError: Session not found, verify unique"
        ) {
          localStorage.removeItem("unique");
          setCredentialsMerge({ name: "unique", value: "" });
          setRetryLogin(true);
        }
        console.error(data.error);
        setStatus("Deslogado");
      }
    });
    socket.on(eventAuth.status, (data: statusResponse) => {
      setStatus(data);
    });
    socket.on(eventAuth.logout, (data: logoutResponse) => {
      if (data.isLoggedOut) {
        if (data.User) {
          setUser({ username: data.User.username });
        }
        localStorage.setItem("unique", "");
        localStorage.setItem("username", "");
        setCredentialsMerge({ name: "unique", value: "" });
        setStatus("Deslogado");
      }
    });
  }, []);
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
  return {
    emitLogin,
    User,
    Profile,
    status,
    setStatus,
    emitLogout,
  };
};
