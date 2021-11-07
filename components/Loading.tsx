import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
function Loading({loading}: {loading: boolean}) {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

export default Loading;