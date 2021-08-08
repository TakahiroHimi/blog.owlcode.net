import "reset-css";
import type { AppProps } from "next/app";
import { css, Global } from "@emotion/react";
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            font-family: "Noto Sans JP", sans-serif;
          }
        `}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
