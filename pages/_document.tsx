import Document, { Head, Html, Main, NextScript } from "next/document"
import React, { ReactElement } from "react"
import { theme } from "src/themes/theme"
import createEmotionServer from "@emotion/server/create-instance"
import createEmotionCache from "src/util/createEmotionCache"
import Script from "next/script"

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <meta charSet={"utf-8"} />
          <meta name="description" content="Register for TartanHacks" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta property="og:title" content="TartanHacks" />
          <meta property="og:type" content="website" />
          <meta
            property={"og:url"}
            content={"https://register.tartanhacks.com"}
          />
          <meta property="og:description" content="Register for TartanHacks" />
          <link rel={"icon"} type={"image/x-icon"} href={"/favicon.ico"} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
            `}
          </Script>
        </body>
      </Html>
    )
  }
}

// eslint-disable-next-line
MyDocument.getInitialProps = async (ctx): Promise<any> => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        }
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}

export default MyDocument
