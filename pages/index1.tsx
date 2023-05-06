import React from "react";
import Head from "next/head";
import { NoSsr, Fade, Grid, Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
function Index(): JSX.Element {
  return (
    <>
      <Head>
        <title>Login | sigaa-next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="SIGAA de forma rápida e prática" />
        <meta property="og:title" content="sigaa-next" />
        <meta
          property="og:description"
          content="SIGAA de forma rápida e prática"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://sigaa-next-client.vercel.app/"
        />
        <meta property="og:image" itemProp="image" content="/og-image.png" />
        <meta
          name="google-site-verification"
          content="l3dA98khZkgdacKAYSDoYNF1SJy1qhZAvoVqHI3KrYE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSsr>
        <Fade in={true} timeout={500}>
          <Grid
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            width={"100vw"}
            height={"100vh"}
          >
            <Box
              display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              height={"100%"}
              maxWidth={"100vw"}
              position={"absolute"}
            >
              <Paper
                elevation={4}
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  maxWidth: "700px",
                  height: "auto",
                }}
              >
                <Box textAlign={"center"} width="100%" padding={3}>
                  <img src="/img/logo.png" height="70rem" />
                </Box>
                <Typography
                  fontSize={"1.5rem"}
                  m={1}
                  mb={3}
                  textAlign={"center"}
                >
                  <b>Não funcionamos mais com SIGAA provido pelo IFSC.</b>
                </Typography>
                <Box
                  m={1}
                  sx={{
                    textIndent: "1.3rem",
                  }}
                >
                  <Typography fontSize={"1.2rem"} mb={1}>
                      Desde o dia 16 de março de 2023, todas as páginas de login
                      utilizadas foram protegidas pelo reCAPTCHA do Google.
                  </Typography>
                  <Typography mb={1} fontSize={"1.2rem"}>
                    A ação já era prevista, visto que é comum esse tipo de
                    proteção.
                  </Typography>
                  <Typography mb={1} fontSize={"1.2rem"}>
                    Desde 2021 a nossa inteção nunca foi confrontar o IFSC ou substituir o
                    próprio SIGAA.
                  </Typography>
                  <Typography mb={1} fontSize={"1.2rem"}>
                    Acredito que atingimos o nosso objetivo de chamar atenção
                    para nosso lado discente.
                  </Typography>
                  <Typography mb={1} fontSize={"1.2rem"}>
                    Entendemos que não é simples tal mudança. Porém, se não
                    demonstrado ninguém sentiria a necessidade.
                  </Typography>
                  <Typography mt={1} mb={1} fontSize={"1.5rem"}>
                    Obrigado a todos que participaram e divulgaram deste
                    &quot;movimento&quot;.
                  </Typography>
                  <Typography
                    mb={1}
                    fontSize={"1rem"}
                    variant={"caption"}
                    color={"gray"}
                  >
                    1. Reforço que não houve lucro com isso e nem que era o
                    nosso objetivo.
                  </Typography>
                  <br />
                  <Typography
                    fontSize={"1rem"}
                    variant={"caption"}
                    color={"gray"}
                  >
                    2. Todo o código desenvolvido ficará disponível para acesso
                    pelo github.
                  </Typography>
                  <Typography mt={2}>
                    Backend:{" "}
                    <Link href={"https://github.com/dduartee/sigaa-socket-api"}>
                      sigaa-socket-api
                    </Link>
                  </Typography>
                  <Typography>
                    Frontend:{" "}
                    <Link
                      href={"https://github.com/dduartee/sigaa-next-client"}
                    >
                      sigaa-next-client
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Fade>
      </NoSsr>
    </>
  );
}

export default Index;
