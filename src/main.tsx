import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { InjectedConnector } from '@wagmi/core'
import { polygonMumbai } from '@wagmi/core/chains'
import { ChakraProvider } from '@chakra-ui/react'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'

const { provider, chains } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: 'HwPhncBI0sW5bDIBkC7EDz1zUafWrAZ-' }), publicProvider()],
)

const client = createClient({
  autoConnect: false,
  connectors: [new InjectedConnector({ chains })],
  provider,
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

