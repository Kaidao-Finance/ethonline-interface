import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import merge from "lodash.merge";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/bootstrap-icon.css";
import theme from "../src/themes";
import { ChakraProvider } from "@chakra-ui/react";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import "@fontsource/rubik/400.css";
import "@rainbow-me/rainbowkit/styles.css";

import { useState, useEffect } from "react";
const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Ethernal Swap",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors: connectors,
  provider: provider,
});

const darkMode = merge(darkTheme(), {
  colors: {
    accentColor: "#222225",
  },
} as Theme);

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ChakraProvider theme={theme}>
        <WagmiConfig client={client}>
          <RainbowKitProvider chains={chains} initialChain={chain.mainnet}>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    );
  }
};

export default App;
