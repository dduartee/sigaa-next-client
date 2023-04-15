import { createContext } from "react";

export interface IForbiddenContext {
    forbiddenVersion: boolean;
    setForbiddenVersion: (value: boolean) => void;
}

export const ForbiddenContext = createContext<IForbiddenContext>({} as IForbiddenContext);