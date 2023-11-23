import { store } from "@punit-app/store";
import "../styles/globals.css";

import type { Metadata } from "next";
import { AppProps } from "next/app";

import Head from "next/head";
import { Provider } from "react-redux";
import ThemeCustomization from "@punit-app/themes";

export const metadata: Metadata = {
  title: "PunIt App",
  description: "Coded by Anonumous team",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>{metadata.title as string}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ThemeCustomization>
        {/* <BrowserRouter> */}
        <Component {...pageProps} />
        {/* </BrowserRouter> */}
      </ThemeCustomization>
    </Provider>
  );
}
