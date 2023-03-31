import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './login';

export default function App({ Component, pageProps }) {

  const isLoggedIn = false;

  return (
    <ChakraProvider>
      {/* <Layout children={<Component {...pageProps} />}/> */}
      {isLoggedIn ? <Layout children={<Component {...pageProps} />}/> : <Login/>}
    </ChakraProvider>
  )
}
