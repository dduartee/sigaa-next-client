import { Box, Switch, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { PixIcon } from "./Donate";
export function Ajuda(props: { setActiveParticles: (value: boolean) => void, activeParticles: boolean }) {
    useEffect(() => {
        localStorage.setItem("particles", props.activeParticles.toString());
    }, [props.activeParticles]);
    return (
        <Box display={"flex"} m={1} flexDirection={"column"}>
            <Typography variant={"h4"} m={1}>Ajuda</Typography>
            <ul>
                <li>
                    <Typography fontSize={"1.1rem"} mb="1rem">
                        Este projeto não faz parte de nenhum projeto de pesquisa ou extensão do IFSC, totalmente independente.
                    </Typography>
                </li>
                <li>
                    <Typography fontSize={"1.1rem"} mb="1rem">
                        O desenvolvimento foi feito com base nas informações apresentadas em acessos realizados no SIGAA,
                        portanto, não é garantido que esteja 100% correto. Sendo recomendado que você verifique as informações no SIGAA.
                    </Typography>
                </li>
                <li>
                    <Typography fontSize={"1.1rem"} mb="1rem">
                        Qualquer dúvida, sugestão ou reclamação, entre em contato pelo email do PIX.
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
                    localStorage.setItem("particles", 'false');
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
                <PixIcon width="40px" />
                <Typography m={1} fontSize={"1.3rem"}>
                    <a href="mailto:sigaanext@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
                        PIX: sigaanext@gmail.com
                    </a>
                </Typography>
            </Box>
        </Box>

    );
}
