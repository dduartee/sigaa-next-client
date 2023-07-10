import { InputBox, Input } from "@components/Index/Input";
import { Grid, Box, Typography, FormControl, Button } from "@mui/material";
import { useTheme } from "@mui/system"
import Link from "next/link";
import LinkIcon from '@mui/icons-material/Link';
import React from "react";

export default function AjudaCookie() {
  const theme = useTheme();
  const [url, setURL] = React.useState("");
  const [copiado, setCopiado] = React.useState(0);
  const [JSESSIONID, setJSESSIONID] = React.useState("");
  return (
    <Grid
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      width={"100vw"}
      height={"100vh"}
    >
      <Typography>Entre no link abaixo</Typography>
      <Link
        href={"https://sigrh.ifsc.edu.br/sigaa/"}
        target="_blank"
        style={{ color: theme.palette.primary.main }}
      >
        sigaa.ifsc.edu.br
      </Link>
      <Typography>
        Antes de fazer o login, copie a URL do navegador e faça o login normalmente no SIGAA
      </Typography>
      <Typography>
        Após entrar na sua conta, cole a URL no campo abaixo
      </Typography>
      <form
        autoComplete="off"
      >
        <InputBox
          icon={<LinkIcon />}
          input={
            <Input
              label="URL"
              type="password"
              name="url"
              autoComplete="new-password"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          }
        />
      </form>
      <Typography>
        Após colar a URL, clique no botão abaixo para copiar o cookie
      </Typography>
      <Box width={"200px"} display={"flex"} flexDirection="column">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (!url) return alert("Insira a URL")
            const value = url.split(";")[1].split("=")[1];
            if (!value) return alert("URL inválida")
            const cookie = `JSESSIONID=${value}`;
            setJSESSIONID(cookie);
            if(navigator.clipboard) {
              navigator.clipboard.writeText(cookie);
            }
            setCopiado(1);
            setTimeout(() => {
              setCopiado(0);
            }, 2000);
          }}
        >
          {copiado ? "Copiado!" : "Copiar Cookie"}
        </Button>
        <Input value={JSESSIONID} />
        <Button
          sx={{ marginTop: "1rem" }}
          variant="contained"
          color="primary"
          href="/nuncamais"
        >
          Voltar
        </Button>
      </Box>

    </Grid>
  );
}
