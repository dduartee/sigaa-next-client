import React from "react";
import { UpdateHook } from "@hooks/useUpdatableResource";
import { getFriendlyDateString } from "./Lessons/Content";
import { Button, Typography } from "@mui/material";
export type UpdateButtonProps = {
    updateHook: UpdateHook,
    update: () => void;
}
export function UpdateButton({ updateHook, update }: UpdateButtonProps) {
    if (updateHook.readyToUpdate) {
        const buttonString = updateHook.isUpdating ? ("Atualizando") : (updateHook.disableUpdate ? ("Atualizado") : ("Atualizar"));
        return <Button variant="outlined" sx={{ mb: ".5rem", width: "150px" }} onClick={update} disabled={updateHook.disableUpdate}>
            {buttonString}
        </Button>
    }
    return null;
}
export type UpdateInfoProps = {
    updateHook: UpdateHook,
    timestamp?: string;
}
export function UpdateInfo({ updateHook, timestamp }: UpdateInfoProps) {
    if (updateHook.readyToUpdate) {
        return <Typography
            variant="caption"
            display="block"
            mb={".5rem"}
            color={"gray"}>
            (Última atualização: {getFriendlyDateString(timestamp)})
        </Typography>
    }
    return null;
}