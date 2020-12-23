import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
