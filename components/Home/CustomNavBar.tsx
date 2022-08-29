import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

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
        <Toolbar>
          <div style={{ position: "absolute" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handler}
              sx={{ mr: 0, display: { sm: "none" }, fontSize: "1rem" }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Box textAlign={"center"} width="100%" padding={2}>
            <img src="/img/logo.png" height="50rem"/>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveDrawer;
