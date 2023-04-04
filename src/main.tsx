import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { polygonMumbai } from '@wagmi/core/chains'
import { ChakraProvider } from '@chakra-ui/react'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)
 
const client = createClient({
  provider,
  webSocketProvider,
})
 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <WagmiConfig client={client}>
        <App />
    </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>
)

