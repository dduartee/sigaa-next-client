import * as React from "react";
import Container from "@material-ui/core/Container";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  NoSsr,
  Paper,
  TextField,
} from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles({
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  paperCard: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "20rem",
    height: "auto",
  },
  topCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginCard: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inputCard: {
    marginBottom: "1rem",
  },
});
export default function Index() {
  const styles = useStyles();
  return (
    <NoSsr>
      <Grid className={styles.container}>
        <Paper elevation={4} className={styles.paperCard}>
          <div className={styles.topCard}>
            <img
              src="https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png"
              alt=""
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
                marginTop: "-50px",
              }}
            />
            <p style={{ fontWeight: "normal" }}>Nome</p>
          </div>
          <div className={styles.loginCard}>
            <Box
              sx={{ display: "flex", alignItems: "flex-end" }}
              className={styles.inputCard}
            >
              <AccountCircle
                sx={{ color: "action.active", margin: "0.25rem" }}
              />
              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label="Usuário"
                variant="standard"
              />
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "flex-end" }}
              className={styles.inputCard}
            >
              <Lock sx={{ color: "action.active", margin: "0.25rem" }} />
              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label="Senha"
                variant="standard"
              />
            </Box>
            <FormControlLabel
              className={styles.inputCard}
              sx={{ marginLeft: "0px" }}
              label="Lembrar de mim"
              control={
                <Checkbox
                  sx={{ padding: "0px", margin: "0.25rem" }}
                  icon={<CheckBoxIcon />}
                  checkedIcon={<CheckBoxOutlineBlankIcon />}
                />
              }
            />
            <Button variant="outlined" endIcon={<SendIcon />}>
              Entrar
            </Button>
          </div>
        </Paper>
      </Grid>
    </NoSsr>
  );
}
