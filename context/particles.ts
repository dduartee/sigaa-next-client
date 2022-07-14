import React from "react";
export type ParticlesProps = {
    active: boolean;
}
export const ParticlesContext = React.createContext<ParticlesProps>({active: false});