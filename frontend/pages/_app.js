import "../core/assets/styles/globals.css"
import "../core/assets/styles/main.scss"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }) {
    return (
    <ChakraProvider>
       <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{ easing: 'ease', speed: 500 }}
       />
      <Component {...pageProps} />
    </ChakraProvider>
    )
  }




