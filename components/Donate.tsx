import { Box, Button, Typography } from "@material-ui/core"
import React from "react"
export function Donate(props: { email: string, fontSize: string, fontSizeEmail: string, iconWidth: string, children?: React.ReactNode }) {
    const frases = [
        "Se você gostou do site, considere fazer uma doação! 🫶",
        "Paga a coxinha 🥹",
        "Me ajuda ai 😮‍💨",
        "Paga o café 🥱😴",
        "Ajuda a pagar o servidor 😵‍💫",
        "Se nós ajudamos você, nos ajude a sustentar o site 🤝",
        "Aceitamos PIX! 🤠",
        "Contribua para a causa! ✊👊🫰",
        "Divulgue o site para seus amigos! 🤗🫂",
        "Ajude a manter o site no ar! 🤯",
    ]
    const [frase] = React.useState(frases[Math.floor(Math.random() * frases.length)])
    const [copiado, setCopiado] = React.useState(0)
    return (
        <Box display={"flex"} alignItems="center" flexDirection={"column"} >
            <Box marginBottom={"1rem"} textAlign="center" display={"flex"} flexDirection="column" alignItems={"center"}>
                <PixIcon width={props.iconWidth} />
                <Typography variant="h2" fontSize={"1.5rem"} fontWeight={"500"}>
                    Doações PIX
                </Typography>
            </Box>
            <Box textAlign={"center"} m={"1rem"}>
                <Typography m={1} fontSize={props.fontSize}>
                    {frase}
                </Typography>
                <Typography m={1} fontSize={props.fontSizeEmail} sx={{textDecoration: "underline", textDecorationColor: "#207e3f", textDecorationThickness: "2px"}}>
                    {props.email}
                </Typography>
            </Box>
            <Box mb="2rem" mt="0rem">
                <Button variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        navigator.clipboard.writeText(props.email);
                        navigator.clipboard.writeText(props.email)
                        setCopiado(1)
                        setTimeout(() => {
                            setCopiado(0)
                        }, 2000)
                    }}
                >
                    {copiado ? "Copiado!" : "Copiar"}
                </Button>
            </Box>

        </Box>
    )
}
export function PixIcon(props: { width: string, marginTop?: string }) {
    return (
        <Box sx={{ width: props.width, marginTop: props.marginTop }}>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <defs />
                <g fill="#2ba654" fillRule="evenodd">
                    <path d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138 97.139c-30.326 30.344-79.505 30.344-109.85 0l-97.415-97.416h9.232zm280.068-271.294c-20.056 0-38.929 7.809-53.12 22l-76.97 76.99c-5.551 5.53-14.6 5.568-20.15-.02l-76.711-76.693c-14.192-14.191-33.046-21.999-53.12-21.999h-9.234l97.416-97.416c30.344-30.344 79.523-30.344 109.867 0l97.138 97.138h-15.116z" />
                    <path d="M22.758 200.753l58.024-58.024h31.787c13.84 0 27.384 5.605 37.172 15.394l76.694 76.693c7.178 7.179 16.596 10.768 26.033 10.768 9.417 0 18.854-3.59 26.014-10.75l76.989-76.99c9.787-9.787 23.331-15.393 37.171-15.393h37.654l58.3 58.302c30.343 30.344 30.343 79.523 0 109.867l-58.3 58.303H392.64c-13.84 0-27.384-5.605-37.171-15.394l-76.97-76.99c-13.914-13.894-38.172-13.894-52.066.02l-76.694 76.674c-9.788 9.788-23.332 15.413-37.172 15.413H80.782L22.758 310.62c-30.344-30.345-30.344-79.524 0-109.868" />
                </g>
            </svg>
        </Box>
    )
}