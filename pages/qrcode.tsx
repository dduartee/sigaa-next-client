import { Box, Grid, Link, Typography } from "@material-ui/core";
import React from "react";

export default function QRCode() {
  return (
    <Grid
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      width={"100vw"}
      height={"100vh"}
    >
          <img
            src="/qrcode.png"
            alt="QR Code"
            width={"80%"}
            style={{
                alignSelf: "center",
                maxWidth: "500px",
            }}
          />
        <Box alignSelf={"center"} textAlign={"center"}>
          <Typography variant={"h4"}>
            Use a câmera do seu celular para ler o QR Code
          </Typography>
          <Typography variant={"h4"}>
            ou acesse:{" "}
            <Link
              href={"https://sigaa-next-client.vercel.app/"}
              target="_blank"
              style={{ color: "#32A041" }}
            >
              sigaa-next-client.vercel.app/
            </Link>
          </Typography>
        </Box>
    </Grid>
  );
}
