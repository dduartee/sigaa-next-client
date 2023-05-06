import * as React from "react";
import Logo from "@components/Logo";
import { Box, CssBaseline, AppBar, Toolbar, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

function ResponsiveDrawer({
  handler,
  width,
}: {
  handler: () => void;
  width: number;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${width}px)` },
          ml: { sm: `${width}px` },
        }}
      >
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Box position={"absolute"}>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 0, display: { sm: "none" } }}
              onClick={handler}
            >
              <Menu fontSize="large" />
            </IconButton>
          </Box>
          <Box padding={1} pt={2} width="100%" textAlign={"center"}>
            <Logo height={"60rem"} />
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveDrawer;
