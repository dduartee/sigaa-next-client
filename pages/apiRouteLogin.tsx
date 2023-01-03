import React from "react";

export default function Login() {
  return (
    <div>
      <form action="/api/v1/login" method="POST">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="text" name="JSESSIONID" />
        <input type="hidden" name="sigaaURL" value="https://sigaa.ifsc.edu.br/" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
