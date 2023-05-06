import React from "react";
import InnerHTMLComponent from "@components/InnerHTMLComponent";
import { Typography } from "@mui/material";

export default function FormattedContent(props: { children: React.ReactNode }): JSX.Element {
  const urlify = (text: string) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gi;
    return (
      <InnerHTMLComponent>
        {text.replace(urlRegex, function (url) {
          return `<a href="${url}" target="_blank" style="color: #32A041">${url}</a>`;
        })}
      </InnerHTMLComponent>
    );
  };
  if (!props.children) return <></>;
  const content = props.children.toString();
  return (
    <>
      {content.split("\n").map((text, key) => (
        <Typography
          key={key}
          gutterBottom
          whiteSpace={"pre-line"}
          sx={{
            whiteSpace: text.split(" ").length > 1 ? "pre-line" : "unset",
            lineBreak: text.split(" ").length > 1 ? "unset" : "anywhere",
            textIndent: "1.5rem"
          }}
          marginBottom={"1.5rem"}
        >
          {urlify(text)}
        </Typography>
      ))}
    </>
  );
}
