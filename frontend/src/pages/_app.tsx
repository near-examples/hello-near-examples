import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Navigation } from "@/components/navigation";
import { NearProvider } from "@/components/near-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NearProvider>
      <Navigation />
      <Component {...pageProps} />
    </NearProvider>
  );
}
