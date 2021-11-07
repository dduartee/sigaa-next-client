import React from "react";

export default function LoginBox(
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
) {
  return (
    <form
      style={{
        marginTop: "1rem",
        marginRight: "1rem",
        marginLeft: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    ></form>
  );
}
