import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/global.css";
import 'semantic-ui-css/semantic.min.css'
import { ThemeProvider } from "next-themes";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark-black">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
