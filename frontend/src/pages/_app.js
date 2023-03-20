import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout children={<Component {...pageProps} />}/>
    </ChakraProvider>
  )
}