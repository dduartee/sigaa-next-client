import { Box, Switch, Typography } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Donate } from "./Donate";
export function Ajuda(props: { setActiveParticles: (value: boolean) => void, activeParticles: boolean }) {
    useEffect(() => {
        localStorage.setItem("particles", props.activeParticles.toString());
    }, [props.activeParticles]);
    return (
        <Box display={"flex"} m={1} flexDirection={"column"}>
            <Typography variant={"h4"} m={1}>Ajuda</Typography>
            <ul>
                <li>
                    <Typography fontSize={"1.1rem"}>
                        Este projeto foi desenvolvido com base nas informações apresentadas em acessos realizados no SIGAA.
                    </Typography>
                </li>
                <li>
                    <Typography fontSize={"1.1rem"}>
                        Sendo assim, pode ocorrer incompatibilidades entre os dados de cada discente mostrados no SIGAA.
                    </Typography >
                </li>
                <li>
                    <Typography fontSize={"1.1rem"}>
                        Como por exemplo, se a exibição dos horários de aula for diferente do que foi desenvolvido <b>(&quot;2T234&quot;, &quot;2M1&quot; ou até &quot;3M4 5M34&quot;)</b>, ou algo do mesmo gênero, por favor, entre em contato por discord ou email...
                    </Typography>
                </li>
            </ul>
            <Dados />
            <Box display={"flex"} alignItems="center" m={1}>
                <a href="https://www.instagram.com/sigaanext/">
                    <img
                        src={"https://upload.wikimedia.org/wikipedia/commons/9/96/Instagram.svg"}
                        aria-label="Instagram"
                        width={"40px"}
                    />
                </a>
                <Typography m={1} fontSize={"1.3rem"}>Siga-nos no instagram e saiba das atualizações! @sigaanext</Typography>
            </Box>
            <Box display="flex" flexDirection={"row"} justifyContent={"start"} alignItems={"center"} m={0}>
                <Switch checked={props.activeParticles} onChange={() => {
                    props.setActiveParticles(!props.activeParticles)
                }} />
                <Typography fontSize={"1.3rem"}>Partículas</Typography>
            </Box>
        </Box>
    );
}

// mostra o usuário do discord com o icone do discord 
function Dados() {
    return (
        <Box display={"flex"} alignItems="start" m={1} flexWrap={"wrap"}
            flexDirection={"column"}>
            <Box display={"flex"} alignItems="center" >
                <img src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-icone.png" alt="discord" width={"40px"} /><Typography m={1} fontSize={"1.3rem"}>duarte#2387</Typography>
            </Box>
            <Box display={"flex"} alignItems="center" >
                <Email fontSize="large" />
                <Typography m={1} fontSize={"1.3rem"}>
                    <a href="mailto:sigaanext@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
                        sigaanext@gmail.com
                    </a>
                </Typography>
            </Box>
            <Donate email="acima!" fontSize="1.1rem" iconWidth="40px" fontSizeEmail="1.1rem">
            </Donate>
        </Box>

    );
}
