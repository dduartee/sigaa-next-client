import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "@components/Logo";

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
          <Box >
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 0, display: { sm: "none" } }}
              onClick={handler}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box padding={1} width="100%" textAlign={"center"}>
            <Logo height={"60rem"} />
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveDrawer;
