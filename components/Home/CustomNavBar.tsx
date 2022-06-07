import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";
import { UserContext } from "@context/user";
import { Typography } from "@material-ui/core";

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
          <div style={{position: "absolute"}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handler}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Typography variant="h2" fontSize="2rem" textAlign="center" width="100%">
              sigaa-next-client
            </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveDrawer;
