import { Box, Link, Switch, Typography } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Donate } from "./Donate";
export function Ajuda(props: { setActiveParticles: (value: boolean) => void, activeParticles: boolean }) {
    const [hoverGithubIcon, setHoverGithubIcon] = useState(false);
    const toggleGithubIcon = () => {
        setHoverGithubIcon(!hoverGithubIcon);
    };
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
                <a href="https://github.com/dduartee/sigaa-next-client">
                    <img
                        src={
                            hoverGithubIcon
                                ? "/img/GitHub-Mark-Light-64px.png"
                                : "/img/GitHub-Mark-64px.png"
                        }
                        aria-label="Github"
                        onMouseEnter={toggleGithubIcon}
                        onMouseLeave={toggleGithubIcon}
                        width={"40px"}
                    />
                </a>
                <Typography m={1} fontSize={"1.3rem"}>Contribua para o projeto</Typography>
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
            <Donate email="acima!" fontSize="1.3rem" iconWidth="40px" fontSizeEmail="1.3rem">
                <Typography fontSize={"1.0rem"} marginLeft={2}><li>Precisamos manter nossos servidores brasileiros funcionando 24h e atualizados.</li></Typography>
            </Donate>
        </Box>

    );
}
