import { Box, CircularProgress } from "@mui/material";
import React from "react";
function Loading({ value }: { value: boolean }) {
  if (!value) return null;
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <CircularProgress style={{ margin: "1rem" }} />
    </Box>
  );
}

export default Loading;