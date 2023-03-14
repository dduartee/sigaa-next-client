import { useEffect, useState } from "react";


export interface UpdateHook {
    readyToUpdate: boolean;
    disableUpdate: boolean;
    isUpdating: boolean;
    updateResource: (update: () => void) => void;
}
export function useUpdatableResource<T>(resource?: T): UpdateHook {
    const [isUpdating, setIsUpdating] = useState(false);
    const [disableUpdate, setDisableUpdate] = useState(false);
    const [readyToUpdate, setReadyToUpdate] = useState(false);
    useEffect(() => {
        if (resource) {
            setReadyToUpdate(true);
            setIsUpdating(false);
        }
    }, [resource]);
    const updateResource = (update: () => void) => {
        update();
        setIsUpdating(true);
        setDisableUpdate(true);
    }
    return { readyToUpdate, disableUpdate, isUpdating, updateResource}
}