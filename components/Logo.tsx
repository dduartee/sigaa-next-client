import { ForbiddenContext } from "@context/forbidden"
import { Box } from "@mui/material";
import React, { useState, useContext, useEffect } from "react"

export default function Logo(props: { height: string}) {
    const [logoLoaded, setLogoLoaded] = useState(false)
    const { forbiddenVersion } = useContext(ForbiddenContext);
    const [logoURL, setLogoURL] = useState("");
    useEffect(() => {
        if (forbiddenVersion) {
            setLogoURL("/img/logoProibida.png");
        } else {
            setLogoURL("/img/logoPermitida.png");
        }
    }, [forbiddenVersion]);

    return (
        <Box display={logoLoaded ? "block" : "none"}>
            <img src={logoURL} height={props.height} onLoad={() => setLogoLoaded(true)} />
        </Box>
    )
}