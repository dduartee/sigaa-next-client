import {
  Description,
  Link as LinkIcon,
  Assignment as AssignmentIcon,
  Forum as ForumIcon,
  VideoLibrary as VideoLibraryIcon,
  FormatListNumbered as FormatListNumberedIcon,
} from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Attachments } from "@types";
import Link from "next/link";
import React from "react";


export function Attachment(props: { attachment: Attachments; }) {
  const { attachment } = props;
  const theme = useTheme();
  const frase = attachment.title.split(" ").length > 1;
  const sigaaURL = "https://sigaa.ifsc.edu.br";
  switch (attachment.type) {
    case "file":
      return (
        <Button
          variant="outlined"
          href={`${sigaaURL}/sigaa/verFoto?idArquivo=${attachment.id}&key=${attachment.key}`}
          target="_blank"
          style={{ color: theme.palette.primary["800"], display: "flex", alignItems: "center" }}
        >
          <Description />
          <Typography
            gutterBottom={false}
            marginLeft={".3rem"}
            sx={{
              whiteSpace: "pre-wrap",
              lineBreak: frase ? "auto" : "anywhere",
            }}
          >
            Anexo: <span>{attachment.title}</span>
          </Typography>
        </Button>
      );
    case "hyperlink":
      return (
        <Typography
          gutterBottom={false}
          marginLeft={".3rem"}
          style={{ color: theme.palette.primary["800"], display: "flex", alignItems: "center" }}
        >
          <LinkIcon />
          <Link
            href={attachment.href}
            target="_blank"
            style={{ color: theme.palette.primary["800"] }}
          >
            <Typography gutterBottom={false} marginLeft={".3rem"}>
              Link: {attachment.title}
            </Typography>
          </Link>
        </Typography>
      );
    case "homework":
      return (
        <Button
          variant="contained"
          href={`#`}
          style={{ color: "#fff", display: "flex", alignItems: "center" }}
        >
          <AssignmentIcon />
          <Typography gutterBottom={false} marginLeft={".3rem"}>
            Tarefa: {attachment.title}
          </Typography>
        </Button>
      );
    case "forum":
      return (
        <Button
          variant="contained"
          href={`#`}
          style={{ color: "#fff", display: "flex", alignItems: "center" }}
        >
          <ForumIcon />
          <Typography gutterBottom={false} marginLeft={".3rem"}>
            Fórum: {attachment.title}
          </Typography>
        </Button>
      );
    case "video":
      return (
        <Button
          variant="outlined"
          href={attachment.src}
          target="_blank"
          style={{ color: theme.palette.primary["800"], display: "flex", alignItems: "center" }}
        >
          <VideoLibraryIcon />
          <Typography gutterBottom={false} marginLeft={".3rem"}>
            Vídeo: {attachment.title}
          </Typography>
        </Button>
      );
    case "quiz":
      return (
        <Button
          variant="contained"
          href={``}
          style={{ color: "#fff", display: "flex", alignItems: "center" }}
        >
          <FormatListNumberedIcon />
          <Typography gutterBottom={false} marginLeft={".3rem"}>
            Questionário: {attachment.title}
          </Typography>
        </Button>
      );
    case "link":
      return (
        <Button
          variant="outlined"
          href={attachment.href}
          target="_blank"
          style={{ color: theme.palette.primary["800"], display: "flex", alignItems: "center" }}
        >
          <LinkIcon />
          <Typography gutterBottom={false} marginLeft={".3rem"}>
            {attachment.title}
          </Typography>
        </Button>
      );
    default:
      return <p>{attachment.title}</p>;
  }
}
