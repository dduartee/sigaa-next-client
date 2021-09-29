import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";
const useStyles = makeStyles({
  profilePicture: {
    width: "75px",
    height: "75px",
    objectFit: "cover",
    borderRadius: "50%",
    userSelect: "none",
  },
});
function ResponsiveDrawer({
  handler,
  width,
  profilePictureURL,
}: {
  handler: () => void;
  width: number;
  profilePictureURL: string | undefined;
}) {
  const styles = useStyles();
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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
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
          <div style={{ width: "25rem" }}>
            <TextField
              id="pesquisar"
              label=""
              variant="outlined"
              color="primary"
              margin="normal"
              size="small"
              placeholder="Pesquisar "
              fullWidth
            />
          </div>
          <div>
            <IconButton>
              <img src={profilePictureURL} className={styles.profilePicture} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveDrawer;
