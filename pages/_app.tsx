import { inspect } from "@xstate/inspect";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

if (typeof window !== "undefined") {
  inspect({ iframe: false });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
