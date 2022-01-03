import theme from '@styles/theme'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
export default class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="pt-br">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:title" content="sigaa-next-client" />
          <meta property="og:url" content="https://sigaa-next-client.vercel.app/" />
          <meta property="og:description" content="Uma forma diferente de acessar o SIGAA" />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
