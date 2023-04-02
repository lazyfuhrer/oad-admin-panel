import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { parse } from 'url'

export default function MyApp({ Component, pageProps, router }) {
  const { asPath } = router;
  const { pathname } = parse(asPath, true);

  const pagesWithoutLayout = ['/login', '/register'];
  const hasLayout = !pagesWithoutLayout.includes(pathname);

  return (
    
      <ChakraProvider>
        {hasLayout ? (
          <Layout children={<Component {...pageProps} />} />
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    
  );
}