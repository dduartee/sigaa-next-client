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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    ></form>
  );
}