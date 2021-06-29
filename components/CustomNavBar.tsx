import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
  open,
  width,
  profilePictureURL,
}: {
  handler: () => void;
  open: boolean;
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
