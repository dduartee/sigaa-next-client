import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/global.css";

import { ThemeProvider } from "next-themes";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
